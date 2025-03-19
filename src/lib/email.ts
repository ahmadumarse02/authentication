import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL

//twoFactor Email

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your two factor code: ${token}</p>`,
  });
};

//Verification Email
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/newVerification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p><a href="${confirmLink}">Here</a> to confirm email</p>`,
  });
};

//password reset email
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/newPassword?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password",
    html: `<p><a href="${confirmLink}">Here</a> to reset password</p>`,
  });
};
