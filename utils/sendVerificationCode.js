import { generateVerificatoinOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email) {
  const message = generateVerificatoinOtpEmailTemplate(verificationCode);

  await sendEmail({
    email,
    subject: "Verification Code (Library MS)",
    message,
  });
}
