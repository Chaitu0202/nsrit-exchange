// lib/validators.ts

import { z } from 'zod';

// Validate item creation/update
export const itemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().nonnegative('Price cannot be negative'),
});

// Validate user signup
export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

// Validate purchase request
export const purchaseSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  itemId: z.string().min(1, 'Item ID is required'),
});

// Validate withdraw request
export const withdrawSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});
