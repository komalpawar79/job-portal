# Vercel Deployment Guide

## What was causing the 404 error?

1. **Hardcoded localhost URLs** - Frontend was trying to reach `http://localhost:8000` on Vercel
2. **CORS Restrictions** - Backend only accepted requests from `localhost:5173`
3. **Missing Environment Configuration** - No way to set API URLs for production

## How it's been fixed

### Changes Made:
1. ✅ Updated `frontend/src/utils/constant.js` to use environment variables
2. ✅ Created `vercel.json` for proper Vercel deployment
3. ✅ Updated backend CORS to accept `FRONTEND_URL` from environment
4. ✅ Created `.env.production` and `.env.example` files

## Deployment Steps

### Option 1: Deploy Frontend Only on Vercel (Recommended for Simple Setup)

1. **Deploy Frontend to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Add Environment Variable:
     - Key: `VITE_API_URL`
     - Value: Your backend API URL (e.g., `https://your-backend.railway.app`)

2. **Deploy Backend Separately:**
   - Use Railway, Render, or another backend hosting service
   - Copy the backend URL (e.g., `https://your-backend-api.railway.app`)
   - Add to Vercel environment variables

### Option 2: Deploy Both with Vercel Pro (Full Stack)

1. **Setup Root vercel.json** - Already created ✅
2. **Deploy to Vercel:**
   - Import GitHub repo
   - Leave root directory empty
   - Add Environment Variables:
     - `VITE_API_URL`: Your backend service URL
     - `FRONTEND_URL`: Your Vercel frontend domain (e.g., `https://your-app.vercel.app`)
     - All backend env variables (MONGODB_URI, JWT_SECRET, etc.)

### Option 3: Deploy Both on Railway (Simple Alternative)

1. Create backend service first
2. Create frontend service
3. Set `VITE_API_URL` to your backend Railway URL
4. Set `FRONTEND_URL` in backend env

## Environment Variables Needed

### Frontend (.env.production):
```
VITE_API_URL=https://your-backend-api-url.com
```

### Backend (.env on hosting platform):
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3000
```

## Testing Locally

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and will use `http://localhost:8000` for APIs (default fallback in constant.js).

## Troubleshooting

- **Still getting 404**: Check that `VITE_API_URL` is set correctly in Vercel environment
- **CORS errors**: Make sure `FRONTEND_URL` is set in backend environment
- **Blank page**: Check browser console (F12) for errors
- **API calls failing**: Verify the backend service is running and the URL is accessible

## Files Modified:
- `frontend/src/utils/constant.js` - Now uses environment variables
- `backend/index.js` - CORS now uses FRONTEND_URL env variable
- `vercel.json` - Configuration for Vercel deployment

---

**Note:** Make sure to set all environment variables on your hosting platform before deploying!
