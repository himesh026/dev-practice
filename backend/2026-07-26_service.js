// Type      : Backend Utility
// Date      : 2026-07-26
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

/**
 * @typedef {object} EmailContent
 * @property {string} to - Recipient email address.
 * @property {string} subject - Email subject.
 * @property {string} html - HTML content of the email.
 * @property {string} [from] - Sender email address. Defaults to configured sender.
 */

const nodemailer = require('nodemailer');

class EmailService {
    /**
     * Initializes the EmailService with Nodemailer transport options and default sender.
     * @param {NodemailerTransportOptions} transportOptions - Nodemailer transport configuration.
     * @param {string} defaultSender - The default sender email address (e.g., "MyApp <noreply@myapp.com>").
     * @param {number} [maxRetries=3] - Maximum number of retries for sending an email.
     * @param {number} [retryDelayMs=1000] - Delay in milliseconds between retries.
     */
    constructor(transportOptions, defaultSender, maxRetries = 3, retryDelayMs = 1000) {
        if (!transportOptions || !defaultSender) {
            throw new Error('EmailService requires transportOptions and defaultSender.');
        }
        this.transporter = nodemailer.createTransport(transportOptions);
        this.defaultSender = defaultSender;
        this.maxRetries = maxRetries;
        this.retryDelayMs = retryDelayMs;
    }

    /**
     * Sends an email with retry logic.
     * @private
     * @param {EmailContent} emailContent - The content of the email to send.
     * @returns {Promise<object>} - Nodemailer send mail response.
     * @throws {Error} If email sending fails after all retries.
     */
    async #sendEmailWithRetry(emailContent) {
        const mailOptions = {
            from: emailContent.from || this.defaultSender,
            to: emailContent.to,
            subject: emailContent.subject,
            html: emailContent.html,
        };

        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                return await this.transporter.sendMail(mailOptions);
            } catch (error) {
                if (attempt === this.maxRetries) {
                    throw new Error(`Failed to send email to ${emailContent.to} after ${this.maxRetries} attempts: ${error.message}`);
                }
                await new Promise(resolve => setTimeout(resolve, this.retryDelayMs));
            }
        }
    }

    /**
     * Sends a welcome email to a new user.
     * @param {string} recipientEmail - The email address of the new user.
     * @param {string} userName - The name of the new user.
     * @returns {Promise<object>} - Nodemailer send mail response.
     */
    async sendWelcome(recipientEmail, userName) {
        const subject = 'Welcome to Our Service!';
        const html = `
            <p>Hello ${userName},</p>
            <p>Welcome to our service! We're thrilled to have you onboard.</p>
            <p>Best regards,<br>The Team</p>
        `;
        return this.#sendEmailWithRetry({ to: recipientEmail, subject, html });
    }

    /**
     * Sends a password reset email.
     * @param {string} recipientEmail - The email address for the password reset.
     * @param {string} resetLink - The unique link for password reset.
     * @returns {Promise<object>} - Nodemailer send mail response.
     */
    async sendPasswordReset(recipientEmail, resetLink) {
        const subject = 'Password Reset Request';
        const html = `
            <p>Hello,</p>
            <p>You have requested a password reset. Please click the link below to reset your password:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>The Team</p>
        `;
        return this.#sendEmailWithRetry({ to: recipientEmail, subject, html });
    }

    /**
     * Sends a general notification email.
     * @param {string} recipientEmail - The email address to notify.
     * @param {string} notificationSubject - The subject of the notification.
     * @param {string} notificationBody - The HTML body of the notification.
     * @returns {Promise<object>} - Nodemailer send mail response.
     */
    async sendNotification(recipientEmail, notificationSubject, notificationBody) {
        const subject = notificationSubject;
        const html = `
            <p>Hello,</p>
            ${notificationBody}
            <p>Best regards,<br>The Team</p>
        `;
        return this.#sendEmailWithRetry({ to: recipientEmail, subject, html });
    }
}

module.exports = EmailService;
