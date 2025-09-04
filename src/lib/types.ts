
import type { User } from "@supabase/supabase-js";

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number; // in minutes
}

export interface GalleryItem {
  id: number;
  url: string;
  hint: string;
  type: 'image' | 'video';
}

export interface Salon {
  id: number;
  name: string;
  image: string;
  imageHint: string;
  location: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  services: Service[];
  gallery: GalleryItem[];
  verified?: boolean;
  featured?: boolean;
  owner_id?: string;
  specialties?: string[];
  distance?: string;
  responseTime?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  image: string;
  imageHint: string;
  excerpt: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'salon';
  type?: 'booking' | 'text';
  bookingDetails?: {
    service: string;
    date: string;
    time: string;
  };
}

export interface Conversation {
  id: string;
  salonId: number;
  salonName: string;
  salonAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

export interface Booking {
    id: string;
    created_at: string;
    user_id: string;
    salon_id: number;
    service_name: string;
    booking_time: string;
    total_price: number;
    deposit_paid: boolean;
    notes: string | null;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    salons: {
      name: string;
      image: string;
    } | null;
}

export interface Profile {
  id: string;
  updated_at?: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  location: string | null;
  email?: string;
}

export interface Notification {
    id: string;
    user_id: string;
    created_at: string;
    title: string;
    description: string;
    type: string;
    is_read: boolean;
}

export interface UserSettings {
    user_id: string;
    theme: 'light' | 'dark';
    language: string;
    currency: string;
    notifications: {
        booking_updates: boolean;
        new_messages: boolean;
        promotions: boolean;
    };
    updated_at: string;
}
