import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/db/models/user.model';
import connectDB from '@/lib/db/connect';
import { userUpdateSchema } from '@/lib/api/validators';
import { getErrorMessage } from '@/lib/utils';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const user = await User.findById(params.id).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const body = await request.json();
    const validatedData = userUpdateSchema.parse(body);

    if (validatedData.email) {
      const existingUser = await User.findOne({
        email: validatedData.email,
        _id: { $ne: params.id },
      });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      }
    }

    const user = await User.findByIdAndUpdate(params.id, validatedData, {
      new: true,
    }).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const user = await User.findByIdAndDelete(params.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
