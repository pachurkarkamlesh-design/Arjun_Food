import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const messData = [
  {
    name: "Shree Annapurna Mess",
    slug: "shree-annapurna-mess-kothrud",
    description: "Authentic Maharashtrian home-style cooking with unlimited thali. Known for our special pitla bhakri and authentic misal pav. Family-run mess serving students for over 15 years.",
    address: "Lane 5, Dahanukar Colony, Kothrud",
    area: "Kothrud",
    city: "Pune",
    latitude: 18.5074,
    longitude: 73.8077,
    phone: "+91 98765 43210",
    email: "annapurna.mess@gmail.com",
    cuisine: "MAHARASHTRIAN",
    vegOnly: true,
    priceRange: "BUDGET",
    monthlyPrice: 3500,
    trialPrice: 150,
    rating: 4.6,
    reviewCount: 234,
    isVerified: true,
    isFeatured: true,
    openTime: "07:30",
    closeTime: "22:00",
    images: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
      "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800"
    ],
    amenities: ["AC Dining", "Home Delivery", "Monthly Plans", "Tiffin Service"],
  },
  {
    name: "Sagar Ratna Tiffins",
    slug: "sagar-ratna-tiffins-viman-nagar",
    description: "South Indian breakfast specialists with North Indian lunch and dinner. Perfect dosas, idlis, and filter coffee. Evening snacks include vada pav and samosas.",
    address: "Phoenix Market City Road, Viman Nagar",
    area: "Viman Nagar",
    city: "Pune",
    latitude: 18.5679,
    longitude: 73.9143,
    phone: "+91 98234 56789",
    email: "sagarratna.pune@gmail.com",
    cuisine: "SOUTH_INDIAN",
    vegOnly: true,
    priceRange: "MID_RANGE",
    monthlyPrice: 4200,
    trialPrice: 180,
    rating: 4.4,
    reviewCount: 189,
    isVerified: true,
    isFeatured: true,
    openTime: "06:30",
    closeTime: "21:30",
    images: [
      "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800"
    ],
    amenities: ["Pure Veg", "Breakfast Special", "Filter Coffee", "Tiffin Service"],
  },
  {
    name: "Punjab Da Dhaba",
    slug: "punjab-da-dhaba-aundh",
    description: "Hearty Punjabi food with generous portions. Famous for butter chicken, dal makhani, and fresh tandoori rotis. Non