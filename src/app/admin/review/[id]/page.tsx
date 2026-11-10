import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getSubmissionById } from '@/lib/supabase/data-service';
import { createClient as createServerClient } from '@/lib/supabase/server';
import AdminReviewClient from '@/components/admin/AdminReviewClient';

export function generateStaticParams() {
  return [
    { id: 'sub-101' },
    { id: 'sub-102' },
    { id: 'sub-103' },
    { id: 'sub-104' },
  ];
}


interface Props {
  params: Promise<{ id: string }>;
}

async function ReviewContent({ id }: { id: string }) {
  const supabase = await createServerClient();
  const submission = await getSubmissionById(id, supabase);

  if (!submission) {
    notFound();
  }

  return <AdminReviewClient submission={submission} />;
}

export default async function AdminReviewPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex-1 p-8 text-center text-xs text-[#8C8273]">
          Loading curatorial accession...
        </div>
      }
    >
      <ReviewContent id={id} />
    </Suspense>
  );
}
