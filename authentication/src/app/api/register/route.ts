import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ message: 'User created successfully', user });
  } catch (error) {
    return NextResponse.json({ error: 'User creation failed', details: error }, { status: 500 });
  }
}
