# Design Guidelines: Yamaha Motorcycle Parts E-Commerce

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium e-commerce platforms (Shopify, RevZilla, Cycle Gear) combined with Yamaha's motorsport heritage. This creates an adrenaline-fueled, performance-oriented aesthetic that appeals to motorcycle enthusiasts while maintaining e-commerce best practices.

## Core Design Principles
- **Performance Heritage**: Bold, racing-inspired visuals that evoke speed and precision
- **Trust & Professionalism**: Clean layouts that instill confidence in parts authenticity
- **Enthusiast-Focused**: Design language that speaks to passionate Yamaha riders

## Color Palette

### Dark Mode (Primary)
- **Primary Brand**: 214 100% 45% (Yamaha racing blue - vibrant, energetic)
- **Background Base**: 220 15% 10% (Deep charcoal with subtle blue undertone)
- **Surface**: 220 12% 15% (Elevated surfaces, cards)
- **Text Primary**: 0 0% 98% (Crisp white for readability)
- **Text Secondary**: 220 8% 65% (Muted for supporting text)
- **Accent**: 0 0% 100% (Pure white for CTAs and highlights)
- **Success**: 142 76% 36% (Purchase confirmations)
- **Warning**: 38 92% 50% (Stock alerts, limited availability)

### Light Mode
- **Primary Brand**: 214 100% 42% (Slightly deeper blue)
- **Background Base**: 0 0% 98% (Clean white)
- **Surface**: 0 0% 100% (Pure white cards)
- **Text Primary**: 220 15% 15% (Deep charcoal)
- **Text Secondary**: 220 8% 45% (Muted gray)

## Typography
- **Headings**: Inter (700-800 weight) - Modern, technical precision
- **Body**: Inter (400-500 weight) - Excellent readability for product specs
- **Accent/Price**: Inter (600 weight) - Emphasis on pricing
- **Sizes**: text-5xl+ for hero, text-3xl for section headers, text-lg for product names, text-base for descriptions

## Layout System
**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 24
- Section padding: py-16 md:py-24
- Card padding: p-6
- Grid gaps: gap-6 to gap-8
- Container: max-w-7xl mx-auto px-4

## Component Library

### Navigation
- Sticky header with transparent background over hero, solid on scroll
- Logo left, primary nav center, cart/user icons right
- Mobile: Hamburger menu with slide-out panel
- Cart icon with item count badge

### Hero Section
- Full-width, 85vh height
- Background: High-impact image of Yamaha motorcycle (racing/track setting preferred) with dark overlay (opacity 40%)
- Headline: Large, bold statement about premium parts
- Subheading: Trust indicators ("Genuine Yamaha Parts", "Fast Shipping")
- Primary CTA: "Shop Parts" with blurred background (bg-white/10 backdrop-blur-md)
- Trust badges row: Free shipping, warranty, authentic parts

### Product Cards
- Image aspect ratio 4:3, hover zoom effect (minimal)
- Product name (text-lg font-semibold)
- Part number in smaller text (text-sm text-muted)
- Price prominent (text-2xl font-bold text-primary)
- Stock status badge (In Stock/Low Stock)
- "Add to Cart" button (full-width, primary color)
- Wishlist heart icon (top-right corner)

### Shop Page
- Sidebar filters (desktop): Categories, price range slider, brand, compatibility
- Top bar: Search, view toggle (grid/list), sort dropdown
- Grid: 3 columns desktop, 2 tablet, 1 mobile (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Pagination at bottom

### Cart Page
- Two-column layout (desktop): Cart items left (2/3 width), order summary right (1/3 width, sticky)
- Cart item row: Image left, details center, quantity controls + price right, remove icon
- Empty cart state: Icon, message, "Continue Shopping" CTA
- Order summary: Subtotal, shipping estimate, total (bold, larger text)
- Checkout button: Full-width, prominent

### Authentication Pages
- Centered card layout (max-w-md)
- Clean form design with floating labels
- Social login buttons (Google, GitHub) at top
- Divider with "or" text
- Email/password fields with validation states
- Remember me checkbox
- Primary action button full-width
- Link to alternate action (Sign up/Login)

### User Profile
- Sidebar navigation: Account details, orders, wishlist, addresses
- Main content area: Forms or data tables based on section
- Order history: Card-based list with status badges

## Images
- **Hero**: Full-width Yamaha motorcycle in action (racing, mountain road, or track setting) - high-energy, professional photography
- **Product Images**: Clean, white-background studio shots for all parts
- **Category Banners**: Motorcycle detail shots (engine close-up, brake system, etc.) for each category section
- **Trust Badges**: Yamaha logo, shipping icons, warranty seals in footer

## Animations
- Product card hover: Subtle scale (scale-105)
- Add to cart: Brief shake animation on cart icon
- Page transitions: Minimal fade
- **Avoid**: Excessive scroll animations, parallax effects

## Unique Design Elements
- **Part Number Display**: Monospace font for technical authenticity
- **Compatibility Tags**: Pills showing compatible bike models
- **Stock Urgency**: "Only 3 left" warnings in orange/yellow
- **Racing Stripes**: Subtle diagonal accent lines in section backgrounds (very light, 5% opacity)
- **Performance Metrics**: Display product specs in technical grid format (weight, material, performance gains)

## Responsive Behavior
- Hero height: 85vh desktop, 70vh tablet, 60vh mobile
- Navigation: Horizontal desktop, hamburger mobile
- Product grid: 3→2→1 columns
- Cart: Stacked single column on mobile
- Filters: Slide-out drawer on mobile

This design creates a premium, performance-focused e-commerce experience that honors Yamaha's racing heritage while ensuring smooth, conversion-optimized user journeys.