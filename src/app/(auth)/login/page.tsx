/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getErrorMessage } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import RenderFormFieldList from '@/components/form/RenderFormFieldList';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to login');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const formField = [
    [
      {
        checked: true,
        disabled: false,
        label: 'First Name',
        name: 'firstName',
        placeholder: 'Please enter email',
        required: true,
        rowIndex: 0,
        type: 'email',
        value: '',
        variant: 'Input',
      },
      {
        checked: true,
        disabled: false,
        label: 'Last Name',
        name: 'LastName',
        placeholder: 'Please enter email',
        required: true,
        rowIndex: 0,
        type: 'email',
        value: '',
        variant: 'Input',
      },
    ],

    {
      checked: true,
      disabled: false,
      label: 'Email',
      name: 'email',
      placeholder: 'Please enter email',
      required: true,
      rowIndex: 0,
      type: 'email',
      value: '',
      variant: 'Input',
    },
    {
      checked: true,
      disabled: false,
      label: 'Password',
      name: 'password',
      placeholder: 'Please enter password',
      required: true,
      rowIndex: 0,
      type: '',
      value: '',
      variant: 'Password',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form {...form}>
          <form
            className="space-y-8 max-w-3xl mx-auto py-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <RenderFormFieldList fieldArray={formField} form={form} />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="text-sm">
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Dont have an account?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
