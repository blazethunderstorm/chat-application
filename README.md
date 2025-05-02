# Real-Time Chat Application

A full-stack real-time chat application built with modern web technologies.

## Technology Stack

- **Frontend**: React.js, TailwindCSS, Daisy UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **State Management**: Zustand
- **Authentication**: JWT (JSON Web Token)

## Features

- 🔐 Secure user authentication and authorization
- 💬 Real-time messaging functionality
- 🟢 Online user status indicators
- 📱 Responsive design for all devices
- ⚡ Efficient state management with Zustand
- 🛡️ Comprehensive error handling (client and server)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image uploads)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/chat-application.git
   cd chat-application
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   ```


## Development

1. Start the backend server
   ```bash
   npm run dev
   ```

2. Start the frontend development server
   ```bash
   cd frontend
   npm run dev
   ```

## Production

1. Build the application
   ```bash
   npm run build
   ```

2. Start the production server
   ```bash
   npm start
   ```

```

## API Endpoints

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate a user
- `GET /api/users` - Get all users
- `GET /api/messages/:id` - Get messages for a specific chat
- `POST /api/messages` - Send a new message

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
