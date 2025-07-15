# 🌍 GTPN Nonprofit Outreach Kit

**A comprehensive digital platform for nonprofit organizations to manage community outreach, professional networking, and event coordination.**

Originally designed for the **Global Tibetan Professionals Network (GTPN)**, this platform serves as a complete solution for nonprofit organizations looking to build and engage their professional communities through structured outreach campaigns, event management, and member directories.

---

## 🎯 **Project Goal**

The GTPN Nonprofit Outreach Kit empowers nonprofit organizations to:

- **Build Professional Networks**: Connect members across industries and geographic locations
- **Organize Community Events**: Plan and manage happy hours, hackathons, picnics, workshops, and fundraising events
- **Execute Outreach Campaigns**: Create and deploy targeted email campaigns with professional templates
- **Manage Member Directories**: Maintain GDPR/CCPA compliant databases with consent tracking
- **Track Engagement**: Monitor community growth and campaign effectiveness through analytics

This platform bridges the gap between traditional nonprofit management tools and modern professional networking needs, specifically addressing the unique challenges faced by diaspora and professional community organizations.

Nonprofit Outreach Kit is an open-source platform built to help mission-driven organizations streamline and personalize their outreach. Whether you're asking for donations, promoting events, recruiting volunteers, or expanding your professional network, this tool helps you generate targeted emails, manage supporter data, and run impactful multichannel campaigns with less manual work. Originally designed for GTPN, it's easy to adapt to any nonprofit's outreach goals.

---

## ✨ **Key Features**

### 🔐 **Complete Authentication System**
- **Secure User Registration**: Email validation with password strength requirements
- **Role-Based Access Control**: Super Admin, Campaign Manager, Volunteer Coordinator, Outreach Rep
- **Password Security**: bcrypt hashing with secure session management
- **Demo Accounts**: Pre-configured accounts for immediate testing

### 📊 **Analytics Dashboard**
- **Community Metrics**: Track network members, directory growth, donations, and active campaigns
- **Quick Actions**: One-click access to plan events, find members, and launch fundraising campaigns
- **Real-Time Updates**: Live data visualization with trend indicators
- **Personalized Greetings**: Time-based welcome messages for enhanced user experience

### 📅 **Event Planning & Management**
- **Event Templates**: Pre-built templates for Happy Hours, Community Picnics, Hackathons, Professional Mixers, Workshops, and Charity Events
- **Planning Tools**: Capacity management, location tracking, registration monitoring
- **Event Lifecycle**: Draft → Published → Completed status tracking
- **Planning Tips**: Built-in guidance for venue requirements, duration, and capacity suggestions

### 📧 **Campaign Playbook**
- **Professional Templates**: Ready-to-use email templates for networking, events, fundraising, and directory growth
- **Quick-Start Campaigns**: One-click campaign creation with pre-populated content
- **Template Customization**: Full editing capabilities with live preview
- **Variable Management**: Dynamic content personalization for targeted outreach

### 👥 **Directory Management**
- **GDPR/CCPA Compliance**: Built-in consent tracking with granted/pending/declined status management
- **Professional Profiles**: Comprehensive member information with privacy controls
- **Search & Filter**: Advanced member discovery tools
- **Export Capabilities**: Data export for approved members only
- **Audit Trails**: Complete privacy compliance documentation

### ⚙️ **Settings & Administration**
- **Notification Preferences**: Granular control over email, SMS, and push notifications with toggle switches
- **User Management**: Super admin panel for viewing and managing registered users
- **Profile Management**: Organization details, contact information, and preferences
- **Integration Ready**: Placeholder for Mailchimp, Twilio, Salesforce, and Slack integrations

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Modern web browser

### **Quick Setup**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/gtpn-outreach-kit.git
   cd gtpn-outreach-kit
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Platform**
   Open your browser to `http://localhost:5173` (or the port shown in terminal)

---

## 🧪 **Demo & Testing**

### **Pre-configured Demo Accounts**
Test the platform immediately with these accounts:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Super Admin** | `admin@yourorg.org` | `password` | Full platform access + user management |
| **Campaign Manager** | `manager@yourorg.org` | `password` | Campaign creation & management |

### **Create Your Own Account**
1. Click "Don't have an account? Sign up" on the login page
2. Complete registration with secure password requirements:
   - 8+ characters
   - Uppercase letter
   - Lowercase letter  
   - Number
3. Automatic role assignment as "Outreach Rep"
4. Immediate platform access upon registration

---

## 🛠 **User Roles & Permissions**

| Role | Dashboard | Events | Campaigns | Directory | Settings | User Management |
|------|-----------|--------|-----------|-----------|----------|-----------------|
| **Super Admin** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Yes |
| **Campaign Manager** | ✅ View | ✅ Create/Edit | ✅ Full | ✅ View | ✅ Profile | ❌ No |
| **Volunteer Coordinator** | ✅ View | ✅ Full | ✅ View | ✅ Full | ✅ Profile | ❌ No |
| **Outreach Rep** | ✅ View | ✅ View | ✅ View | ✅ View | ✅ Profile | ❌ No |

---

## 📱 **Core Workflows**

