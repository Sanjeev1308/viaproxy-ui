import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/db/models/user.model';
import connectDB from '@/lib/db/connect';
import { getPaginationParams } from '@/lib/api/pagination';
import { userCreateSchema } from '@/lib/api/validators';
import { getErrorMessage } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const { page, limit, skip } = getPaginationParams({
      page: Number(searchParams.get('page')),
      limit: Number(searchParams.get('limit')),
    });

    const [users, total] = await Promise.all([
      User.find({}).select('-password').skip(skip).limit(limit).lean(),
      User.countDocuments({}),
    ]);

    return NextResponse.json({
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validatedData = userCreateSchema.parse(body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const user = await User.create(validatedData);
    const userResponse = { ...user.toObject(), password: undefined };

    return NextResponse.json(userResponse, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
