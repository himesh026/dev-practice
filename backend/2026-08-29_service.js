// Type      : Backend Utility
// Date      : 2026-08-29
// ───────────────────────────────────────────────────────
// emailService.js
const nodemailer = require('nodemailer');

/**
 * Configuration object for the email service.
 * @typedef {object} EmailServiceConfig
 * @property {string} host - SMTP host.
 * @property {number} port - SMTP port.
 * @property {boolean} secure - True if using SSL/TLS, false otherwise.
 * @property {string} auth.user - SMTP username.
 * @property {string} auth.pass - SMTP password.
 * @property {string} defaultFrom - Default 'from' email address.
 * @property {number} [maxRetries=3] - Maximum number of retries for sending emails.
 * @property {number} [retryDelayMs=1000] - Delay between retries in milliseconds.
 */

/**
 * A utility class for sending various types of emails using Nodemailer.
 */
class EmailService {
    /**
     * Creates an instance of EmailService.
     * @param {EmailServiceConfig} config - Configuration object for the email service.
     */
    constructor(config) {
        if (!config || !config.host || !config.port || !config.auth || !config.auth.user || !config.auth.pass || !config.defaultFrom) {
            throw new Error('EmailService configuration is incomplete or invalid.');
        }

        this.transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass,
            },
        });
        this.defaultFrom = config.defaultFrom;
        this.maxRetries = config.maxRetries ?? 3;
        this.retryDelayMs = config.retryDelayMs ?? 1000;
    }

    /**
     * Sends an email with retry logic.
     * @private
     * @param {object} mailOptions - Nodemailer mail options.
     * @param {number} [retries=0] - Current retry count.
     * @returns {Promise<object>} Nodemailer send mail response.
     * @throws {Error} If email sending fails after all retries.
     */
    async #sendEmailWithRetry(mailOptions, retries = 0) {
        try {
            return await this.transporter.sendMail(mailOptions);
        } catch (error) {
            if (retries < this.maxRetries) {
                await new Promise(resolve => setTimeout(resolve, this.retryDelayMs));
                return this.#sendEmailWithRetry(mailOptions, retries + 1);
            }
            throw new Error(`Failed to send email after ${this.maxRetries} retries: ${error.message}`);
        }
    }

    /**
     * Sends a welcome email to a new user.
     * @param {string} to - Recipient's email address.
     * @param {string} username - Username for personalization.
     * @returns {Promise<object>} Nodemailer send mail response.
     */
    async sendWelcome(to, username) {
        const subject = 'Welcome to Our Service!';
        const html = `
            <h1>Welcome, ${username}!</h1>
            <p>Thank you for joining our service. We're excited to have you!</p>
            <p>Best regards,<br>The Team</p>
        `;
        const mailOptions = { from: this.defaultFrom, to, subject, html };
        return this.#sendEmailWithRetry(mailOptions);
    }

    /**
     * Sends a password reset email.
     * @param {string} to - Recipient's email address.
     * @param {string} resetLink - Link to reset the password.
     * @returns {Promise<object>} Nodemailer send mail response.
     */
    async sendPasswordReset(to, resetLink) {
        const subject = 'Password Reset Request';
        const html = `
            <h1>Password Reset</h1>
            <p>You have requested to reset your password. Please click the link below to proceed:</p>
            <p><a href="${resetLink}">Reset My Password</a></p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>The Team</p>
        `;
        const mailOptions = { from: this.defaultFrom, to, subject, html };
        return this.#sendEmailWithRetry(mailOptions);
    }

    /**
     * Sends a general notification email.
     * @param {string} to - Recipient's email address.
     * @param {string} subject - Subject of the email.
     * @param {string} message - The main content of the notification.
     * @returns {Promise<object>} Nodemailer send mail response.
     */
    async sendNotification(to, subject, message) {
        const html = `
            <h1>Notification</h1>
            <p>${message}</p>
            <p>Best regards,<br>The Team</p>
        `;
        const mailOptions = { from: this.defaultFrom, to, subject, html };
        return this.#sendEmailWithRetry(mailOptions);
    }
}

module.exports = EmailService;
