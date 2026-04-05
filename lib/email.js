import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({ to, token }) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;
  const subject = 'Verifikasi Email CashBhak';
  const html = `<p>Silakan klik link berikut untuk verifikasi email Anda:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to,
      subject,
      html,
    });
    
    if (error) {
      console.error("Resend API Kesalahan:", error);
      return { error };
    }
    
    console.log("Email berhasil dikirim ke Service Resend:", data);
    return { data };
  } catch (err) {
    console.error("Kesalahan internal pengiriman email:", err);
    return { error: err };
  }
}
