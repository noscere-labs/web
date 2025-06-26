import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().min(1, 'Slug is required').max(200, 'Slug must be less than 200 characters'),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().default(false),
  publishedAt: z.date().optional(),
  authorId: z.string().cuid(),
  categoryIds: z.array(z.string().cuid()).optional(),
  tagIds: z.array(z.string().cuid()).optional(),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  slug: z.string().min(1, 'Slug is required').max(100, 'Slug must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
})

export const tagSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  slug: z.string().min(1, 'Slug is required').max(50, 'Slug must be less than 50 characters'),
})

export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().max(100, 'Name must be less than 100 characters').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100, 'Company name must be less than 100 characters').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
})