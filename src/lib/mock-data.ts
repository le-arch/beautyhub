import type { Salon, BlogPost } from './types';

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
      { name: 'Classic Manicure', price: 50 },
      { name: 'Gel Pedicure', price: 75 },
      { name: 'Knotless Braids', price: 200 },
    ],
    gallery: [
      { url: 'https://placehold.co/600x400.png', hint: 'braiding hair' },
      { url: 'https://placehold.co/600x400.png', hint: 'manicure station' },
      { url: 'https://placehold.co/600x400.png', hint: 'pedicure chairs' },
    ],
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
      { name: 'Deep Tissue Massage', price: 100 },
      { name: 'Hydrating Facial', price: 80 },
      { name: 'Body Scrub', price: 90 },
    ],
    gallery: [
      { url: 'https://placehold.co/600x400.png', hint: 'facial treatment' },
      { url: 'https://placehold.co/600x400.png', hint: 'massage table' },
      { url: 'https://placehold.co/600x400.png', hint: 'spa products' },
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
      { name: 'Acrylic Fill-in', price: 40 },
      { name: 'Nail Art', price: 30 },
      { name: 'Luxury Pedicure', price: 65 },
    ],
    gallery: [
      { url: 'https://placehold.co/600x400.png', hint: 'nail polish collection' },
      { url: 'https://placehold.co/600x400.png', hint: 'intricate nail design' },
      { url: 'https://placehold.co/600x400.png', hint: 'client getting nails done' },
    ],
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
      { name: 'Haircut & Style', price: 30 },
      { name: 'Hot Towel Shave', price: 25 },
      { name: 'Beard Trim', price: 20 },
    ],
    gallery: [
        { url: 'https://placehold.co/600x400.png', hint: 'barber cutting hair' },
        { url: 'https://placehold.co/600x400.png', hint: 'shaving cream' },
        { url: 'https://placehold.co/600x400.png', hint: 'styled haircut' },
    ],
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
