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
