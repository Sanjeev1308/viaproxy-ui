'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getErrorMessage } from '@/lib/utils';
import { Suspense } from 'react';

function VerifyEmailPageView() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>(
    'verifying'
  );
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          throw new Error('Verification token is missing');
        }

        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to verify email');
        }

        setStatus('success');
        setTimeout(() => router.push('/login'), 3000);
      } catch (err) {
        setError(getErrorMessage(err));
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {status === 'verifying' && (
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Verifying your email
            </h2>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="rounded-md bg-green-50 p-4">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
              Email Verified!
            </h2>
            <p className="text-sm text-green-700 text-center">
              Your email has been successfully verified. Redirecting to login...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-md bg-red-50 p-4">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
              Verification Failed
            </h2>
            <p className="text-sm text-red-700 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailPageView />
    </Suspense>
  );
}
