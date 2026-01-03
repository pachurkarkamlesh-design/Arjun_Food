# Arjun FoodLink - MVP Setup Guide

## 🚀 Quick Start (MVP Ready!)

This guide will help you set up the complete MVP with customer and admin functionality.

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account (cloud)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB (Recommended for Development)**

1. Install MongoDB Community Edition from [mongodb.com/download](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - Windows: MongoDB should start automatically as a service
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud - Free Tier)**

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free cluster
3. Add your IP to Network Access (or allow access from anywhere for development: 0.0.0.0/0)
4. Create a database user with password
5. Get your connection string (looks like: `mongodb+srv://<username>:<password>@cluster.mongodb.net/`)

### Step 3: Configure Environment Variables

The `.env.local` file is already created. Update it if needed:

```env
# For local MongoDB (default)
MONGODB_URI=mongodb://localhost:27017/arjun-foodlink

# OR for MongoDB Atlas (replace with your connection string)
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/arjun-foodlink?retryWrites=true&w=majority

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

ADMIN_EMAIL=admin@arjunfoodlink.com
ADMIN_PASSWORD=admin123
```

### Step 4: Seed the Database

Populate the database with sample data (users, mess listings, reviews):

```bash
npm run seed
```

This will create:
- 6 users (admin, 3 mess owners, 2 students)
- 5 mess listings
- 4 reviews

### Step 5: Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Demo Credentials

### Student Account
- **Email:** student@demo.com
- **Password:** demo123
- **Features:** Browse mess, search, filter, view details, read reviews

### Mess Owner Account
- **Email:** owner@demo.com
- **Password:** demo123
- **Features:** Manage mess listings, view analytics, respond to reviews

### Admin Account
- **Email:** admin@arjunfoodlink.com
- **Password:** demo123
- **Features:** Manage all users, verify mess, moderate reviews

## 📱 Customer Features (Student)

1. **Browse & Discover**
   - View featured mess on homepage
   - Click "Discover Mess" or navigate to /discover
   - See all available mess with filters

2. **Search & Filter**
   - Search by name, cuisine, locality
   - Filter by cuisine type, price range, veg/non-veg
   - View ratings and reviews

3. **View Mess Details**
   - Click on any mess card
   - See full details, photos, reviews
   - View opening hours, pricing, location

## 🏪 Owner Features

1. **Dashboard**
   - Navigate to /owner/dashboard after login
   - View mess statistics and analytics
   - Manage your mess listings

2. **Manage Mess**
   - Create new mess listing
   - Edit existing mess details
   - Upload photos, set pricing
   - Update menu and timings

## 👨‍💼 Admin Features

1. **Admin Panel**
   - Access all mess listings
   - Verify/unverify mess
   - Manage users and roles
   - Moderate reviews

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - Login (handled by NextAuth)

### Mess Operations
- `GET /api/mess` - Get all mess (with filters)
- `POST /api/mess` - Create mess (owner/admin only)
- `GET /api/mess/[id]` - Get single mess
- `PUT /api/mess/[id]` - Update mess (owner/admin only)
- `DELETE /api/mess/[id]` - Delete mess (owner/admin only)

### Query Parameters for GET /api/mess
- `search` - Search by name/description/locality
- `locality` - Filter by locality
- `cuisineType` - Filter by cuisine
- `isVeg` - Filter vegetarian (true/false)
- `priceRange` - BUDGET, MODERATE, PREMIUM
- `featured` - Show only featured (true/false)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20)

## 🗄️ Database Models

### User
- name, email, password (hashed)
- role: STUDENT | MESS_OWNER | ADMIN
- phone, image, isVerified

### Mess
- name, description, address, locality, city
- latitude, longitude, phone
- cuisineTypes, isVeg, isNonVeg
- priceRange, monthlyPrice, perMealPrice
- photos, openTime, closeTime
- avgRating, totalReviews, totalViews
- isVerified, isActive, isFeatured
- ownerId

### Review
- messId, userId
- rating (1-5)
- comment
- foodQuality, service, cleanliness, valueForMoney
- isVerified

## 🚨 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongosh` to test connection
- Check MONGODB_URI in .env.local
- For Atlas: Verify IP whitelist and credentials

### NextAuth Error
- Ensure NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your localhost

### Import Errors
- All component import issues have been fixed
- Restart dev server if you see stale errors

### Cannot Login
- Ensure you've run `npm run seed` to create users
- Check MongoDB contains users: `mongosh arjun-foodlink` then `db.users.find()`

## 📦 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth.js
- **Maps:** Leaflet (for future location features)

## 🎯 Next Steps

1. **Connect real data**: Replace mock data with API calls
2. **Add payment integration**: For premium features
3. **Implement real-time chat**: Between students and owners
4. **Add menu management**: Daily menu updates
5. **Enable photo upload**: Using Cloudinary or AWS S3
6. **Add notifications**: Email/SMS for subscriptions

## 📞 Support

For issues or questions, check the console logs:
- Browser console for frontend errors
- Terminal/command prompt for backend errors

## 🎉 You're All Set!

Your MVP is ready to demo! Try logging in with different accounts to see customer and admin workflows.

Visit: http://localhost:3000
