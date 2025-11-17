import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function PATCH(request: Request) {
  try {
    const { userId, productId, action } = await request.json();

    if (!userId || !productId || !action) {
      return NextResponse.json(
        { message: 'Missing required fields (userId, productId, action)' },
        { status: 400 }
      );
    }

    await dbConnect();

    let updateOperation;

    if (action === 'add') {

      updateOperation = { $addToSet: { favorites: productId } };
    } else if (action === 'remove') {

      updateOperation = { $pull: { favorites: productId } };
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    // Temukan user dan perbarui array-nya
    await User.findByIdAndUpdate(userId, updateOperation);

    return NextResponse.json({ message: 'Favorites updated successfully' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error updating favorites', error: error.message },
      { status: 500 }
    );
  }
}