import { sendVerificationEmail } from '../../../lib/email';
import { randomBytes } from 'crypto';
import connection from '@/lib/db';

export async function POST(req) {
  const { email } = await req.json();
  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
  }

  // Generate a random token
  const token = randomBytes(32).toString('hex');

  // Simpan token ke database beserta email
  await connection.execute(
    'UPDATE users SET verification_token = ? WHERE email = ?',
    [token, email]
  );

  try {
    await sendVerificationEmail({ to: email, token });
    return new Response(JSON.stringify({ message: 'Verification email sent' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
