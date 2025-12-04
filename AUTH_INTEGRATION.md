# Authentication Integration Guide

This document explains how the authentication system is integrated with the SIMBI backend.

## 🔧 Setup

### 1. Environment Variables

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Replace `http://localhost:3000` with your backend URL when deploying to production.

### 2. Backend Requirements

The backend should have these authentication endpoints:

- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/users/me` - Get current user profile

#### Expected Request/Response Formats

**Register (Signup):**

```json
// Request
{
  "username": "string (3-30 alphanumeric characters, required)",
  "email": "string (valid email, required)",
  "password": "string (min 6 characters, required)",
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "educationLevel": "string (optional)",
  "timezone": "string (optional)",
  "preferredStudyMethod": "string (optional)"
}

// Response
{
  "status": "success",
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "educationLevel": "string",
    "timezone": "string",
    "preferredStudyMethod": "string",
    "createdAt": "datetime"
  }
}
```

**Login:**

```json
// Request
{
  "email": "string (required)",
  "password": "string (required)"
}

// Response
{
  "status": "success",
  "message": "User logged in successfully",
  "access_token": "string",
  "refresh_token": "string"
}
```

**Get Current User:**

```json
// Request: GET with Authorization header

// Response
{
  "status": "success",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "educationLevel": "string",
    "timezone": "string",
    "preferredStudyMethod": "string",
    "createdAt": "datetime",
    "lastLogin": "datetime"
  }
}
```

**Error Response:**

```json
{
  "status": "error",
  "message": "Error message",
  "details": []
}
```

## 📁 Project Structure

```
├── lib/
│   ├── api.ts              # Axios instance with interceptors
│   └── auth.ts             # Authentication service functions
├── types/
│   └── auth.ts             # TypeScript types for auth
├── contexts/
│   └── AuthContext.tsx     # React context for auth state
├── hooks/
│   └── useAuth.ts          # Custom hooks for auth
└── app/
    └── auth/
        ├── sign-in/        # Login page
        └── get-started/    # Registration page
```

## 🎯 Usage

### Using Auth Context

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.firstName}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protecting Routes

```tsx
"use client";

import { useRequireAuth } from "@/hooks/useAuth";

export default function ProtectedPage() {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Protected content</div>;
}
```

### Redirecting Authenticated Users

```tsx
"use client";

import { useRedirectIfAuthenticated } from "@/hooks/useAuth";

export default function LoginPage() {
  useRedirectIfAuthenticated(); // Redirects to "/" if already logged in

  return <div>Login form</div>;
}
```

## 🔐 Authentication Flow

1. **Registration:**

   - User fills out the registration form with username, email, password, and optional details
   - Form is validated client-side (username 3-30 alphanumeric chars, password min 6 chars)
   - Data is sent to `POST /api/v1/auth/signup`
   - User object is returned and stored
   - Automatic login is performed to get access tokens
   - Tokens and user data are stored in localStorage
   - User is redirected to the home page

2. **Login:**

   - User enters email and password
   - Form is validated
   - Credentials sent to `POST /api/v1/auth/login`
   - Access token and refresh token received
   - User profile fetched from `GET /api/v1/users/me`
   - Tokens and user data stored in localStorage
   - User redirected to home page

3. **Logout:**

   - `logout()` function is called
   - Tokens and user data cleared from localStorage
   - User redirected to sign-in page

4. **Token Management:**

   - Access token automatically added to all API requests via Axios interceptor
   - Refresh token stored for token renewal
   - `refreshAccessToken()` available for token refresh
   - 401 responses automatically trigger logout and redirect to sign-in

5. **Session Persistence:**
   - Tokens stored in localStorage persist across browser refreshes
   - User profile cached to avoid unnecessary API calls
   - Auth context automatically restores user state on app load

## 🛠️ API Service Functions

### `login(credentials)`

```typescript
import { login } from "@/lib/auth";

const response = await login({
  email: "user@example.com",
  password: "password123",
});
```

### `register(data)`

```typescript
import { register } from "@/lib/auth";

const response = await register({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "password123",
  confirmPassword: "password123",
});
```

### `logout()`

```typescript
import { logout } from "@/lib/auth";

await logout();
```

### `getCurrentUser()`

```typescript
import { getCurrentUser } from "@/lib/auth";

const user = getCurrentUser();
```

### `isAuthenticated()`

```typescript
import { isAuthenticated } from "@/lib/auth";

if (isAuthenticated()) {
  // User is logged in
}
```

## 🔄 API Interceptors

The API client automatically:

- Adds `Authorization: Bearer <token>` header to all requests
- Handles 401 Unauthorized responses by logging out the user
- Provides consistent error handling

## 📝 Form Validation

Both sign-in and registration forms include:

- Client-side validation
- Real-time error messages
- Loading states during API calls
- Toast notifications for success/error feedback

## 🎨 Toast Notifications

Using Chakra UI v3 toaster:

```typescript
import { toaster } from "@/components/ui/toaster";

toaster.create({
  title: "Success",
  description: "Operation completed",
  type: "success",
  meta: { closable: true },
  placement: "top-end",
});
```

## 🚀 Next Steps

- **Test the authentication flow** with your backend
- **Implement password reset** functionality (optional)
- **Add Google OAuth** integration (placeholder already exists)
- **Create protected routes** using the `useRequireAuth` hook
- **Add user profile page** where users can update their information

## 🐛 Troubleshooting

### CORS Issues

Make sure your backend has CORS configured to allow requests from your frontend URL.

### 401 Errors

Check that the backend is returning the correct token format and that it's being stored properly.

### API Not Found (404)

Verify `NEXT_PUBLIC_API_URL` in `.env.local` points to the correct backend URL.

### Token Not Being Sent

Check browser console for errors and verify the token is in localStorage under the key `authToken`.
