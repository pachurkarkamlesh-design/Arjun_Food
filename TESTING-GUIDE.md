# 🧪 Testing Guide - Arjun FoodLink MVP

## ✅ What's Fixed

### Issues Resolved:
1. ✅ **Owner Dashboard** - Card component import fixed
2. ✅ **Real Authentication** - NextAuth integration (replacing localStorage demo)
3. ✅ **Session Management** - SessionProvider added to app
4. ✅ **MongoDB Atlas** - Connected and seeded
5. ✅ **All Import Errors** - Fixed across the app
6. ✅ **Navbar Authentication** - Now shows logged-in user name and role-based menu
7. ✅ **Owner Register Route** - Created /owner/register page for adding new mess
8. ✅ **NextAuth JWT Fix** - Fixed token.id error by using token.userId
9. ✅ **NEXTAUTH_URL** - Updated to port 3001 to match running server

---

## 🚀 Application Running

**URL**: http://localhost:3001 (port 3001 because 3000 was in use)

---

## 🔐 Test Accounts

### 1. Student Account
- **Email**: `student@demo.com`
- **Password**: `demo123`
- **Role**: STUDENT
- **Access**: Browse mess, search, filter, view details

### 2. Mess Owner
- **Email**: `owner@demo.com`
- **Password**: `demo123`
- **Role**: MESS_OWNER
- **Access**: Owner dashboard, manage mess

### 3. Admin
- **Email**: `admin@arjunfoodlink.com`
- **Password**: `demo123`
- **Role**: ADMIN
- **Access**: Full admin access

---

## 📝 How to Test

### Test 1: Login & Authentication

1. Go to: http://localhost:3001/login
2. Try logging in with: `student@demo.com` / `demo123`
3. You should be redirected to `/discover`
4. **Check**: User should be logged in (navbar should show user info, not "Login")
5. Click "Logout" to test logout functionality

### Test 2: Browse Mess (Student)

1. Login as student
2. Go to http://localhost:3001/discover
3. **Check**: Should see 5 mess listings from MongoDB
4. Try filtering by:
   - Cuisine type (North Indian, South Indian, etc.)
   - Price range (Budget, Moderate, Premium)
   - Veg/Non-veg
5. **Check**: Filters should work and update results

### Test 3: View Mess Details

1. Click on any mess card
2. **Check**: Should navigate to `/mess/[id]`
3. **Check**: Should show:
   - Mess photos
   - Description
   - Pricing
   - Location
   - Reviews
   - Opening hours

### Test 4: Owner Dashboard

1. **Logout** if logged in as student
2. Go to http://localhost:3001/login
3. Login with: `owner@demo.com` / `demo123`
4. Go to: http://localhost:3001/owner/dashboard
5. **Check**: Should see:
   - Dashboard with statistics
   - Your mess listings
   - Analytics cards
   - No errors on the page

### Test 5: Database Connection

