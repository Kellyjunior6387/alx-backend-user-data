# ALX Backend User Data - Frontend

A modern, sleek, and dark-themed React TypeScript frontend for the ALX backend user data authentication system.

## Features

### 🎨 Modern Dark Design
- Sleek dark theme with gradient backgrounds
- Professional UI components with smooth animations
- Responsive design that works on all devices
- Modern glass-morphism effects and subtle animations

### 🔐 Authentication System
- **Login Page**: Clean, modern login form with validation
- **Register Page**: Multi-step registration with form validation
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Session Management**: Secure token-based authentication

### 🛠️ Technical Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for beautiful icons

### 🏗️ Architecture
- **Component-based architecture** with reusable UI components
- **Context API** for global state management
- **Custom hooks** for authentication logic
- **TypeScript interfaces** for type safety
- **Utility functions** for validation and API calls

## Pages

### Login Page
![Login Page](https://github.com/user-attachments/assets/fde091e0-4f27-40c0-9a7b-60c63849dc77)

- Modern dark-themed login form
- Email and password validation
- Remember me functionality
- Password visibility toggle
- Forgot password link
- Link to registration page

### Register Page
![Register Page](https://github.com/user-attachments/assets/9f363d1a-87a1-419e-b478-119ac2dec510)

- Multi-field registration form
- Real-time form validation
- Password strength requirements
- Password confirmation
- Terms of service agreement
- Responsive grid layout for name fields

### Dashboard Page
![Dashboard Page](https://github.com/user-attachments/assets/07c31796-23c6-4dfe-b2f4-ce133da0b8b4)

- Welcome header with user information
- Profile information card
- Settings management card
- Statistics and account status
- Modern card-based layout
- Responsive grid system

## Components

### UI Components
- **Button**: Multiple variants (primary, secondary, ghost) with loading states
- **Input**: Form inputs with validation error display and icons
- **Alert**: Notification system for success, error, and info messages

### Authentication Components
- **LoginForm**: Complete login functionality with validation
- **RegisterForm**: Registration with comprehensive form validation
- **AuthLayout**: Shared layout for authentication pages
- **ProtectedRoute**: Route protection for authenticated users

## Setup and Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

The frontend is configured to work with the ALX backend authentication services. Update the API base URL in `src/utils/api.ts`:

```typescript
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this to your backend URL
  timeout: 10000,
});
```

## Folder Structure

```
src/
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── ui/             # UI components (Button, Input, Alert)
│   └── ProtectedRoute.tsx
├── context/            # React Context providers
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── DashboardPage.tsx
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── api.ts         # API configuration
│   ├── auth.ts        # Authentication service
│   └── validation.ts  # Form validation
└── App.tsx            # Main application component
```

## Features Implementation

### Form Validation
- Email format validation
- Password strength requirements (8+ chars, uppercase, lowercase, number)
- Real-time validation feedback
- Error message display

### Authentication Flow
- Login with email/password
- Registration with profile information
- Automatic token management
- Session persistence
- Protected route handling

### UI/UX Features
- Loading states for async operations
- Error handling with user-friendly messages
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Accessible form controls

## Security Features
- Token-based authentication
- Automatic token refresh
- Secure session management
- Protected routes
- Input validation and sanitization

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Responsive design for all screen sizes

---

This frontend provides a professional, modern interface for the ALX backend user data authentication system, built with industry best practices and senior-level code quality.
