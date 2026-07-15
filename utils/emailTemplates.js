export function generateVerificatoinOtpEmailTemplate(otpCode) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
      </head>

      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin:40px 0; border-radius:8px; overflow:hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="background:#2563eb; padding:20px; text-align:center;">
                    <h1 style="color:#ffffff; margin:0; font-size:22px;">Email Verification</h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px;">
                    <p style="font-size:15px; color:#333;">Hello,</p>
                    <p style="font-size:15px; color:#333;">
                      Use the following One-Time Password (OTP) to verify your email address:
                    </p>

                    <div style="margin:30px 0; text-align:center;">
                      <span style="
                        display:inline-block;
                        font-size:28px;
                        letter-spacing:6px;
                        padding:12px 24px;
                        background:#f1f5f9;
                        color:#111827;
                        border-radius:6px;
                        font-weight:bold;
                      ">
                        ${otpCode}
                      </span>
                    </div>

                    <p style="font-size:14px; color:#555;">
                      This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.
                    </p>

                    <p style="font-size:14px; color:#555;">
                      If you did not request this, you can safely ignore this email.
                    </p>

                    <p style="font-size:14px; color:#333; margin-top:30px;">
                      Thanks,<br />
                      <strong>Your App Team</strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f8fafc; padding:15px; text-align:center;">
                    <p style="font-size:12px; color:#777; margin:0;">
                      © ${new Date().getFullYear()} Your App. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}


export function generateForgotPasswordEmailMessage(resetPasswordUrl) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Password Reset</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          background-color: #f4f6f8;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        .header {
          background: #0f62fe;
          color: #ffffff;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 30px;
          color: #333333;
          line-height: 1.6;
        }
        .btn {
          display: inline-block;
          margin: 25px 0;
          padding: 12px 24px;
          background: #0f62fe;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
        .footer {
          padding: 20px;
          font-size: 12px;
          color: #777777;
          text-align: center;
          background: #f4f6f8;
        }
        .link {
          word-break: break-all;
          color: #0f62fe;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <div class="header">
          <h2>Password Reset Request</h2>
        </div>

        <div class="content">
          <p>Hello,</p>

          <p>
            We received a request to reset your account password.
            Click the button below to set a new password.
          </p>

          <p style="text-align: center;">
            <a href="${resetPasswordUrl}" class="btn">
              Reset Password
            </a>
          </p>

          <p>
            If the button above doesn’t work, copy and paste this link
            into your browser:
          </p>

          <p class="link">${resetPasswordUrl}</p>

          <p>
            This password reset link is valid for a limited time.
            If you did not request a password reset, please ignore this email.
          </p>

          <p>Thanks,<br/>The Support Team</p>
        </div>

        <div class="footer">
          <p>
            This is an automated email. Please do not reply.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;
}