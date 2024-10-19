import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:8886/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verificação de email",
    html: `<p>Para confirmar seu email, clique no link abaixo:</p><a href="${confirmLink}">${confirmLink}</a>`,
  });
};
