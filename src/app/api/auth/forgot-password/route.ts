/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { NextResponse } from 'next/server';
import { User } from '@/lib/db/models/user.model';
import connectDB from '@/lib/db/connect';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email/sendEmail';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists, a password reset email has been sent.',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({
      message: 'Password reset email sent',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
