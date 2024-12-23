/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { NextResponse } from 'next/server';
import { User } from '@/lib/db/models/user.model';
import connectDB from '@/lib/db/connect';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { token, newPassword } = await req.json();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({
      message: 'Password reset successful',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
