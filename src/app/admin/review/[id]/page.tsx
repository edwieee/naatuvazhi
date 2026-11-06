import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_ADMIN_SUBMISSIONS } from '@/data/mock-admin';
import AdminReviewClient from '@/components/admin/AdminReviewClient';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return MOCK_ADMIN_SUBMISSIONS.map((sub) => ({
    id: sub.id,
  }));
}

export default async function AdminReviewPage({ params }: Props) {
  const { id } = await params;
  const submission = MOCK_ADMIN_SUBMISSIONS.find((s) => s.id === id);

  if (!submission) {
    notFound();
  }

  return <AdminReviewClient submission={submission} />;
}
