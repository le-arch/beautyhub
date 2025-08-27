export interface Salon {
  id: number;
  name: string;
  image: string;
  imageHint: string;
  location: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  services: { name: string; price: number }[];
  gallery: { url: string; hint: string }[];
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
