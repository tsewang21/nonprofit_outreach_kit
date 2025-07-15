# Nonprofit Outreach Kit

A comprehensive platform for nonprofit organizations to manage outreach campaigns, professional directories, and community engagement.

## Features

### 🔐 Authentication System
- **Login**: Existing users can sign in with email/password
- **Sign Up**: New users can create accounts with secure password requirements
- **Demo Accounts**: Pre-configured accounts for testing
- **Password Security**: Bcrypt hashing for password protection

### 📊 Dashboard
- Real-time analytics and metrics
- Quick action buttons for common tasks
- Network activity feed
- Campaign overview

### 📧 Campaign Management
- Email template library with pre-built GTPN templates
- Campaign creation with live preview
- Template editing and customization
- Variable management for personalization

### 👥 Directory Management
- GDPR/CCPA compliant member directory
- Consent tracking and management
- Professional profile management
- Privacy controls and audit trails

### ⚙️ Settings & Administration
- User profile management
- Admin panel for viewing registered users
- Integration management
- Security settings

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nonprofit-outreach-kit
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## Usage

### Demo Accounts
You can test the application using these pre-configured accounts:

- **Super Admin**: `admin@yourorg.org` / `password`
- **Campaign Manager**: `manager@yourorg.org` / `password`

### Creating a New Account

1. Navigate to the login page
2. Click "Sign up" below the login form
3. Fill out the registration form with:
   - Full name
   - Email address
   - Password (must meet security requirements)
   - Confirm password
4. Click "Create Account"
5. You'll be automatically logged in and redirected to the dashboard

### Password Requirements
New passwords must include:
- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number

### User Roles
- **Super Admin**: Full access to all features including user management
- **Campaign Manager**: Can create and manage campaigns and templates
- **Volunteer Coordinator**: Can manage volunteers and events
- **Outreach Rep**: Basic access to view campaigns and analytics (default for new signups)

## Data Storage

Currently, the application uses local storage for user data. For production use, you should:

1. Replace the local storage system with a proper database (PostgreSQL, MySQL, etc.)
2. Implement proper session management
3. Add email verification for new accounts
4. Set up proper backup and recovery systems

## Admin Features

Super admins can access additional features in the Settings page:

- **Registered Users**: View all users who have signed up
- **User Analytics**: See registration dates and user roles
- **Permission Management**: View user permissions (editing coming soon)

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **Form Validation**: Client-side and server-side validation for all forms
- **Role-based Access**: Different features available based on user role
- **Session Management**: Secure login sessions with localStorage (upgrade to JWT recommended)

## Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React context providers
├── pages/              # Main application pages
├── types/              # TypeScript type definitions
└── main.tsx            # Application entry point
```

### Key Technologies
- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **bcryptjs** for password hashing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the development team or open an issue in the repository. 