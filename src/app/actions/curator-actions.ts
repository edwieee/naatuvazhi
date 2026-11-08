'use server';

import { revalidatePath } from 'next/cache';
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

export async function actionCreateListing(data: Partial<CulturalListing>) {
  try {
    const listing = await createListing(data);
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
    const listing = await updateListing(id, data);
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
    const success = await deleteListing(id);
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
    const event = await createEvent(data);
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
    const event = await updateEvent(id, data);
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
    const success = await deleteEvent(id);
    revalidatePath('/');
    revalidatePath('/events');
    revalidatePath('/admin');
    return { success };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function actionSubmitContribution(data: Partial<SubmissionReviewItem>) {
  try {
    const sub = await createSubmission(data);
    revalidatePath('/admin');
    return { success: true, submission: sub };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function actionModerateSubmission(
  id: string,
  status: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected',
  reviewerNotes?: string
) {
  try {
    if (status === 'Approved') {
      const res = await approveSubmissionAndPublish(id, reviewerNotes);
      revalidatePath('/');
      revalidatePath('/explore');
      revalidatePath('/admin');
      revalidatePath(`/admin/review/${id}`);
      return { success: true, ...res };
    } else {
      const sub = await updateSubmissionStatus(id, status, reviewerNotes);
      revalidatePath('/admin');
      revalidatePath(`/admin/review/${id}`);
      return { success: true, submission: sub };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function actionUpdateHomepageConfig(key: string, value: any) {
  try {
    const success = await updateHomepageConfig(key, value);
    revalidatePath('/');
    revalidatePath('/admin');
    return { success };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
