// Type      : Backend Utility
// Date      : 2026-06-05
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} NodemailerTransportOptions
 * @property {string} host
 * @property {number} port
 * @property {boolean} secure
 * @property {object} auth
 * @property {string} auth.user
 * @property {string} auth.pass
 */

/**
 * @typedef {object} EmailServiceOptions
 * @property {NodemailerTransportOptions} transportOptions
 * @property {string} defaultFrom
 * @property {number} [maxRetries=3]
 * @property {number} [retryDelayMs=1000]
 */

const nodemailer = require('nodemailer');

/**
 * A production-ready email service module using Nodemailer.
 * Handles sending various types of emails with retry logic.
 */
class EmailService {
    /**
     * Creates an instance of EmailService.
     * @param {EmailServiceOptions} options - Configuration options for the email service.
     */
    constructor(options) {
        if (!options || !options.transportOptions || !options.defaultFrom) {
            throw new Error('EmailService: Missing required configuration options (transportOptions, defaultFrom).');
        }

        this.transporter = nodemailer.createTransport(options.transportOptions);
        this.defaultFrom = options.defaultFrom;
        this.maxRetries = options.maxRetries ?? 3;
        this.retryDelayMs = options.retryDelayMs ?? 1000;
    }

    /**
     * Sends an email with retry logic.
     * @private
     * @param {object} mailOptions - Nodemailer mail options.
     * @param {number} [retries=0] - Current retry attempt count.
     * @returns {Promise<object>} - Information about the sent email.
     * @throws {Error} If email sending fails after all retries.
     */
    async #sendEmailWithRetry(mailOptions, retries = 0) {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            return info;
        } catch (error) {
            if (retries < this.maxRetries) {
                await new Promise(resolve => setTimeout(resolve, this.retryDelayMs * (retries + 1)));
                return this.#sendEmailWithRetry(mailOptions, retries + 1);
            }
            throw new Error(`Failed to send email after ${this.maxRetries} retries: ${error.message}`);
        }
    }

    /**
     * Sends a welcome email to a new user.
     * @param {string} to - The recipient's email address.
     * @param {string} username - The username to include in the email.
     * @returns {Promise<object>} - Information about the sent email.
     */
    async sendWelcome(to, username) {
        const subject = 'Welcome to Our Service!';
        const html = `
            <h1>Welcome, ${username}!</h1>
            <p>Thank you for joining our service. We are excited to have you!</p>
            <p>If you have any questions, feel free to reach out.</p>
        `;
        return this.#sendEmailWithRetry({ from: this.defaultFrom, to, subject, html });
    }

    /**
     * Sends a password reset email.
     * @param {string} to - The recipient's email address.
     * @param {string} resetLink - The URL for password reset.
     * @returns {Promise<object>} - Information about the sent email.
     */
    async sendPasswordReset(to, resetLink) {
        const subject = 'Password Reset Request';
        const html = `
            <h1>Password Reset</h1>
            <p>You have requested a password reset. Please click the link below to reset your password:</p>
            <p><a href="${resetLink}">Reset Your Password</a></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you did not request this, please ignore this email.</p>
        `;
        return this.#sendEmailWithRetry({ from: this.defaultFrom, to, subject, html });
    }

    /**
     * Sends a general notification email.
     * @param {string} to - The recipient's email address.
     * @param {string} subject - The subject of the notification email.
     * @param {string} messageHtml - The HTML content of the notification message.
     * @returns {Promise<object>} - Information about the sent email.
     */
    async sendNotification(to, subject, messageHtml) {
        const html = `
            <h1>Notification</h1>
            ${messageHtml}
            <p>This is an automated message, please do not reply.</p>
        `;
        return this.#sendEmailWithRetry({ from: this.defaultFrom, to, subject, html });
    }
}

module.exports = EmailService;
