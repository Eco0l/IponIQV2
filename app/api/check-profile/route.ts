// app/api/check-profile/route.ts
import { NextResponse } from 'next/server';  // Import NextResponse for app directory API
import { getUserInitial } from '@/db/queries'; // Import your function to check the user profile

export async function GET() {
  try {
    // Call your getUserInitial function to check if the user already has a profile
    const userProfile = await getUserInitial();

    if (userProfile) {
      // If profile exists, return it
      return NextResponse.json({ profileExists: true });
    } else {
      // If no profile found, return false
      return NextResponse.json({ profileExists: false });
    }
  } catch (error) {
    console.error("Error checking profile:", error);
    return NextResponse.json({ error: 'Failed to check profile' }, { status: 500 });
  }
}
