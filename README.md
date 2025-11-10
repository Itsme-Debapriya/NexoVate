# NexoVate - E-Learning Platform Frontend

A production-quality, fully responsive e-learning platform frontend built with Next.js, Tailwind CSS, and React. This is a frontend-only implementation using mock data and localStorage for persistence.

## Features

- **Landing Page** - Hero section, featured courses, testimonials
- **Course Catalog** - Browse, search, filter, and sort courses
- **Course Detail** - Complete course information with lesson list
- **Lesson Player** - Embedded YouTube videos with progress tracking
- **User Dashboard** - My courses, progress tracking, profile management
- **Authentication** - Sign in/Sign up with validation (frontend only)
- **Instructor Wizard** - Multi-step course creation wizard
- **Dark Mode** - Full dark mode support with localStorage persistence
- **Responsive Design** - Mobile-first design for all screen sizes
- **Accessibility** - Semantic HTML, keyboard navigation, ARIA labels

## Tech Stack

- **Framework**: Next.js (Latest) with App Router
- **Language**: JavaScript (JSX) - No TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Data**: Mock JSON files + localStorage
- **Video**: YouTube embeds via iframe

## Project Structure

\`\`\`
├── app/
│   ├── layout.jsx              # Root layout
│   ├── page.jsx                # Landing page
│   ├── signin/page.jsx         # Sign in page
│   ├── signup/page.jsx         # Sign up page
│   ├── courses/
│   │   ├── page.jsx            # Course catalog
│   │   └── [slug]/page.jsx     # Course detail
│   ├── dashboard/page.jsx      # User dashboard
│   └── instructor/create-course/page.jsx  # Create course wizard
├── components/
│   ├── Navigation.jsx          # Main navigation
│   ├── Footer.jsx              # Footer
│   ├── CourseCard.jsx          # Course card component
│   ├── CourseFilters.jsx       # Filter component
│   ├── LessonPlayer.jsx        # Video player with progress
│   ├── ReviewsSection.jsx      # Reviews display
│   ├── EditProfileModal.jsx    # Profile editor
│   ├── OAuthButtons.jsx        # OAuth dummy buttons
│   └── Theme-Provider.jsx      # Theme provider
├── hooks/
│   ├── useAuth.js              # Authentication hook
│   ├── useCourses.js           # Courses hook
│   └── useTheme.js             # Theme hook
├── lib/
│   ├── storage.js              # localStorage utilities
│   └── utils.js                # Helper functions
└── public/
    └── mock-data/
        ├── courses.json        # Mock courses
        └── users.json          # Mock users

\`\`\`

## Getting Started

### Installation

1. Download the project files
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## Mock Data

### Demo User Credentials

- **Email**: demo@NexoVate.com
- **Password**: password123

### Mock Data Files

- `/public/mock-data/courses.json` - 6 sample courses
- `/public/mock-data/users.json` - Demo user data

You can modify these files to add more courses and customize the content.

## Features Guide

### Authentication (Frontend Only)

- Sign up with email/password
- Password strength meter
- Show/hide password toggle
- Dummy OAuth buttons (Google/GitHub)
- Mock JWT stored in localStorage

### Course Catalog

- Search by title, description, or instructor
- Filter by category, level, price
- Sort by popularity, rating, or price
- Pagination with 12 courses per page

### Course Progress

- Mark lessons as complete
- Progress saved to localStorage per user
- Progress bar shows completion percentage
- Export progress as CSV

### Lesson Player

- Embedded YouTube videos
- Keyboard shortcuts (Space: play/pause)
- Lesson sidebar with completion indicators
- Related courses carousel

### User Dashboard

- My enrolled courses
- Progress tracking
- Edit profile (name, bio)
- Export progress as CSV
- Theme toggle (light/dark)

### Instructor Wizard

- 4-step course creation
- Save drafts to localStorage
- Add lessons with duration
- Set pricing (free/paid)
- Review before publishing

## Customization

### Colors & Theme

Edit the design tokens in `app/globals.css`:

\`\`\`css
--primary: oklch(0.205 0 0);
--secondary: oklch(0.97 0 0);
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);
\`\`\`

### Mock Data

Edit `/public/mock-data/courses.json` to:
- Add/remove courses
- Change course details
- Update instructor information
- Modify pricing

### Course Duration

Current durations are simulated. To track real duration:

1. Update the courses mock data
2. Calculate based on lesson count
3. Display in course detail and catalog

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Color contrast compliance
- Screen reader support
- Focus indicators
- Skip to content links

## localStorage Keys

\`\`\`javascript
// Authentication
NexoVate_auth_token          // Mock JWT token

// User Data
NexoVate_user_data           // Current user object

// Theme
NexoVate_theme               // 'light' or 'dark'

// Course Progress
NexoVate_course_progress_${userId}_${courseId}
// { completedLessons: [], lastWatched: id, completedAt: date }

// Onboarding
NexoVate_onboarding          // Flag for tour completion
\`\`\`

## Converting to Real Backend

To connect this frontend to a real backend:

### 1. Replace Mock Data Fetching

\`\`\`javascript
// Current (mock):
const response = await fetch('/mock-data/courses.json')

// Replace with:
const response = await fetch('https://api.example.com/courses')
\`\`\`

### 2. Replace Authentication

\`\`\`javascript
// Replace mock JWT generation with real API calls
const { data } = await supabase.auth.signInWithPassword({
  email,
  password
})
\`\`\`

### 3. Connect to Database

- Replace localStorage with API endpoints
- Implement proper token refresh
- Add error handling and validation
- Set up database schemas

### 4. Enable OAuth

- Configure OAuth providers (Google, GitHub)
- Replace dummy buttons with real authentication flows
- Store real tokens securely

## Deployment

### To Vercel

\`\`\`bash
npm run build
vercel deploy
\`\`\`

### Environment Variables

For production, add to `.env.local`:

\`\`\`
NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

## Performance Tips

1. **Code Splitting** - Routes automatically code-split
2. **Image Optimization** - Use Next.js Image component
3. **Font Loading** - Using Geist variable font
4. **Caching** - Mock data cached via fetch
5. **Bundle Size** - Tree-shaking removes unused code

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Known Limitations

- Frontend-only authentication (no real user accounts)
- Mock video URLs (use real YouTube URLs)
- No real database (localStorage only)
- No file uploads
- Mock email verification

## Future Enhancements

- [ ] Real backend API integration
- [ ] User comments and Q&A
- [ ] Live chat with instructors
- [ ] Certificate generation
- [ ] Course bundles
- [ ] Subscription plans
- [ ] Advanced analytics
- [ ] Mobile app

## Troubleshooting

### localStorage Not Working

- Clear browser cache and cookies
- Check browser storage permissions
- Ensure not in private/incognito mode

### YouTube Videos Not Loading

- Verify YouTube URLs are in iframe format
- Check embed link is correct
- Ensure YouTube embedding is enabled

### Dark Mode Not Persisting

- Check if theme storage is enabled
- Verify localStorage key is correct
- Try clearing browser cache

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, refer to the inline code documentation and comments throughout the project.
