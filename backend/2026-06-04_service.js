// Type      : Backend Utility
// Date      : 2026-06-04
// ───────────────────────────────────────────────────────
/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');

/**
 * @typedef {object} EmailServiceOptions
 * @property {string} host - The SMTP host.
 * @property {number} port - The SMTP port.
 * @property {boolean} secure - Whether to use TLS (true for 465, false for other ports).
 * @property {string} authUser - Username for SMTP authentication.
 * @property {string} authPass - Password for SMTP authentication.
 * @property {string} defaultFrom - Default 'from' email address.
 * @property {number} [maxRetries=3] - Maximum number of retries for sending emails.
 * @property {number} [retryDelayMs=1000] - Delay in milliseconds between retries.
 */

/**
 * A production-ready email service module using Nodemailer.
 * Provides methods for sending different types of templated emails with retry logic.
 */
class EmailService {
  /**
   * Initializes the EmailService with SMTP configuration.
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
   * @param {number} [attempt=1] - Current attempt number.
   * @returns {Promise<object>} - Information about the sent email.
   * @throws {Error} If the email fails to send after all retries.
   */
  async #sendEmailWithRetry(mailOptions, attempt = 1) {
    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      if (attempt < this.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelayMs * attempt));
        return this.#sendEmailWithRetry(mailOptions, attempt + 1);
      }
      throw new Error(`Failed to send email after ${attempt} attempts: ${error.message}`);
    }
  }

  /**
   * Sends a welcome email to a new user.
   * @param {string} to - Recipient's email address.
   * @param {string} name - User's name.
   * @returns {Promise<object>} - Information about the sent email.
   */
  async sendWelcome(to, name) {
    const subject = 'Welcome to Our Service!';
    const html = `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining our service. We're excited to have you!</p>
      <p>Best regards,<br>The Team</p>
    `;
    return this.#sendEmailWithRetry({ from: this.defaultFrom, to, subject, html });
  }

  /**
   * Sends a password reset email.
   * @param {string} to - Recipient's email address.
   * @param {string} resetLink - The URL for password reset.
   * @returns {Promise<object>} - Information about the sent email.
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
    return this.#sendEmailWithRetry({ from: this.defaultFrom, to, subject, html });
  }

  /**
   * Sends a general notification email.
   * @param {string} to - Recipient's email address.
   * @param {string} subject - Subject of the email.
   * @param {string} messageHtml - HTML content of the notification message.
   * @returns {Promise<object>} - Information about the sent email.
   */
  async sendNotification(to, subject, messageHtml) {
    const html = `
      <h1>Notification</h1>
      ${messageHtml}
      <p>Best regards,<br>The Team</p>
    `;
    return this.#sendEmailWithRetry({ from: this.defaultFrom, to, subject, html });
  }
}

module.exports = EmailService;
