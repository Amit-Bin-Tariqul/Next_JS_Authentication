"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated by checking for the token in the cookies
    const token = document.cookie.split('; ').find((row) => row.startsWith('token='));

    if (!token) {
      router.push('/');  // Redirect to login if no token is found
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4 text-lg">You are successfully logged in.</p>
    </main>
  );
}
