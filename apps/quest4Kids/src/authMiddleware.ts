'use server';
import { auth } from '@repo/auth/server';

export const requireAuth = async () => {
  const session = await auth();
  if (!session) throw new Error('Not authenticated');
  return session;
};