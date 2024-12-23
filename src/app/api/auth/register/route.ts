/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { User } from '@/lib/db/models/user.model';
import connectDB from '@/lib/db/connect';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/email/sendEmail';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { firstName, lastName, email, password, role } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      verificationToken,
    });

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      message: 'Registration successful. Please verify your email.',
      userId: user._id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
