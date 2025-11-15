import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 1. Terhubung ke database
    await dbConnect();

    // 2. Cari pengguna berdasarkan email
    const user = await User.findOne({ email });

    // 3. Jika user tidak ditemukan
    if (!user) {
      // Kirim respons "401 Unauthorized" yang samar
      // Ini adalah praktik keamanan yang baik (tidak memberi tahu penyerang email mana yang terdaftar)
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 4. Bandingkan password yang dikirim dengan hash di database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // 5. Jika password salah
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 6. Jika login BERHASIL
    // (Di aplikasi nyata, di sinilah Anda akan membuat session atau JWT)
    return NextResponse.json(
      { 
        message: 'Login successful!',
        // Kirim kembali data user (TANPA password)
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login.', error: error.message },
      { status: 500 }
    );
  }
}