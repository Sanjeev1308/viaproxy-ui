/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { User } from '@/lib/db/models/user.model';
import connectDB from '@/lib/db/connect';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { token } = await req.json();

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    user.isEmailVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return NextResponse.json({
      message: 'Email verified successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
