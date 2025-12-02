# SIMBI Backend API Documentation

Base URL: `http://localhost:3000`  
API Version: `v1`

## Table of Contents
- [Authentication](#authentication)
- [User Management](#user-management)
- [Study Plans](#study-plans)
- [Chat](#chat)
- [Pre-Assessment](#pre-assessment)
- [Notifications](#notifications)
- [Email](#email)
- [Error Handling](#error-handling)

---

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

### Sign Up
Create a new user account.

**Endpoint:** `POST /api/v1/auth/signup`

**Request Body:**
```json
{
  "username": "string (3-30 alphanumeric characters, required)",
  "email": "string (valid email, required)",
  "password": "string (min 6 characters, required)",
  "firstName": "string (max 50 characters, optional)",
  "lastName": "string (max 50 characters, optional)",
  "educationLevel": "string (enum: elementary, middle_school, high_school, undergraduate, graduate, doctorate, other)",
  "timezone": "string (format: Region/City, default: UTC)",
  "preferredStudyMethod": "string (enum: pomodoro, spaced_repetition, feynman, active_recall, other)"
}
```

**Response (201):**
```json
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

### Login
Authenticate and receive access tokens.

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "User logged in successfully",
  "access_token": "string",
  "refresh_token": "string"
}
```

### Refresh Token
Get a new access token using a refresh token.

**Endpoint:** `POST /api/v1/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "string (required)"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Token refreshed successfully",
  "access_token": "string"
}
```

---

## User Management

### Get Current User
Get the authenticated user's profile.

**Endpoint:** `GET /api/v1/users/me`

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
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

### Update User
Update user information.

**Endpoint:** `PUT /api/v1/users/update/:id`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `id` - User ID (must match authenticated user)

**Request Body:** (all fields optional)
```json
{
  "firstName": "string",
  "lastName": "string",
  "educationLevel": "string",
  "timezone": "string",
  "preferredStudyMethod": "string"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "User updated successfully",
  "updated_user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string"
  }
}
```

### Delete User
Delete a user account.

**Endpoint:** `DELETE /api/v1/users/delete/:id`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `id` - User ID (must match authenticated user)

**Response (200):**
```json
{
  "status": "success",
  "message": "User deleted successfully"
}
```

---

## Study Plans

### Generate Study Plan
Create an AI-generated personalized study plan.

**Endpoint:** `POST /api/v1/study-plan/generate`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "name": "string (required)",
  "subjects": "string or array of strings (required)",
  "startDate": "string (YYYY-MM-DD format, required)",
  "endDate": "string (YYYY-MM-DD format, required)",
  "dailyStudyTime": "string (HH:MM format, optional)",
  "daysAvailable": "string or array (Monday-Sunday, required)",
  "preferredStudyMethod": "string (optional)",
  "learningStyle": "string (optional)",
  "dailyStudyDuration": "string (Xh or Xm format, required)",
  "breakDuration": "string (Xh or Xm format, required)",
  "needStudyTips": "boolean or string (optional)",
  "priorityTag": "string (optional)",
  "difficultyLevel": "string (optional)",
  "studyLevel": "string (optional)",
  "addToSchedule": "boolean or string (optional)",
  "preferredTone": "string (optional)",
  "milestoneType": "string (optional)",
  "motivationPreference": "string (optional)",
  "checkInStyle": "string (optional)",
  "telegramReminder": "boolean or string (optional)",
  "rewardStyle": "string (optional)",
  "rewardFrequency": "string (optional)"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Study plan generated successfully",
  "studyPlan": {
    "id": "uuid",
    "name": "string",
    "subjects": [],
    "startDate": "date",
    "endDate": "date",
    "milestones": [],
    "sessions": []
  }
}
```

### Get All Study Plans
Retrieve all study plans for the authenticated user.

**Endpoint:** `GET /api/v1/study-plan/all`

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "status": "success",
  "studyPlans": [
    {
      "id": "uuid",
      "name": "string",
      "subjects": [],
      "startDate": "date",
      "endDate": "date",
      "status": "string"
    }
  ]
}
```

### Get Study Plan by ID
Get details of a specific study plan.

**Endpoint:** `GET /api/v1/study-plan/:planId`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `planId` - Study plan ID

**Response (200):**
```json
{
  "status": "success",
  "studyPlan": {
    "id": "uuid",
    "name": "string",
    "subjects": [],
    "startDate": "date",
    "endDate": "date",
    "milestones": [],
    "sessions": []
  }
}
```

### Update Study Plan Status
Update the status of a study plan.

**Endpoint:** `PUT /api/v1/study-plan/:planId`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `planId` - Study plan ID

**Request Body:**
```json
{
  "status": "string"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Study plan updated successfully"
}
```

### Delete Study Plan
Delete a study plan.

**Endpoint:** `DELETE /api/v1/study-plan/:planId`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `planId` - Study plan ID

**Response (200):**
```json
{
  "status": "success",
  "message": "Study plan deleted successfully"
}
```

### Get Milestones by Study Plan
Get all milestones for a specific study plan.

**Endpoint:** `GET /api/v1/study-plan/:planId/milestones`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `planId` - Study plan ID

**Response (200):**
```json
{
  "status": "success",
  "milestones": []
}
```

### Get Study Sessions by Study Plan
Get all study sessions for a specific study plan.

**Endpoint:** `GET /api/v1/study-plan/:planId/sessions`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `planId` - Study plan ID

**Response (200):**
```json
{
  "status": "success",
  "sessions": []
}
```

### Complete Study Session
Mark a study session as completed.

**Endpoint:** `POST /api/v1/study-plan/complete-session`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "planId": "string (required)",
  "sessionId": "string (required)",
  "timeSpent": "string (number, required)"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Study session completed"
}
```

### Get Study Session by ID
Get details of a specific study session.

**Endpoint:** `GET /api/v1/study-plan/session/:sessionId`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `sessionId` - Study session ID

**Response (200):**
```json
{
  "status": "success",
  "session": {}
}
```

### Get Milestone by ID
Get details of a specific milestone.

**Endpoint:** `GET /api/v1/study-plan/milestone/:milestoneId`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `milestoneId` - Milestone ID

**Response (200):**
```json
{
  "status": "success",
  "milestone": {}
}
```

---

## Chat

All chat endpoints require authentication.

### Get User Chats
Get all chat conversations for the authenticated user.

**Endpoint:** `GET /api/v1/chat`

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "status": "success",
  "chats": []
}
```

### Get Chat Messages
Get all messages from a specific chat.

**Endpoint:** `GET /api/v1/chat/:chatId`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `chatId` - Chat ID

**Response (200):**
```json
{
  "status": "success",
  "messages": []
}
```

### Send Message
Send a message to the AI assistant.

**Endpoint:** `POST /api/v1/chat/message`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "message": "string (required)",
  "chatId": "string (optional, creates new chat if not provided)"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": {},
  "response": {}
}
```

### Delete Chat
Delete a chat conversation.

**Endpoint:** `DELETE /api/v1/chat/:chatId`

**Headers:** `Authorization: Bearer <access_token>`

**URL Parameters:**
- `chatId` - Chat ID

**Response (200):**
```json
{
  "status": "success",
  "message": "Chat deleted successfully"
}
```

---

## Pre-Assessment

### Submit Pre-Assessment
Submit pre-assessment questionnaire responses.

**Endpoint:** `POST /api/v1/pre-assessment`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "What's your preferred way of studying?": "string",
  // Additional assessment questions as key-value pairs
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Preassessment saved successfully"
}
```

---

## Notifications

### Create Notification
Create a new notification.

**Endpoint:** `POST /api/notifications`

**Request Body:**
```json
{
  "userId": "string (required)",
  "message": "string (required)",
  "type": "string (required)"
}
```

**Response (201):**
```json
{
  "status": "success",
  "notification": {}
}
```

### Get Unread Notifications
Get all unread notifications for a user.

**Endpoint:** `GET /api/notifications/unread/:userId`

**URL Parameters:**
- `userId` - User ID

**Response (200):**
```json
{
  "status": "success",
  "notifications": []
}
```

### Mark Notification as Read
Mark a notification as read.

**Endpoint:** `PATCH /api/notifications/read/:notificationId`

**URL Parameters:**
- `notificationId` - Notification ID

**Response (200):**
```json
{
  "status": "success",
  "message": "Notification marked as read"
}
```

---

## Email

### Send Email
Send an email.

**Endpoint:** `POST /api/email`

**Request Body:**
```json
{
  "to": "string (required)",
  "subject": "string (required)",
  "body": "string (required)"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Email sent successfully"
}
```

---

## Error Handling

All error responses follow this structure:

**Error Response:**
```json
{
  "status": "error",
  "message": "Error description",
  "details": [] // Optional validation details
}
```

### Common HTTP Status Codes

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Health Check

### Check API Status
Verify the API is running.

**Endpoint:** `GET /`

**Response (200):**
```json
{
  "status": "success",
  "message": "Welcome to Simbi-Backend"
}
```

---

## Notes for Frontend Integration

1. **Authentication Flow:**
   - Sign up → Receive user object
   - Login → Receive access_token and refresh_token
   - Store tokens securely (localStorage/sessionStorage)
   - Include access_token in Authorization header for protected routes
   - Refresh access_token when expired using refresh_token

2. **CORS:**
   - Currently set to `ALLOWED_ORIGINS=*` in development
   - Update this in production to specific frontend domains

3. **Date Formats:**
   - Dates should be sent in `YYYY-MM-DD` format
   - Times should be sent in `HH:MM` format

4. **Validation:**
   - All validation errors return 400 status
   - Error messages provide specific field validation details

5. **Environment:**
   - Default port: 3000
   - API version: v1
   - All v1 endpoints use prefix: `/api/v1`

6. **Study Plan Subjects:**
   - Can be sent as a single string or array of strings
   - Backend handles both formats

7. **Days Available:**
   - Accept: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
   - Can be sent as string or array of strings
