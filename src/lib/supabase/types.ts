export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      districts: {
        Row: {
          id: string;
          code: string;
          name: string;
          name_malayalam: string;
          center_lat: number;
          center_lng: number;
          cultural_signature: string;
          primary_art_forms: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          name_malayalam: string;
          center_lat: number;
          center_lng: number;
          cultural_signature: string;
          primary_art_forms?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          name_malayalam?: string;
          center_lat?: number;
          center_lng?: number;
          cultural_signature?: string;
          primary_art_forms?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          name_malayalam: string;
          description: string | null;
          icon_name: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          name_malayalam: string;
          description?: string | null;
          icon_name?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          name_malayalam?: string;
          description?: string | null;
          icon_name?: string | null;
          display_order?: number;
          created_at?: string;
        };
      };
      listings: {
        Row: {
          id: string;
          slug: string;
          name: string;
          name_malayalam: string;
          category_id: string | null;
          art_form: string;
          district_id: string;
          locality: string;
          address: string;
          latitude: number;
          longitude: number;
          short_description: string;
          full_story: string;
          cultural_significance: string;
          visitor_protocol: string;
          image_url: string;
          image_credit: string;
          verification_status: 'Verified' | 'Scholar Reviewed' | 'Community Pending';
          verified_by: string | null;
          last_reviewed: string | null;
          official_website: string | null;
          contributor_name: string | null;
          contributor_role: string | null;
          contributor_submitted_at: string | null;
          featured: boolean;
          display_order: number;
          tags: string[];
          publication_status: 'published' | 'draft' | 'archived';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          name_malayalam: string;
          category_id?: string | null;
          art_form: string;
          district_id: string;
          locality: string;
          address: string;
          latitude: number;
          longitude: number;
          short_description: string;
          full_story: string;
          cultural_significance: string;
          visitor_protocol: string;
          image_url: string;
          image_credit: string;
          verification_status?: 'Verified' | 'Scholar Reviewed' | 'Community Pending';
          verified_by?: string | null;
          last_reviewed?: string | null;
          official_website?: string | null;
          contributor_name?: string | null;
          contributor_role?: string | null;
          contributor_submitted_at?: string | null;
          featured?: boolean;
          display_order?: number;
          tags?: string[];
          publication_status?: 'published' | 'draft' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          name_malayalam?: string;
          category_id?: string | null;
          art_form?: string;
          district_id?: string;
          locality?: string;
          address?: string;
          latitude?: number;
          longitude?: number;
          short_description?: string;
          full_story?: string;
          cultural_significance?: string;
          visitor_protocol?: string;
          image_url?: string;
          image_credit?: string;
          verification_status?: 'Verified' | 'Scholar Reviewed' | 'Community Pending';
          verified_by?: string | null;
          last_reviewed?: string | null;
          official_website?: string | null;
          contributor_name?: string | null;
          contributor_role?: string | null;
          contributor_submitted_at?: string | null;
          featured?: boolean;
          display_order?: number;
          tags?: string[];
          publication_status?: 'published' | 'draft' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          slug: string;
          title: string;
          title_malayalam: string;
          category: string;
          art_form: string;
          event_date: string;
          formatted_date: string;
          time: string;
          venue: string;
          district_id: string;
          locality: string;
          address: string | null;
          organizer: string;
          description: string;
          cultural_context: string;
          source_link: string;
          last_confirmed_date: string;
          status: 'Confirmed' | 'Tentative' | 'Annual Season' | 'Cancelled' | 'Postponed';
          image_url: string;
          entry_type: 'Free Entry' | 'Pass Required' | 'Ritual Offering';
          schedule_highlights: Json;
          featured: boolean;
          publication_status: 'published' | 'draft' | 'archived';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          title_malayalam: string;
          category: string;
          art_form: string;
          event_date: string;
          formatted_date: string;
          time: string;
          venue: string;
          district_id: string;
          locality: string;
          address?: string | null;
          organizer: string;
          description: string;
          cultural_context: string;
          source_link: string;
          last_confirmed_date?: string;
          status?: 'Confirmed' | 'Tentative' | 'Annual Season' | 'Cancelled' | 'Postponed';
          image_url: string;
          entry_type?: 'Free Entry' | 'Pass Required' | 'Ritual Offering';
          schedule_highlights?: Json;
          featured?: boolean;
          publication_status?: 'published' | 'draft' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          title_malayalam?: string;
          category?: string;
          art_form?: string;
          event_date?: string;
          formatted_date?: string;
          time?: string;
          venue?: string;
          district_id?: string;
          locality?: string;
          address?: string | null;
          organizer?: string;
          description?: string;
          cultural_context?: string;
          source_link?: string;
          last_confirmed_date?: string;
          status?: 'Confirmed' | 'Tentative' | 'Annual Season' | 'Cancelled' | 'Postponed';
          image_url?: string;
          entry_type?: 'Free Entry' | 'Pass Required' | 'Ritual Offering';
          schedule_highlights?: Json;
          featured?: boolean;
          publication_status?: 'published' | 'draft' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
      };
      sources: {
        Row: {
          id: string;
          listing_id: string | null;
          event_id: string | null;
          source_type: string;
          title: string;
          author_or_archive: string;
          year: string | null;
          url: string | null;
          description: string | null;
          checked_at: string;
          verification_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id?: string | null;
          event_id?: string | null;
          source_type?: string;
          title: string;
          author_or_archive: string;
          year?: string | null;
          url?: string | null;
          description?: string | null;
          checked_at?: string;
          verification_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string | null;
          event_id?: string | null;
          source_type?: string;
          title?: string;
          author_or_archive?: string;
          year?: string | null;
          url?: string | null;
          description?: string | null;
          checked_at?: string;
          verification_notes?: string | null;
          created_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          listing_id: string | null;
          event_id: string | null;
          storage_path: string | null;
          url: string;
          caption: string;
          credit: string;
          photographer: string | null;
          permission_status: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id?: string | null;
          event_id?: string | null;
          storage_path?: string | null;
          url: string;
          caption: string;
          credit: string;
          photographer?: string | null;
          permission_status?: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string | null;
          event_id?: string | null;
          storage_path?: string | null;
          url?: string;
          caption?: string;
          credit?: string;
          photographer?: string | null;
          permission_status?: string;
          display_order?: number;
          created_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          type: 'Place' | 'Artist' | 'Institution' | 'Event' | 'Correction';
          name: string;
          art_form: string;
          district_id: string;
          locality: string;
          description: string;
          cultural_significance: string;
          sources: string[];
          contributor_name: string;
          contributor_email: string;
          submitted_at: string;
          status: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected';
          reviewer_notes: string | null;
          urgency: 'Low' | 'Medium' | 'High';
          rights_confirmed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          type: 'Place' | 'Artist' | 'Institution' | 'Event' | 'Correction';
          name: string;
          art_form: string;
          district_id: string;
          locality: string;
          description: string;
          cultural_significance: string;
          sources?: string[];
          contributor_name: string;
          contributor_email: string;
          submitted_at?: string;
          status?: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected';
          reviewer_notes?: string | null;
          urgency?: 'Low' | 'Medium' | 'High';
          rights_confirmed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: 'Place' | 'Artist' | 'Institution' | 'Event' | 'Correction';
          name?: string;
          art_form?: string;
          district_id?: string;
          locality?: string;
          description?: string;
          cultural_significance?: string;
          sources?: string[];
          contributor_name?: string;
          contributor_email?: string;
          submitted_at?: string;
          status?: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected';
          reviewer_notes?: string | null;
          urgency?: 'Low' | 'Medium' | 'High';
          rights_confirmed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      review_logs: {
        Row: {
          id: string;
          submission_id: string | null;
          listing_id: string | null;
          event_id: string | null;
          reviewer_name: string;
          reviewer_email: string;
          action: string;
          notes: string | null;
          previous_state: Json | null;
          new_state: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_id?: string | null;
          listing_id?: string | null;
          event_id?: string | null;
          reviewer_name: string;
          reviewer_email: string;
          action: string;
          notes?: string | null;
          previous_state?: Json | null;
          new_state?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          submission_id?: string | null;
          listing_id?: string | null;
          event_id?: string | null;
          reviewer_name?: string;
          reviewer_email?: string;
          action?: string;
          notes?: string | null;
          previous_state?: Json | null;
          new_state?: Json | null;
          created_at?: string;
        };
      };
      homepage_config: {
        Row: {
          key: string;
          value_json: Json;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          key: string;
          value_json: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          key?: string;
          value_json?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
    };
  };
}
