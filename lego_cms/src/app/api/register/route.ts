import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // 1. PERBAIKI: Ambil 'username' juga
    const { email, username, password }: { 
      email?: string; 
      username?: string; // <-- TAMBAHKAN INI
      password?: string; 
    } = await request.json();

    // 2. PERBAIKI: Tambahkan validasi untuk username
    if (!email || !username || !password) {
      return NextResponse.json(
        { message: 'Email, username, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
       return NextResponse.json(
        { message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    await dbConnect();

    // 3. Cek apakah email ATAU username sudah ada
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }],
    });
    
    if (existingUser) {
      // Cek mana yang duplikat
      const message = existingUser.email === email 
        ? 'User with this email already exists.' 
        : 'User with this username already exists.';
      return NextResponse.json({ message }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. PERBAIKI: Simpan 'username' ke database
    const user = new User({
      email,
      username, // <-- TAMBAHKAN INI
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json(
      { message: 'User created successfully.' },
      { status: 201 } // 201 Created
    );

  } catch (error: any) {
    console.error('Registration Error:', error);

    // Ini akan menangani error validasi dari Mongoose
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { message: 'Validation failed', error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'An error occurred during registration.', error: error.message },
      { status: 500 }
    );
  }
}