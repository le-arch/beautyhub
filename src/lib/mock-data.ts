
import type { Salon, BlogPost, Conversation, Booking, Profile, User, Notification, UserSettings } from './types';

export const mockSalons: Salon[] = [
  {
    id: 1,
    name: 'Amber Glow Salon',
    image: 'https://images.unsplash.com/photo-1594736797933-d0301ba6add9?w=400',
    imageHint: 'modern salon interior',
    location: 'Lagos, Nigeria',
    rating: 4.5,
    reviews: 120,
    startingPrice: 10000,
    services: [
      {
        id: 1,
        name: 'Classic Manicure', price: 10000,
        duration: 45
      },
      {
        id: 2,
        name: 'Gel Pedicure', price: 12000,
        duration: 60
      },
      {
        id: 3,
        name: 'Knotless Braids', price: 25000,
        duration: 240
      },
    ],
    gallery: [
      {
        id: 1,
        url: 'https://placehold.co/600x400.png', hint: 'braiding hair', type: 'image',
      },
      {
        id: 2,
        url: 'https://placehold.co/600x400.png', hint: 'manicure station', type: 'image',
      },
    ],
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Serene Spa & Beauty',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
    imageHint: 'serene spa room',
    location: 'Accra, Ghana',
    rating: 5,
    reviews: 88,
    startingPrice: 15000,
    services: [
      {
        id: 4,
        name: 'Deep Tissue Massage', price: 20000,
        duration: 60
      },
      {
        id: 5,
        name: 'Hydrating Facial', price: 15000,
        duration: 75
      },
      {
        id: 6,
        name: 'Body Scrub', price: 18000,
        duration: 50
      },
    ],
    gallery: [],
  },
  {
    id: 3,
    name: 'Nairobi Nail Bar',
    image: 'https://images.unsplash.com/photo-1604654894610-df6231858918?w=400',
    imageHint: 'chic nail art',
    location: 'Nairobi, Kenya',
    rating: 4.8,
    reviews: 210,
    startingPrice: 5000,
    services: [
      {
        id: 7,
        name: 'Acrylic Fill-in', price: 8000,
        duration: 90
      },
      {
        id: 8,
        name: 'Nail Art', price: 5000,
        duration: 45
      },
      {
        id: 9,
        name: 'Luxury Pedicure', price: 10000,
        duration: 60
      },
    ],
    gallery: [],
    featured: true,
  },
   {
    id: 4,
    name: 'Dapper Cuts Barber',
    image: 'https://images.unsplash.com/photo-1599351522383-faf4958b7512?w=400',
    imageHint: 'classic barbershop',
    location: 'Johannesburg, SA',
    rating: 4.9,
    reviews: 300,
    startingPrice: 4000,
    services: [
      {
        id: 10,
        name: 'Haircut & Style', price: 5000,
        duration: 45
      },
      {
        id: 11,
        name: 'Hot Towel Shave', price: 4000,
        duration: 30
      },
      {
        id: 12,
        name: 'Beard Trim', price: 3000,
        duration: 20
      },
    ],
    gallery: [],
    verified: true,
    featured: true,
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Top 5 Protective Hairstyles for 2025',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'protective hairstyle braids',
    excerpt: 'Discover the trendiest and most effective protective hairstyles to keep your hair healthy and stylish all year long.',
  },
  {
    id: 2,
    title: 'Why Regular Facials Are Non-Negotiable',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'woman relaxing facial',
    excerpt: 'We dive into the science-backed benefits of regular facial treatments for glowing, youthful skin.',
  },
  {
    id: 3,
    title: "Cameroon's Top Nail Artists Revealed",
    image: 'https://placehold.co/600x400.png',
    imageHint: 'vibrant nail art',
    excerpt: 'Meet the creative minds behind the most stunning nail art in Cameroon. Get inspired for your next appointment!',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'convo-1',
    salonId: 1,
    salonName: 'Amber Glow Salon',
    salonAvatar: 'https://images.unsplash.com/photo-1594736797933-d0301ba6add9?w=100',
    lastMessage: 'Your appointment for Knotless Braids is confirmed!',
    timestamp: '2024-08-28T10:05:00Z',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        sender: 'salon',
        text: 'Your appointment for Knotless Braids is confirmed for Aug 28, 2024 at 10:00 AM. We look forward to seeing you!',
        timestamp: '2024-08-28T10:05:00Z',
        type: 'booking',
        bookingDetails: {
          service: 'Knotless Braids',
          date: 'August 28, 2024',
          time: '10:00 AM',
        },
      },
      {
        id: 'msg-2',
        sender: 'user',
        text: 'Great, thank you so much!',
        timestamp: '2024-08-28T10:06:00Z',
      },
    ],
  },
  {
    id: 'convo-2',
    salonId: 2,
    salonName: 'Serene Spa & Beauty',
    salonAvatar: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100',
    lastMessage: 'Yes, we do offer couple massages. It\'s one of our most popular packages.',
    timestamp: '2024-08-27T15:30:00Z',
    unreadCount: 0,
    messages: [
       {
        id: 'msg-3',
        sender: 'user',
        text: 'Hello, do you offer couple massages?',
        timestamp: '2024-08-27T15:28:00Z',
      },
      {
        id: 'msg-4',
        sender: 'salon',
        text: 'Yes, we do offer couple massages. It\'s one of our most popular packages.',
        timestamp: '2024-08-27T15:30:00Z',
      },
    ],
  },
];