### **Planning an Event**
1. Dashboard → Click "Plan Event"
2. Choose from 6 event templates (Happy Hour, Hackathon, Picnic, etc.)
3. Fill event details with built-in planning tips
4. Set capacity, location, date/time
5. Publish or save as draft

### **Creating an Outreach Campaign**
1. Navigate to Campaign Playbook
2. Select "Quick Start GTPN Campaigns"
3. Choose campaign type (Networking, Fundraising, Event Promotion)
4. Customize pre-built templates
5. Launch campaign with target audience

### **Managing Directory Members**
1. Go to Directory Management
2. View members with consent status
3. Add new members manually or via import
4. Track consent (Granted/Pending/Declined)
5. Export approved member data

### **Configuring Notifications**
1. Click Settings in sidebar (or removed bell icon in header)
2. Navigate to "Notifications" tab
3. Toggle on/off for Email, SMS, and Push notifications
4. Customize preferences by category
5. Save preferences

---

## 🔧 **Technical Architecture**

### **Frontend Stack**
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and building
- **Tailwind CSS** for utility-first styling
- **React Router** for client-side navigation
- **Lucide React** for consistent iconography

### **Key Dependencies**
- **bcryptjs**: Secure password hashing
- **React Context API**: State management for auth, campaigns, and data
- **LocalStorage**: Development data persistence (upgrade to database for production)

### **Project Structure**
```
src/
├── components/          # Reusable UI components (Header, Sidebar, Layout)
├── contexts/           # React context providers (Auth, Campaign, Data)
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Analytics and quick actions
│   ├── EventPlanning.tsx # Event management system
│   ├── CampaignPlaybook.tsx # Email campaign tools
│   ├── DirectoryManagement.tsx # Member directory
│   ├── Settings.tsx    # User preferences and admin tools
│   ├── LoginPage.tsx   # Authentication
│   └── SignUpPage.tsx  # User registration
├── types/              # TypeScript type definitions
└── main.tsx            # Application entry point
```

---

## 🚀 **Production Deployment**

### **Recommended Upgrades for Live Deployment**

1. **Database Integration**
   - Replace localStorage with PostgreSQL/MySQL
   - Implement proper user sessions with JWT
   - Add email verification for new registrations

2. **Authentication Enhancement**
   - OAuth integration (Google, LinkedIn, GitHub)
   - Two-factor authentication (2FA)
   - Password reset functionality

3. **Email Service Integration**
   - Mailchimp for campaign management
   - SendGrid for transactional emails
   - SMS integration via Twilio

4. **Hosting & Deployment**
   - Deploy frontend to Vercel, Netlify, or AWS S3
   - Backend API to Heroku, AWS, or DigitalOcean
   - CDN for global performance

5. **Security Enhancements**
   - HTTPS enforcement
   - CORS configuration
   - Rate limiting and DDoS protection

---

## 🚀 **Live Demo & Deployment**

### **Live Application**
The GTPN Nonprofit Outreach Kit is deployed and accessible at:
**🌐 [https://tsewang21.github.io/nonprofit_outreach_kit/](https://tsewang21.github.io/nonprofit_outreach_kit/)**

### **Quick Start with Demo Accounts**
Try the platform immediately with these pre-configured accounts:
- **Admin**: `admin@yourorg.org` / `password123`
- **Manager**: `manager@yourorg.org` / `password123`

### **Deployment Options**

#### **GitHub Pages (Recommended for Demo)**
The project includes automated GitHub Actions deployment:
1. Push changes to the `main` branch
2. GitHub Actions automatically builds and deploys to GitHub Pages
3. Access your live site at `https://yourusername.github.io/nonprofit_outreach_kit/`

#### **Custom Domain Deployment**
For production use with your own domain:

**Vercel (Recommended)**
```bash
npm install -g vercel
vercel --prod
```

**Netlify**
```bash
npm run build
# Upload the dist/ folder to Netlify
```

**Traditional Hosting**
```bash
npm run build
# Upload the contents of dist/ to your web server
```

### **Environment Configuration**
For production deployment, consider:
- Replace localStorage with a proper database (PostgreSQL, MongoDB)
- Implement proper authentication backend
- Set up email service (SendGrid, Mailgun)
- Configure analytics (Google Analytics, Mixpanel)

---

## 🤝 **Contributing**

We welcome contributions from the community! Here's how to get involved:

1. **Fork the repository** on GitHub
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with clear, documented code
4. **Test thoroughly** to ensure no regressions
5. **Submit a pull request** with detailed description

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for consistent styling
- Add proper error handling and loading states
- Include comments for complex logic
- Test new features across different user roles

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 **Support & Community**

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/yourusername/gtpn-outreach-kit/issues)
- **Documentation**: Check this README and inline code comments
- **Community**: Join discussions in the repository's Discussions section

---

## 🙏 **Acknowledgments**

- **GTPN Community**: For inspiring the initial vision and requirements
- **Open Source Contributors**: For the amazing libraries and tools that make this possible
- **Nonprofit Organizations**: For their feedback and real-world usage insights

---

**Built with ❤️ for nonprofit organizations worldwide**

*Empowering communities through technology and meaningful connections.*

**Made by Tsewang Lhamo** 