// Type      : Backend Utility
// Date      : 2026-07-04
// ───────────────────────────────────────────────────────
/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');
const { htmlToText } = require('html-to-text');

/**
 * @typedef {object} EmailServiceOptions
 * @property {string} host - SMTP host.
 * @property {number} port - SMTP port.
 * @property {boolean} secure - Use TLS (true for 465, false for other ports).
 * @property {string} authUser - SMTP authentication username.
 * @property {string} authPass - SMTP authentication password.
 * @property {string} defaultFrom - Default 'from' email address.
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
   * @param {number} [retries=0] - Current retry attempt count.
   * @returns {Promise<object>} - Information about the sent message.
   * @throws {Error} If the email sending fails after all retries.
   */
  async #sendEmailWithRetry(mailOptions, retries = 0) {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
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
   * @param {string} to - Recipient email address.
   * @param {string} userName - Name of the user.
   * @returns {Promise<object>} - Information about the sent message.
   */
  async sendWelcome(to, userName) {
    const subject = 'Welcome to Our Service!';
    const html = `
      <h1>Welcome, ${userName}!</h1>
      <p>Thank you for joining our service. We're excited to have you on board.</p>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Best regards,<br>The Team</p>
    `;
    return this.#sendEmailWithRetry({
      from: this.defaultFrom,
      to,
      subject,
      html,
      text: htmlToText(html),
    });
  }

  /**
   * Sends a password reset email.
   * @param {string} to - Recipient email address.
   * @param {string} resetLink - The URL for password reset.
   * @returns {Promise<object>} - Information about the sent message.
   */
  async sendPasswordReset(to, resetLink) {
    const subject = 'Password Reset Request';
    const html = `
      <h1>Password Reset</h1>
      <p>You have requested a password reset. Please click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>This link will expire in a short period. If you did not request this, please ignore this email.</p>
      <p>Best regards,<br>The Team</p>
    `;
    return this.#sendEmailWithRetry({
      from: this.defaultFrom,
      to,
      subject,
      html,
      text: htmlToText(html),
    });
  }

  /**
   * Sends a general notification email.
   * @param {string} to - Recipient email address.
   * @param {string} subject - Subject of the email.
   * @param {string} messageHtml - HTML content of the notification message.
   * @returns {Promise<object>} - Information about the sent message.
   */
  async sendNotification(to, subject, messageHtml) {
    const html = `
      <h1>Notification</h1>
      ${messageHtml}
      <p>Best regards,<br>The Team</p>
    `;
    return this.#sendEmailWithRetry({
      from: this.defaultFrom,
      to,
      subject,
      html,
      text: htmlToText(html),
    });
  }
}

module.exports = EmailService;
