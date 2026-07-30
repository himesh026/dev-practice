// Type      : Backend Utility
// Date      : 2026-07-30
// ───────────────────────────────────────────────────────
/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');
const { htmlToText } = require('html-to-text');

/**
 * @typedef {object} EmailServiceOptions
 * @property {string} host - The SMTP host.
 * @property {number} port - The SMTP port.
 * @property {boolean} secure - Whether to use TLS/SSL.
 * @property {string} authUser - The username for SMTP authentication.
 * @property {string} authPass - The password for SMTP authentication.
 * @property {string} defaultFrom - The default 'from' email address.
 * @property {number} [maxRetries=3] - Maximum number of retries for sending an email.
 * @property {number} [retryDelayMs=1000] - Delay between retries in milliseconds.
 */

/**
 * A production-ready email service module using Nodemailer.
 */
class EmailService {
  /**
   * Creates an instance of EmailService.
   * @param {EmailServiceOptions} options - Configuration options for the email service.
   */
  constructor(options) {
    if (!options.host || !options.port || !options.authUser || !options.authPass || !options.defaultFrom) {
      throw new Error('EmailService: Missing required configuration options.');
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
   * @returns {Promise<object>} - The Nodemailer send mail response.
   * @throws {Error} If email sending fails after all retries.
   */
  async _sendEmailWithRetry(mailOptions) {
    let attempts = 0;
    while (attempts < this.maxRetries) {
      try {
        const info = await this.transporter.sendMail(mailOptions);
        return info;
      } catch (error) {
        attempts++;
        if (attempts >= this.maxRetries) {
          throw new Error(`Failed to send email after ${this.maxRetries} attempts: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, this.retryDelayMs));
      }
    }
  }

  /**
   * Sends a welcome email to a new user.
   * @param {string} to - The recipient's email address.
   * @param {string} name - The name of the new user.
   * @returns {Promise<object>} - The Nodemailer send mail response.
   */
  async sendWelcome(to, name) {
    const subject = 'Welcome to Our Service!';
    const html = `
      <p>Hello ${name},</p>
      <p>Welcome to our service! We're thrilled to have you onboard.</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,</p>
      <p>The Team</p>
    `;
    const text = htmlToText(html, { wordwrap: 130 });

    return this._sendEmailWithRetry({
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
   * @returns {Promise<object>} - The Nodemailer send mail response.
   */
  async sendPasswordReset(to, resetLink) {
    const subject = 'Password Reset Request';
    const html = `
      <p>Hello,</p>
      <p>You have requested a password reset. Please click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>This link will expire in a short time. If you did not request this, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The Team</p>
    `;
    const text = htmlToText(html, { wordwrap: 130 });

    return this._sendEmailWithRetry({
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
   * @param {string} subject - The subject of the email.
   * @param {string} messageHtml - The HTML content of the notification message.
   * @returns {Promise<object>} - The Nodemailer send mail response.
   */
  async sendNotification(to, subject, messageHtml) {
    const html = `
      <p>Hello,</p>
      ${messageHtml}
      <p>Best regards,</p>
      <p>The Team</p>
    `;
    const text = htmlToText(html, { wordwrap: 130 });

    return this._sendEmailWithRetry({
      from: this.defaultFrom,
      to,
      subject,
      html,
      text,
    });
  }
}

module.exports = EmailService;