1. Open MongoDB Compass
2. Connect to your Atlas cluster (or check on https://cloud.mongodb.com)
3. Navigate to `arjun-foodlink` database
4. **Check**: Should see 3 collections:
   - `users` (6 documents)
   - `messes` (5 documents)
   - `reviews` (4 documents)

### Test 6: Register New Mess (Owner)

1. **Logout** if logged in as student
2. Login as owner: `owner@demo.com` / `demo123`
3. Click on user menu in navbar (should show "Demo Owner" name)
4. Click "Register Mess" from dropdown
5. Go to: http://localhost:3001/owner/register
6. **Check**: Should see a comprehensive form with:
   - Basic Information (name, description)
   - Location fields (address, locality, lat/lng)
   - Contact (phone)
   - Cuisine types (clickable buttons)
   - Dietary options (veg/non-veg checkboxes)
   - Pricing (price range dropdown, monthly/per meal prices)
   - Operating hours (time pickers)

7. **Fill out the form**:
   - Name: "Test Mess"
   - Description: "A test mess for demo"
   - Address: "123 Test Street"
   - Locality: "Kothrud"
   - Phone: "+91 9999999999"
   - Select at least one cuisine (e.g., North Indian)
   - Set prices (e.g., Monthly: 3000, Per Meal: 50)
   - Keep default timings

8. Click "Register Mess"
9. **Check**: Should show success toast and redirect to owner dashboard
10. Go to http://localhost:3001/discover
11. **Check**: New mess should appear in the listing

### Test 7: API Endpoints

Open browser DevTools (F12) → Network tab, then:

1. Go to http://localhost:3001/discover
2. **Check Network tab**: Should see:
   - `GET /api/mess?sortBy=rating` → Status 200
   - Response should contain mess data from MongoDB

3. Try filtering (select a cuisine)
4. **Check Network tab**: Should see:
   - `GET /api/mess?cuisine=NORTH_INDIAN&sortBy=rating` → Status 200

---

## 🐛 Known Issues & Workarounds

### Issue: "Still showing Login button after login"

**Status**: ✅ **FIXED** - Navbar now uses `useSession()` hook and displays user name

**What was done**:
1. Imported `useSession` and `signOut` from next-auth/react
2. Replaced mock auth state with real session data
3. Added user name display next to user icon
4. Added role-based menu items (Dashboard, Register Mess for owners)
5. Connected Sign Out button to NextAuth signOut function

### Issue: "Port 3000 in use"

**Status**: Resolved - app running on port 3001
**URL**: http://localhost:3001

---

## ✨ What's Working

- ✅ MongoDB Atlas connected
- ✅ 6 users, 5 mess, 4 reviews in database
- ✅ NextAuth authentication
- ✅ API routes returning data
- ✅ Owner dashboard loading
- ✅ Mess listing & filtering
- ✅ All component imports fixed

---

## 🔧 Quick Fixes

### If login doesn't show user info in navbar:

The navbar needs to be updated to use NextAuth session. Check:
- `components/layout/Navbar.tsx`
- Should use `useSession()` from `next-auth/react`
- Should display user name/email when logged in

### If owner dashboard shows blank:

1. Make sure you're logged in as owner
2. Check browser console for errors
3. Verify MongoDB connection is active

---

## 📊 Success Criteria

Your MVP is working if:

1. ✅ Can login with test accounts
2. ✅ Mess listings load from database
3. ✅ Filters work on discover page
4. ✅ Owner dashboard loads without errors
5. ✅ Can view individual mess details
6. ✅ MongoDB shows data in Atlas/Compass

---

## 🎯 What's New in This Update

### New Features Added:

1. ✅ **Owner Register Mess Page** - http://localhost:3001/owner/register
   - Full form to register a new mess
   - Cuisine type selection (all 8 types supported)
   - Location fields (address, locality, lat/lng)
   - Pricing options (price range, monthly, per meal)
   - Operating hours
   - Dietary options (veg/non-veg)
   - Connects to POST /api/mess endpoint
   - Only accessible to MESS_OWNER role

2. ✅ **Navbar Authentication Display**
   - Shows user name when logged in
   - Role-based menu items:
     - **For Mess Owners**: Dashboard, Register Mess links
     - **For Students**: My Favorites, My Profile, My Reviews
   - Working Sign Out button

3. ✅ **Backend Fixes**
   - Fixed NextAuth JWT token.id error (changed to token.userId)
   - Fixed NEXTAUTH_URL to match port 3001
   - All authentication routes now working properly

## 🎯 Next Steps (Optional Enhancements)

To further enhance the MVP:

1. **Add Photo Upload** - Integrate Cloudinary or AWS S3 for mess photos
2. **Protect Routes** - Add middleware to protect owner/admin routes
3. **Add Reviews** - Connect review forms to database
4. **Email Verification** - Send verification emails to new users
5. **Add Maps Integration** - Auto-fill lat/lng using Google Maps API

---

## 💡 Tips

- Always check browser console (F12) for errors
- Check Network tab to see API responses
- MongoDB Compass helps verify data
- Clear browser cache if seeing stale data

---

**Your full-stack MVP is ready for demo! 🚀**

Test URL: **http://localhost:3001**
