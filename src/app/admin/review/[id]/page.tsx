import React from 'react';
import { notFound } from 'next/navigation';
import { getSubmissionById } from '@/lib/supabase/data-service';
import { createClient as createServerClient } from '@/lib/supabase/server';
import AdminReviewClient from '@/components/admin/AdminReviewClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminReviewPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServerClient();
  const submission = await getSubmissionById(id, supabase);

  if (!submission) {
    notFound();
  }

  return <AdminReviewClient submission={submission} />;
}
