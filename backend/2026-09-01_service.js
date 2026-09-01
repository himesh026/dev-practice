// Type      : Backend Utility
// Date      : 2026-09-01
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} NodemailerTransportOptions
 * @property {string} host - The host of the SMTP server.
 * @property {number} port - The port of the SMTP server.
 * @property {boolean} secure - True if the connection should use SSL/TLS.
 * @property {object} auth - Authentication object.
 * @property {string} auth.user - Username for authentication.
 * @property {string} auth.pass - Password for authentication.
 */

const nodemailer = require('nodemailer');

/**
 * Service for sending emails using Nodemailer.
 */
class EmailService {
    /**
     * @private
     * @type {import('nodemailer').Transporter | null}
     */
    _transporter = null;

    /**
     * @private
     * @type {number}
     */
    _maxRetries = 3;

    /**
     * @private
     * @type {number}
     */
    _retryDelayMs = 1000;

    /**
     * Constructs an EmailService instance.
     * @param {NodemailerTransportOptions} transportOptions - Nodemailer transport configuration.
     * @param {string} defaultFrom - The default 'from' email address.
     * @param {object} [options] - Additional options.
     * @param {number} [options.maxRetries=3] - Maximum number of retries for sending emails.
     * @param {number} [options.retryDelayMs=1000] - Delay in milliseconds between retries.
     */
    constructor(transportOptions, defaultFrom, options = {}) {
        if (!transportOptions || !defaultFrom) {
            throw new Error('Transport options and defaultFrom are required.');
        }
        this._transporter = nodemailer.createTransport(transportOptions);
        this._defaultFrom = defaultFrom;
        this._maxRetries = options.maxRetries ?? this._maxRetries;
        this._retryDelayMs = options.retryDelayMs ?? this._retryDelayMs;
    }

    /**
     * Sends an email with retry logic.
     * @private
     * @param {import('nodemailer').SendMailOptions} mailOptions - Nodemailer mail options.
     * @param {number} [attempt=1] - Current attempt number.
     * @returns {Promise<import('nodemailer').SentMessageInfo>}
     * @throws {Error} If email sending fails after all retries.
     */
    async _sendMailWithRetry(mailOptions, attempt = 1) {
        if (!this._transporter) {
            throw new Error('Email service not initialized. Transporter is missing.');
        }
        try {
            return await this._transporter.sendMail(mailOptions);
        } catch (error) {
            if (attempt < this._maxRetries) {
                await new Promise(resolve => setTimeout(resolve, this._retryDelayMs * attempt));
                return this._sendMailWithRetry(mailOptions, attempt + 1);
            }
            throw new Error(`Failed to send email after ${attempt} attempts: ${error.message}`);
        }
    }

    /**
     * Sends a welcome email to a new user.
     * @param {string} to - The recipient's email address.
     * @param {string} name - The user's name.
     * @returns {Promise<import('nodemailer').SentMessageInfo>}
     */
    async sendWelcome(to, name) {
        if (!to || !name) {
            throw new Error('Recipient email and name are required for welcome email.');
        }
        const subject = 'Welcome to Our Service!';
        const html = `
            <h1>Welcome, ${name}!</h1>
            <p>Thank you for joining our service. We're excited to have you!</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
        `;
        return this._sendMailWithRetry({ from: this._defaultFrom, to, subject, html });
    }

    /**
     * Sends a password reset email.
     * @param {string} to - The recipient's email address.
     * @param {string} resetLink - The password reset URL.
     * @returns {Promise<import('nodemailer').SentMessageInfo>}
     */
    async sendPasswordReset(to, resetLink) {
        if (!to || !resetLink) {
            throw new Error('Recipient email and reset link are required for password reset.');
        }
        const subject = 'Password Reset Request';
        const html = `
            <h1>Password Reset</h1>
            <p>You have requested a password reset. Please click the link below to reset your password:</p>
            <p><a href="${resetLink}">Reset Password</a></p>
            <p>If you did not request this, please ignore this email.</p>
        `;
        return this._sendMailWithRetry({ from: this._defaultFrom, to, subject, html });
    }

    /**
     * Sends a general notification email.
     * @param {string} to - The recipient's email address.
     * @param {string} subject - The subject of the email.
     * @param {string} message - The HTML content of the notification.
     * @returns {Promise<import('nodemailer').SentMessageInfo>}
     */
    async sendNotification(to, subject, message) {
        if (!to || !subject || !message) {
            throw new Error('Recipient email, subject, and message are required for notification.');
        }
        const html = `
            <h1>Notification</h1>
            <p>${message}</p>
            <p>Thank you.</p>
        `;
        return this._sendMailWithRetry({ from: this._defaultFrom, to, subject, html });
    }
}

module.exports = EmailService;