export const mockBookings = {
  upcoming: [
    {
      id: 'up1',
      user_id: 'user-123',
      salon_id: 1,
      salons: mockSalons[0],
      service_name: 'Gel Pedicure',
      booking_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Confirmed' as const,
      total_price: 12000,
      deposit_paid: true,
      notes: 'Please use a light pink color.',
      created_at: new Date().toISOString()
    }
  ],
  completed: [
    {
      id: 'comp1',
      user_id: 'user-123',
      salon_id: 3,
      salons: mockSalons[2],
      service_name: 'Luxury Pedicure',
      booking_time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Completed' as const,
      total_price: 10000,
      deposit_paid: true,
      notes: null,
      created_at: new Date().toISOString()
    }
  ]
};

export const mockUser: User = {
  id: 'user-123',
  email: 'beauty.lover@example.com',
  full_name: 'Beauty Lover',
  avatar_url: 'https://i.pravatar.cc/150?u=beautylover',
  role: 'customer'
};

export const mockProfile: Profile = {
  id: 'user-123',
  full_name: 'Beauty Lover',
  avatar_url: 'https://i.pravatar.cc/150?u=beautylover',
  email: 'beauty.lover@example.com',
  phone: '+234 80 9876 5432',
  location: 'Lagos, Nigeria'
};

export const mockNotifications: Notification[] = [
    {
        id: '1',
        user_id: 'user-123',
        created_at: new Date().toISOString(),
        title: "Booking Confirmed!",
        description: "Your appointment at Amber Glow Salon is confirmed for tomorrow.",
        type: 'booking_confirmed',
        is_read: false
    },
    {
        id: '2',
        user_id: 'user-123',
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        title: "New Message",
        description: "Serene Spa & Beauty sent you a message.",
        type: 'new_message',
        is_read: false
    },
     {
        id: '3',
        user_id: 'user-123',
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        title: "New 5-Star Review",
        description: "You left a glowing review for Nairobi Nail Bar.",
        type: 'new_review',
        is_read: true
    }
];


export const mockUserSettings: UserSettings = {
    user_id: 'user-123',
    theme: 'light',
    language: 'en',
    currency: 'NGN',
    notifications: {
        booking_updates: true,
        new_messages: true,
        promotions: false,
    },
    updated_at: new Date().toISOString(),
};
