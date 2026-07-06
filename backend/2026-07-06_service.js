// Type      : Backend Utility
// Date      : 2026-07-06
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} SendMailOptions
 * @property {string} to - Recipient email address.
 * @property {string} subject - Email subject.
 * @property {string} html - HTML content of the email.
 */

const nodemailer = require('nodemailer');

/**
 * Service for sending various types of emails using Nodemailer.
 * Supports retries for transient failures.
 */
class EmailService {
    /**
     * Creates an instance of EmailService.
     * @param {object} options - Configuration options for the email service.
     * @param {object} options.smtpConfig - Nodemailer transport configuration object.
     * @param {number} [options.maxRetries=3] - Maximum number of retries for sending an email.
     * @param {number} [options.retryDelayMs=1000] - Delay in milliseconds between retries.
     */
    constructor({ smtpConfig, maxRetries = 3, retryDelayMs = 1000 }) {
        if (!smtpConfig) {
            throw new Error('SMTP configuration is required for EmailService.');
        }
        this.transporter = nodemailer.createTransport(smtpConfig);
        this.maxRetries = maxRetries;
        this.retryDelayMs = retryDelayMs;
    }

    /**
     * Sends an email with retry logic.
     * @private
     * @param {SendMailOptions} mailOptions - Options for sending the email.
     * @param {number} [attempt=1] - Current attempt number.
     * @returns {Promise<object>} Nodemailer send mail response.
     * @throws {Error} If email sending fails after all retries.
     */
    async #sendMailWithRetry(mailOptions, attempt = 1) {
        try {
            return await this.transporter.sendMail(mailOptions);
        } catch (error) {
            if (attempt < this.maxRetries) {
                await new Promise(resolve => setTimeout(resolve, this.retryDelayMs));
                return this.#sendMailWithRetry(mailOptions, attempt + 1);
            }
            throw new Error(`Failed to send email to ${mailOptions.to} after ${attempt} attempts: ${error.message}`);
        }
    }

    /**
     * Sends a welcome email to a new user.
     * @param {string} to - Recipient's email address.
     * @param {string} userName - Name of the user.
     * @returns {Promise<object>} Nodemailer send mail response.
     */
    async sendWelcome(to, userName) {
        const subject = 'Welcome to Our Service!';
        const html = `
            <h1>Hello, ${userName}!</h1>
            <p>Welcome to our service. We're excited to have you on board.</p>
            <p>If you have any questions, feel free to contact us.</p>
        `;
        return this.#sendMailWithRetry({ to, subject, html });
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
            <p>You have requested a password reset. Please click the link below to reset your password:</p>
            <p><a href="${resetLink}">Reset Password</a></p>
            <p>If you did not request this, please ignore this email.</p>
        `;
        return this.#sendMailWithRetry({ to, subject, html });
    }

    /**
     * Sends a general notification email.
     * @param {string} to - Recipient's email address.
     * @param {string} subject - Subject of the notification email.
     * @param {string} message - HTML content of the notification message.
     * @returns {Promise<object>} Nodemailer send mail response.
     */
    async sendNotification(to, subject, message) {
        const html = `
            <h1>Notification</h1>
            ${message}
            <p>This is an automated message, please do not reply.</p>
        `;
        return this.#sendMailWithRetry({ to, subject, html });
    }
}

module.exports = EmailService;
