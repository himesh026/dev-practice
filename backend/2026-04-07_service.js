// Type      : Backend Utility
// Date      : 2026-04-07
// ───────────────────────────────────────────────────────
/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');
const { htmlToText } = require('html-to-text');

/**
 * @typedef {object} EmailServiceOptions
 * @property {string} host The SMTP host.
 * @property {number} port The SMTP port.
 * @property {boolean} secure Whether to use SSL/TLS.
 * @property {string} authUser The username for SMTP authentication.
 * @property {string} authPass The password for SMTP authentication.
 * @property {string} defaultFrom The default 'from' email address.
 * @property {number} [maxRetries=3] Maximum number of retries for sending an email.
 * @property {number} [retryDelayMs=1000] Delay in milliseconds between retries.
 */

/**
 * A production-ready email service module using Nodemailer.
 * Provides methods for sending various types of templated emails with retry support.
 */
class EmailService {
  /**
   * Creates an instance of EmailService.
   * @param {EmailServiceOptions} options Configuration options for the email service.
   */
  constructor(options) {
    if (!options.host || !options.port || !options.authUser || !options.authPass || !options.defaultFrom) {
      throw new Error('EmailService: Missing required configuration options (host, port, authUser, authPass, defaultFrom).');
    }

    this.options = {
      maxRetries: 3,
      retryDelayMs: 1000,
      ...options,
    };

    this.transporter = nodemailer.createTransport({
      host: this.options.host,
      port: this.options.port,
      secure: this.options.secure,
      auth: {
        user: this.options.authUser,
        pass: this.options.authPass,
      },
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('EmailService: SMTP connection verification failed:', error.message);
      } else {
        console.log('EmailService: SMTP server is ready to take our messages.');
      }
    });
  }

  /**
   * Sends an email with retry logic.
   * @private
   * @param {object} mailOptions Nodemailer mail options.
   * @param {number} [retries=0] Current retry count.
   * @returns {Promise<object>} The Nodemailer send mail response.
   * @throws {Error} If email sending fails after all retries.
   */
  async _sendEmailWithRetry(mailOptions, retries = 0) {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      if (retries < this.options.maxRetries) {
        console.warn(`EmailService: Failed to send email (attempt ${retries + 1}/${this.options.maxRetries}). Retrying in ${this.options.retryDelayMs}ms...`, error.message);
        await new Promise(resolve => setTimeout(resolve, this.options.retryDelayMs));
        return this._sendEmailWithRetry(mailOptions, retries + 1);
      }
      throw new Error(`EmailService: Failed to send email after ${this.options.maxRetries} attempts: ${error.message}`);
    }
  }

  /**
   * Sends a welcome email to a new user.
   * @param {string} to The recipient's email address.
   * @param {string} name The recipient's name.
   * @param {string} [subject='Welcome to our service!'] The subject of the email.
   * @returns {Promise<object>} The Nodemailer send mail response.
   * @throws {Error} If email sending fails.
   */
  async sendWelcome(to, name, subject = 'Welcome to our service!') {
    if (!to || !name) {
      throw new Error('EmailService: sendWelcome requires recipient email and name.');
    }
    const html = `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining our service. We're excited to have you!</p>
      <p>If you have any questions, feel free to contact us.</p>
      <p>Best regards,<br>The Team</p>
    `;
    const text = htmlToText(html, { wordwrap: 130 });

    return this._sendEmailWithRetry({
      from: this.options.defaultFrom,
      to,
      subject,
      html,
      text,
    });
  }

  /**
   * Sends a password reset email.
   * @param {string} to The recipient's email address.
   * @param {string} resetLink The URL for password reset.
   * @param {string} [subject='Password Reset Request'] The subject of the email.
   * @returns {Promise<object>} The Nodemailer send mail response.
   * @throws {Error} If email sending fails.
   */
  async sendPasswordReset(to, resetLink, subject = 'Password Reset Request') {
    if (!to || !resetLink) {
      throw new Error('EmailService: sendPasswordReset requires recipient email and reset link.');
    }
    const html = `
      <h1>Password Reset</h1>
      <p>You have requested a password reset. Please click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset My Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <p>This link will expire in a short time.</p>
    `;
    const text = htmlToText(html, { wordwrap: 130 });

    return this._sendEmailWithRetry({
      from: this.options.defaultFrom,
      to,
      subject,
      html,
      text,
    });
  }

  /**
   * Sends a general notification email.
   * @param {string} to The recipient's email address.
   * @param {string} subject The subject of the email.
   * @param {string} messageHtml The HTML content of the notification message.
   * @returns {Promise<object>} The Nodemailer send mail response.
   * @throws {Error} If email sending fails.
   */
  async sendNotification(to, subject, messageHtml) {
    if
