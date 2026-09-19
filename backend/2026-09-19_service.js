// Type      : Backend Utility
// Date      : 2026-09-19
// ───────────────────────────────────────────────────────
// emailService.js
const nodemailer = require('nodemailer');
const { htmlToText } = require('html-to-text');

/**
 * @typedef {object} EmailServiceOptions
 * @property {string} host - The SMTP host.
 * @property {number} port - The SMTP port.
 * @property {boolean} secure - True if the connection should use SSL/TLS.
 * @property {string} authUser - The username for SMTP authentication.
 * @property {string} authPass - The password for SMTP authentication.
 * @property {string} defaultFrom - The default 'from' email address.
 * @property {number} [maxRetries=3] - Maximum number of retries for sending an email.
 * @property {number} [retryDelayMs=1000] - Delay in milliseconds between retries.
 */

/**
 * A service for sending various types of emails using Nodemailer.
 */
class EmailService {
    /**
     * Creates an instance of EmailService.
     * @param {EmailServiceOptions} options - Configuration options for the email service.
     */
    constructor(options) {
        if (!options.host || !options.port || !options.authUser || !options.authPass || !options.defaultFrom) {
            throw new Error('EmailService: Missing required configuration options (host, port, authUser, authPass, defaultFrom).');
        }

        this.transporter = nodemailer.createTransport({
            host: options.host,
            port: options.port,
            secure: options.secure,
            auth: {
                user: options.authUser,
                pass: options.authPass,
            },
        });
        this.defaultFrom = options.defaultFrom;
        this.maxRetries = options.maxRetries ?? 3;
        this.retryDelayMs = options.retryDelayMs ?? 1000;
    }

    /**
     * Sends an email with retry logic.
     * @private
     * @param {object} mailOptions - Nodemailer mail options.
     * @param {number} [retries=0] - Current retry count.
     * @returns {Promise<object>} - Nodemailer send mail response.
     * @throws {Error} If email sending fails after all retries.
     */
    async #sendMailWithRetry(mailOptions, retries = 0) {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            return info;
        } catch (error) {
            if (retries < this.maxRetries) {
                await new Promise(resolve => setTimeout(resolve, this.retryDelayMs));
                return this.#sendMailWithRetry(mailOptions, retries + 1);
            }
            throw new Error(`Failed to send email after ${this.maxRetries} retries: ${error.message}`);
        }
    }

    /**
     * Sends a welcome email to a new user.
     * @param {string} to - The recipient's email address.
     * @param {string} name - The user's name.
     * @param {string} [subject='Welcome to Our Service!'] - The email subject.
     * @returns {Promise<object>} - Nodemailer send mail response.
     */
    async sendWelcome(to, name, subject = 'Welcome to Our Service!') {
        const html = `
            <h1>Welcome, ${name}!</h1>
            <p>Thank you for joining our service. We're excited to have you!</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br>The Team</p>
        `;
        const text = htmlToText(html, { wordwrap: 130 });

        return this.#sendMailWithRetry({
            from: this.defaultFrom,
            to,
            subject,
            html,
            text,
        });
    }

    /**
     * Sends a password reset email.
     * @param {string} to - The recipient's email address.
     * @param {string} resetLink - The URL for password reset.
     * @param {string} [subject='Password Reset Request'] - The email subject.
     * @returns {Promise<object>} - Nodemailer send mail response.
     */
    async sendPasswordReset(to, resetLink, subject = 'Password Reset Request') {
        const html = `
            <h1>Password Reset</h1>
            <p>You have requested a password reset for your account.</p>
            <p>Please click on the link below to reset your password:</p>
            <p><a href="${resetLink}">Reset Password</a></p>
            <p>This link will expire in a short period. If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>The Team</p>
        `;
        const text = htmlToText(html, { wordwrap: 130 });

        return this.#sendMailWithRetry({
            from: this.defaultFrom,
            to,
            subject,
            html,
            text,
        });
    }

    /**
     * Sends a general notification email.
     * @param {string} to - The recipient's email address.
     * @param {string} subject - The email subject.
     * @param {string} messageHtml - The HTML content of the notification.
     * @returns {Promise<object>} - Nodemailer send mail response.
     */
    async sendNotification(to, subject, messageHtml) {
        if (!messageHtml) {
            throw new Error('Notification email requires messageHtml content.');
        }
        const text = htmlToText(messageHtml, { wordwrap: 130 });

        return this.#sendMailWithRetry({
            from: this.defaultFrom,
            to,
            subject,
            html: messageHtml,
            text,
        });
    }
}

module.exports = EmailService;
