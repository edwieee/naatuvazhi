'use server';

import { revalidatePath } from 'next/cache';
import { createClient as createServerClient } from '@/lib/supabase/server';
import {
  createListing,
  updateListing,
  deleteListing,
  createEvent,
  updateEvent,
  deleteEvent,
  createSubmission,
  updateSubmissionStatus,
  approveSubmissionAndPublish,
  updateHomepageConfig,
} from '@/lib/supabase/data-service';
import { CulturalListing, EventListing, SubmissionReviewItem } from '@/lib/types';

// ====================================================================
// PUBLIC CONTRIBUTIONS (NO AUTH REQUIRED)
// ====================================================================

export async function actionSubmitContribution(data: Partial<SubmissionReviewItem>) {
  try {
    const sub = await createSubmission(data);
    revalidatePath('/admin');
    return { success: true, submission: sub };
  } catch (error: any) {
    console.error('Error submitting contribution:', error);
    return { success: false, error: error.message || 'Submission failed' };
  }
}

// ====================================================================
// CURATOR MODERATION & WORKFLOW (AUTH REQUIRED)
// ====================================================================

async function getAuthenticatedCurator() {
  const supabase = await createServerClient();
  if (!supabase) {
    throw new Error('Supabase service not configured');
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized: Valid Curator sign-in required');
  }

  return { supabase, user };
}

export async function actionModerateSubmission(
  id: string,
  status: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected',
  reviewerNotes?: string
) {
  try {
    const { supabase, user } = await getAuthenticatedCurator();
    const reviewerInfo = {
      name: user.email?.split('@')[0] || 'Curator Staff',
      email: user.email || 'curator.nattuvazhi@gmail.com',
    };

    if ((status === 'Changes Requested' || status === 'Rejected') && (!reviewerNotes || !reviewerNotes.trim())) {
      return {
        success: false,
        error: `Curator notes/reasons are required when marking a submission as ${status}.`,
      };
    }

    if (status === 'Approved') {
      const res = await approveSubmissionAndPublish(id, reviewerNotes, supabase, reviewerInfo);

      // Revalidate all affected routes so the new listing / event is immediately live
      revalidatePath('/');
      revalidatePath('/explore');
      revalidatePath('/events');
      if (res.listing?.slug) {
        revalidatePath(`/culture/${res.listing.slug}`);
      }
      if (res.event?.slug) {
        revalidatePath(`/events/${res.event.slug}`);
      }
      revalidatePath('/admin');
      revalidatePath(`/admin/review/${id}`);

      return {
        success: true,
        submission: res.submission,
        listing: res.listing,
        event: res.event,
        type: res.event ? 'Event' : 'Listing',
      };
    } else {
      const sub = await updateSubmissionStatus(id, status, reviewerNotes, supabase, reviewerInfo);
      revalidatePath('/admin');
      revalidatePath(`/admin/review/${id}`);
      return { success: true, submission: sub };
    }
  } catch (error: any) {
    console.error('Moderation error:', error);
    return { success: false, error: error.message || 'Moderation action failed' };
  }
}

// ====================================================================
// CURATOR DIRECT CMS ACTIONS (AUTH REQUIRED)
// ====================================================================

export async function actionCreateListing(data: Partial<CulturalListing>) {
  try {
    const { supabase } = await getAuthenticatedCurator();
    const listing = await createListing(data, supabase);
    revalidatePath('/');
    revalidatePath('/explore');
    revalidatePath(`/culture/${listing.slug}`);
    revalidatePath('/admin');
    return { success: true, listing };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function actionUpdateListing(id: string, data: Partial<CulturalListing>) {
  try {
    const { supabase } = await getAuthenticatedCurator();
    const listing = await updateListing(id, data, supabase);
    if (!listing) return { success: false, error: 'Listing not found' };
    revalidatePath('/');
    revalidatePath('/explore');
    revalidatePath(`/culture/${listing.slug}`);
    revalidatePath('/admin');
    return { success: true, listing };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function actionDeleteListing(id: string) {
  try {
    const { supabase } = await getAuthenticatedCurator();
    const success = await deleteListing(id, supabase);
    revalidatePath('/');
    revalidatePath('/explore');
    revalidatePath('/admin');
    return { success };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function actionCreateEvent(data: Partial<EventListing>) {
  try {
    const { supabase } = await getAuthenticatedCurator();
    const event = await createEvent(data, supabase);
    revalidatePath('/');
    revalidatePath('/events');
    revalidatePath(`/events/${event.slug}`);
    revalidatePath('/admin');
    return { success: true, event };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function actionUpdateEvent(id: string, data: Partial<EventListing>) {
  try {
    const { supabase } = await getAuthenticatedCurator();
    const event = await updateEvent(id, data, supabase);
    if (!event) return { success: false, error: 'Event not found' };
    revalidatePath('/');
    revalidatePath('/events');
    revalidatePath(`/events/${event.slug}`);
    revalidatePath('/admin');
    return { success: true, event };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function actionDeleteEvent(id: string) {
  try {
    const { supabase } = await getAuthenticatedCurator();
    const success = await deleteEvent(id, supabase);
    revalidatePath('/');
    revalidatePath('/events');
    revalidatePath('/admin');
    return { success };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function actionUpdateHomepageConfig(key: string, value: any) {
  try {
    const { supabase, user } = await getAuthenticatedCurator();
    const updatedBy = user.email?.split('@')[0] || 'Curator';
    const success = await updateHomepageConfig(key, value, updatedBy, supabase);
    revalidatePath('/');
    revalidatePath('/admin');
    return { success };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
