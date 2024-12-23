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
import { RenderFormField } from '@/components/form/RenderFormField';
import { Form } from '@/components/ui/form';
import RenderFormFieldList from '@/components/form/RenderFormFieldList';

const calculateColumnSpan = (fieldGroup: any[]) => {
  const totalFields = fieldGroup.length;

  // Predefined column span mapping
  const columnSpanMap: { [key: number]: string } = {
    1: 'col-span-12',
    2: 'col-span-6',
    3: 'col-span-4',
    4: 'col-span-3',
  };

  // Return mapped column span or default to full width if not in map
  return columnSpanMap[totalFields] || 'col-span-12';
};

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['admin', 'eco-citizen', 'merchant', 'student']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to register');
      }

      setSuccess(
        'Registration successful! Please check your email to verify your account.'
      );
      setTimeout(() => router.push('/login'), 3000);
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
        placeholder: 'Please enter first name',
        required: true,
        rowIndex: 0,
        type: 'text',
        value: '',
        variant: 'Input',
      },
      {
        checked: true,
        disabled: false,
        label: 'Last Name',
        name: 'lastName',
        placeholder: 'Please enter Last Name',
        required: true,
        rowIndex: 0,
        type: 'text',
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
    {
      checked: true,
      disabled: false,
      label: 'Confirm Password',
      name: 'confirmPassword',
      placeholder: 'Please enter password',
      required: true,
      rowIndex: 0,
      type: '',
      value: '',
      variant: 'Password',
    },
    {
      checked: true,
      disabled: false,
      label: 'Role',
      name: 'role',
      placeholder: 'Please enter role',
      required: true,
      rowIndex: 0,
      type: '',
      value: '',
      variant: 'Select',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Eco-citizen', value: 'eco-citizen' },
        { label: 'Merchant', value: 'merchant' },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <Form {...form}>
          <form
            className="mt-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}
            <RenderFormFieldList fieldArray={formField} form={form} />

            <div className="text-sm text-center">
              <Link href="/login" className="text-blue-600 hover:text-blue-500">
                Already have an account? Sign in
              </Link>
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              Create Account
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
