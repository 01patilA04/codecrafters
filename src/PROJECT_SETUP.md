# MedTrack+ Hospital Resource Management System

## 📋 Project Overview

MedTrack+ is a real-time hospital resource tracking system built with React, TypeScript, and Tailwind CSS. It provides healthcare facilities with instant visibility into resource availability, equipment status, and room allocation.

---

## 📁 Complete Project Structure

```
medtrack-project/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── HomePage.tsx              # Landing page with hero section
│   │   │   ├── DashboardPage.tsx         # Resource dashboard with filters
│   │   │   └── ResourceDetailPage.tsx    # Individual resource details
│   │   ├── ui/                           # shadcn/ui components (pre-installed)
│   │   ├── Header.tsx                    # Navigation header
│   │   ├── Footer.tsx                    # Footer with links
│   │   └── Router.tsx                    # React Router configuration
│   ├── entities/
│   │   └── index.ts                      # TypeScript interfaces for CMS data
│   ├── hooks/
│   │   ├── use-toast.tsx                 # Toast notifications
│   │   └── use-size.ts                   # Responsive sizing hook
│   ├── lib/
│   │   ├── scroll-to-top.tsx             # Auto-scroll on route change
│   │   └── utils.ts                      # Utility functions
│   ├── styles/
│   │   ├── global.css                    # Global styles
│   │   └── fonts.css                     # Custom fonts
│   ├── tailwind.config.mjs               # Tailwind configuration
│   └── env.d.ts                          # TypeScript environment definitions
├── integrations/
│   ├── cms/                              # CMS service integration
│   ├── members/                          # Member/authentication service
│   └── errorHandlers/                    # Error page component
├── public/
│   └── error.svg                         # Error page icon
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript configuration
├── tailwind.config.mjs                   # Root Tailwind config
├── astro.config.mjs                      # Astro framework config
├── vite.config.ts                        # Vite build configuration
└── wix.config.json                       # Wix platform configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- VS Code (recommended)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If you have git
   git clone <repository-url>
   cd medtrack-project
   
   # Or extract the provided folder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:3000` (or the port shown in terminal)
   - The app will hot-reload as you make changes

---

## 📄 Key Files Explained

### Pages

#### **HomePage.tsx** (`src/components/pages/HomePage.tsx`)
- Landing page with hero section
- Features resource categories
- System benefits showcase
- Call-to-action buttons
- Parallax animations

#### **DashboardPage.tsx** (`src/components/pages/DashboardPage.tsx`)
- Real-time resource listing
- Search and filter functionality
- Status indicators (Available, In Use, Maintenance, Unavailable)
- Statistics cards
- Grid layout with resource cards

#### **ResourceDetailPage.tsx** (`src/components/pages/ResourceDetailPage.tsx`)
- Individual resource details
- Location and department information
- Status update panel
- Specifications display
- Last updated timestamp

### Components

#### **Header.tsx**
- Sticky navigation bar
- Mobile-responsive menu
- Active link highlighting
- Logo with branding

#### **Footer.tsx**
- Multi-column layout
- Quick links
- Contact information
- Copyright notice

#### **Router.tsx**
- React Router configuration
- Route definitions
- Layout wrapper
- Error handling

---

## 🎨 Design System

### Colors (from tailwind.config.mjs)
```
Primary: #000000 (Black)
Secondary: #FFFFFF (White)
Accent Cyan: #00F0FF (Bright Cyan)
Background: #F9F9F9 (Light Gray)
Destructive: #DF3131 (Red)
Dark Gray Overlay: #1A1A1A
```

### Typography
- **Headings**: avenir-lt-w01_85-heavy1475544
- **Paragraphs**: avenir-lt-w01_35-light1475496

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🔌 API Integration

### CMS Service (BaseCrudService)
Located in `integrations/cms/`

**Available Methods:**
```typescript
// Get all items
await BaseCrudService.getAll<HospitalResources>('hospitalresources');

// Get single item
await BaseCrudService.getById<HospitalResources>('hospitalresources', id);

// Create item
await BaseCrudService.create('hospitalresources', { ...data });

// Update item
await BaseCrudService.update('hospitalresources', { _id: id, ...updates });

// Delete item
await BaseCrudService.delete('hospitalresources', id);
```

### Data Structure (HospitalResources)
```typescript
{
  _id: string;
  resourceName?: string;
  resourceType?: string;
  location?: string;
  availabilityStatus?: string;
  specifications?: string;
  department?: string;
  lastUpdated?: Date | string;
  _createdDate?: Date;
  _updatedDate?: Date;
}
```

---

## 🛠️ Development Workflow

### Adding a New Page

1. **Create Component** (`src/components/pages/NewPage.tsx`)
   ```typescript
   import Header from '@/components/Header';
   import Footer from '@/components/Footer';
   
   export default function NewPage() {
     return (
       <div className="min-h-screen bg-background">
         <Header />
         <main>
           {/* Your content */}
         </main>
         <Footer />
       </div>
     );
   }
   ```

2. **Add Route** (in `src/components/Router.tsx`)
   ```typescript
   {
     path: "new-page",
     element: <NewPage />,
     routeMetadata: {
       pageIdentifier: 'new-page',
     },
   }
   ```

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the color system defined in `tailwind.config.mjs`
- Use `font-heading` and `font-paragraph` for typography
- Maintain responsive design with mobile-first approach
- Use `framer-motion` for animations

### Component Best Practices

- Keep components in `src/components/`
- Use TypeScript for type safety
- Import UI components from `@/components/ui/`
- Use Lucide React for icons
- Implement proper error handling

---

## 📦 Available Packages

- **React** - UI framework
- **React Router** - Client-side routing
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **shadcn/ui** - Pre-built components
- **Lucide React** - Icon library
- **Zustand** - State management
- **React Hook Form** - Form handling

---

## 🔧 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📱 Features

✅ Real-time resource tracking
✅ Advanced filtering and search
✅ Status management
✅ Responsive design
✅ Smooth animations
✅ Mobile-optimized
✅ TypeScript support
✅ Error handling
✅ Toast notifications

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Restart TypeScript server in VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

---

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```
VITE_API_URL=your_api_url
VITE_WIX_CLIENT_ID=your_wix_client_id
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

This project is proprietary and confidential.

---

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review component documentation
- Consult the Wix platform documentation

---

## ✨ Quick Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

---

**Last Updated:** March 2026
**Version:** 1.0.0
