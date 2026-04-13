// Type      : Backend Utility
// Date      : 2026-04-13
// ───────────────────────────────────────────────────────
// emailService.js
const nodemailer = require('nodemailer');
const { setTimeout } = require('timers/promises');

/**
 * Configuration object for the email service.
 * @typedef {object} EmailServiceConfig
 * @property {string} host - SMTP host.
 * @property {number} port - SMTP port.
 * @property {boolean} secure - True if the connection should use TLS/SSL.
 * @property {string} user - SMTP username.
 * @property {string} pass - SMTP password.
 * @property {string} fromAddress - Default 'from' email address.
 * @property {number} [maxRetries=3] - Maximum number of retries for sending an email.
 * @property {number} [retryDelayMs=1000] - Delay in milliseconds between retries.
 */

/**
 * A service for sending various types of emails using Nodemailer.
 * Supports template strings for HTML content and retry mechanisms.
 */
class EmailService {
    /**
     * Creates an instance of EmailService.
     * @param {EmailServiceConfig} config - Configuration object for the email service.
     */
    constructor(config) {
        if (!config || !config.host || !config.port || !config.user || !config.pass || !config.fromAddress) {
            throw new Error('EmailService: Missing required configuration parameters.');
        }

        this.transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass,
            },
        });
        this.fromAddress = config.fromAddress;
        this.maxRetries = config.maxRetries ?? 3;
        this.retryDelayMs = config.retryDelayMs ?? 1000;
    }

    /**
     * Sends an email with retry logic.
     * @private
     * @param {object} mailOptions - Nodemailer mail options object.
     * @param {number} [retries=0] - Current retry attempt count.
     * @returns {Promise<object>} - Information about the sent message.
     * @throws {Error} If email sending fails after all retries.
     */
    async #sendEmailWithRetries(mailOptions, retries = 0) {
        try {
            return await this.transporter.sendMail(mailOptions);
        } catch (error) {
            if (retries < this.maxRetries) {
                await setTimeout(this.retryDelayMs);
                return this.#sendEmailWithRetries(mailOptions, retries + 1);
            }
            throw new Error(`Failed to send email after ${this.maxRetries} retries: ${error.message}`);
        }
    }

    /**
     * Sends a welcome email to a new user.
     * @param {string} to - Recipient's email address.
     * @param {string} username - Username of the new user.
     * @returns {Promise<object>} - Information about the sent message.
     */
    async sendWelcome(to, username) {
        const subject = 'Welcome to Our Service!';
        const html = `
            <h1>Welcome, ${username}!</h1>
            <p>Thank you for joining our service. We're excited to have you!</p>
            <p>Best regards,<br>The Team</p>
        `;
        return this.#sendEmailWithRetries({
            from: this.fromAddress,
            to,
            subject,
            html,
        });
    }

    /**
     * Sends a password reset email.
     * @param {string} to - Recipient's email address.
     * @param {string} resetLink - The URL for resetting the password.
     * @returns {Promise<object>} - Information about the sent message.
     */
    async sendPasswordReset(to, resetLink) {
        const subject = 'Password Reset Request';
        const html = `
            <h1>Password Reset</h1>
            <p>You have requested a password reset. Please click the link below to reset your password:</p>
            <p><a href="${resetLink}">Reset Password</a></p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>The Team</p>
        `;
        return this.#sendEmailWithRetries({
            from: this.fromAddress,
            to,
            subject,
            html,
        });
    }

    /**
     * Sends a general notification email.
     * @param {string} to - Recipient's email address.
     * @param {string} subject - The subject line of the email.
     * @param {string} message - The content of the notification message.
     * @returns {Promise<object>} - Information about the sent message.
     */
    async sendNotification(to, subject, message) {
        const html = `
            <h1>Notification</h1>
            <p>${message}</p>
            <p>Best regards,<br>The Team</p>
        `;
        return this.#sendEmailWithRetries({
            from: this.fromAddress,
            to,
            subject,
            html,
        });
    }
}

module.exports = EmailService;
