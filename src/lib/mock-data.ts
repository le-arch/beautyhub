import type { Salon, BlogPost, Conversation } from './types';

export const mockSalons: Salon[] = [
  {
    id: 1,
    name: 'Amber Glow Salon',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'modern salon interior',
    location: 'Lagos, Nigeria',
    rating: 4.5,
    reviews: 120,
    startingPrice: 50,
    services: [
      {
        name: 'Classic Manicure', price: 50,
        id: 0,
        duration: 0
      },
      {
        name: 'Gel Pedicure', price: 75,
        id: 0,
        duration: 0
      },
      {
        name: 'Knotless Braids', price: 200,
        id: 0,
        duration: 0
      },
    ],
    gallery: [
      {
        url: 'https://placehold.co/600x400.png', hint: 'braiding hair', type: 'image',
        id: 0
      },
      {
        url: 'https://placehold.co/600x400.png', hint: 'manicure station', type: 'image',
        id: 0
      },
      {
        url: 'https://placehold.co/600x400.png', hint: 'pedicure chairs', type: 'image',
        id: 0
      },
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', hint: 'braiding timelapse', type: 'video',
        id: 0
      },
      {
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', hint: 'salon tour', type: 'video',
        id: 0
      },
    ],
    verified: true,
  },
  {
    id: 2,
    name: 'Serene Spa & Beauty',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'serene spa room',
    location: 'Accra, Ghana',
    rating: 5,
    reviews: 88,
    startingPrice: 80,
    services: [
      {
        name: 'Deep Tissue Massage', price: 100,
        id: 0,
        duration: 0
      },
      {
        name: 'Hydrating Facial', price: 80,
        id: 0,
        duration: 0
      },
      {
        name: 'Body Scrub', price: 90,
        id: 0,
        duration: 0
      },
    ],
    gallery: [
      {
        url: 'https://placehold.co/600x400.png', hint: 'facial treatment', type: 'image',
        id: 0
      },
      {
        url: 'https://placehold.co/600x400.png', hint: 'massage table', type: 'image',
        id: 0
      },
      {
        url: 'https://placehold.co/600x400.png', hint: 'spa products', type: 'image',
        id: 0
      },
    ],
  },
  {
    id: 3,
    name: 'Nairobi Nail Bar',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'chic nail art',
    location: 'Nairobi, Kenya',
    rating: 4.8,
    reviews: 210,
    startingPrice: 30,
    services: [
      {
        name: 'Acrylic Fill-in', price: 40,
        id: 0,
        duration: 0
      },
      {
        name: 'Nail Art', price: 30,
        id: 0,
        duration: 0
      },
      {
        name: 'Luxury Pedicure', price: 65,
        id: 0,
        duration: 0
      },
    ],
    gallery: [
      {
        url: 'https://placehold.co/600x400.png', hint: 'nail polish collection', type: 'image',
        id: 0
      },
      {
        url: 'https://placehold.co/600x400.png', hint: 'intricate nail design', type: 'image',
        id: 0
      },
      {
        url: 'https://placehold.co/600x400.png', hint: 'client getting nails done', type: 'image',
        id: 0
      },
    ],
    featured: true,
  },
   {
    id: 4,
    name: 'Dapper Cuts Barber',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'classic barbershop',
    location: 'Johannesburg, SA',
    rating: 4.9,
    reviews: 300,
    startingPrice: 25,
    services: [
      {
        name: 'Haircut & Style', price: 30,
        id: 0,
        duration: 0
      },
      {
        name: 'Hot Towel Shave', price: 25,
        id: 0,
        duration: 0
      },
      {
        name: 'Beard Trim', price: 20,
        id: 0,
        duration: 0
      },
    ],
    gallery: [
        {
          url: 'https://placehold.co/600x400.png', hint: 'barber cutting hair', type: 'image',
          id: 0
        },
        {
          url: 'https://placehold.co/600x400.png', hint: 'shaving cream', type: 'image',
          id: 0
        },
        {
          url: 'https://placehold.co/600x400.png', hint: 'styled haircut', type: 'image',
          id: 0
        },
    ],
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
    salonAvatar: 'https://placehold.co/100x100.png',
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
    salonAvatar: 'https://placehold.co/100x100.png',
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
