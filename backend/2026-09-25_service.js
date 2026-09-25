// Type      : Backend Utility
// Date      : 2026-09-25
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} SendMailOptions
 * @property {string} to - Recipient email address.
 * @property {string} subject - Email subject.
 * @property {string} html - HTML content of the email.
 * @property {string} [text] - Plain text content of the email (optional, for fallback).
 */

const nodemailer = require('nodemailer');

/**
 * Service for sending emails using Nodemailer.
 * Supports various email types and retry mechanisms.
 */
class EmailService {
  /**
   * Creates an instance of EmailService.
   * @param {object} config - Configuration object for the email service.
   * @param {object} config.smtp - Nodemailer transport options (e.g., host, port, secure, auth).
   * @param {string} config.fromEmail - The default sender email address.
   * @param {number} [config.maxRetries=3] - Maximum number of retries for sending an email.
   * @param {number} [config.retryDelayMs=1000] - Delay in milliseconds between retries.
   */
  constructor(config) {
    if (!config || !config.smtp || !config.fromEmail) {
      throw new Error('EmailService configuration missing smtp or fromEmail.');
    }
    this.transporter = nodemailer.createTransport(config.smtp);
    this.fromEmail = config.fromEmail;
    this.maxRetries = config.maxRetries ?? 3;
    this.retryDelayMs = config.retryDelayMs ?? 1000;
  }

  /**
   * Sends an email with retry logic.
   * @private
   * @param {SendMailOptions} mailOptions - Options for sending the email.
   * @param {number} [attempt=1] - Current attempt number.
   * @returns {Promise<object>} Nodemailer send mail response.
   * @throws {Error} If email sending fails after all retries.
   */
  async #sendEmailWithRetry(mailOptions, attempt = 1) {
    try {
      return await this.transporter.sendMail({
        from: this.fromEmail,
        ...mailOptions,
      });
    } catch (error) {
      if (attempt < this.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelayMs));
        return this.#sendEmailWithRetry(mailOptions, attempt + 1);
      }
      throw new Error(`Failed to send email to ${mailOptions.to} after ${attempt} attempts: ${error.message}`);
    }
  }

  /**
   * Sends a welcome email to a new user.
   * @param {string} to - Recipient's email address.
   * @param {string} username - User's username.
   * @returns {Promise<object>} Nodemailer send mail response.
   */
  async sendWelcome(to, username) {
    const subject = 'Welcome to Our Service!';
    const html = `
      <h1>Welcome, ${username}!</h1>
      <p>Thank you for joining our service. We're excited to have you!</p>
      <p>Best regards,<br>The Team</p>
    `;
    return this.#sendEmailWithRetry({ to, subject, html });
  }

  /**
   * Sends a password reset email.
   * @param {string} to - Recipient's email address.
   * @param {string} resetLink - The URL for password reset.
   * @returns {Promise<object>} Nodemailer send mail response.
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
    return this.#sendEmailWithRetry({ to, subject, html });
  }

  /**
   * Sends a general notification email.
   * @param {string} to - Recipient's email address.
   * @param {string} subject - The subject of the notification.
   * @param {string} messageHtml - The HTML content of the notification message.
   * @returns {Promise<object>} Nodemailer send mail response.
   */
  async sendNotification(to, subject, messageHtml) {
    const html = `
      <h1>Notification</h1>
      ${messageHtml}
      <p>Best regards,<br>The Team</p>
    `;
    return this.#sendEmailWithRetry({ to, subject, html });
  }
}

module.exports = EmailService;
