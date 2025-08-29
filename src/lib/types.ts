export interface Salon {
  id: number;
  name: string;
  image: string;
  imageHint: string;
  location: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  services: { id: number; name: string; price: number, duration: number }[];
  gallery: { id: number; url: string; hint: string; type: 'image' | 'video' }[];
  verified?: boolean;
  featured?: boolean;
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
