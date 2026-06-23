# EgyptHub — Component Catalog

> **Version:** 2.0
> **Source of Truth:** Visual Boards (9 images)
> **Total Components:** 100+

---

## 1. Navigation Components

### 1.1 Top Navigation Bar (Header)
- **Variants:** Transparent (hero), Solid (scrolled), Glass (overlay)
- **States:** Default, Scrolled, Mobile menu open
- **Elements:** Logo, Nav links, Search, Auth buttons, Notifications, Avatar
- **Behavior:** Glass morphism on scroll, mobile hamburger menu

### 1.2 Sidebar Navigation
- **Variants:** Expanded, Collapsed, Mobile overlay
- **States:** Default, Active item, Hover
- **Elements:** Logo, Nav items with icons, Collapse toggle, User info
- **Behavior:** Collapse/expand animation, active state indicator (gold left border)

### 1.3 Bottom Tab Navigation (Mobile)
- **Variants:** 5-tab, 4-tab
- **States:** Default, Active
- **Elements:** Icon + Label per tab, Active indicator (gold dot/line)
- **Tabs:** Home, Explore, Bookings, AI, Profile

### 1.4 Breadcrumb
- **Variants:** Default, Compact
- **Elements:** Separator (chevron), Active (gold text), Inactive (muted text)

### 1.5 Tab Bar
- **Variants:** Underline, Pill, Card
- **States:** Default, Active, Disabled, Hover
- **Elements:** Tab items, Active indicator, Scroll arrows (mobile)

---

## 2. Button Components

### 2.1 Button (Primary)
- **Variants:** sm, md, lg
- **States:** Default, Hover, Active, Disabled, Loading
- **Style:** Gold gradient background, dark text, rounded-full
- **Hover:** Scale 1.02, gold shadow
- **Loading:** Spinner replaces text

### 2.2 Button (Secondary)
- **Variants:** sm, md, lg
- **States:** Default, Hover, Active, Disabled
- **Style:** Gold border, gold text, transparent background
- **Hover:** Gold subtle background

### 2.3 Button (Ghost)
- **Variants:** sm, md, lg
- **States:** Default, Hover, Active, Disabled
- **Style:** No border, muted text
- **Hover:** Surface background

### 2.4 Button (Danger)
- **Variants:** sm, md, lg
- **States:** Default, Hover, Active, Disabled
- **Style:** Red background, white text
- **Hover:** Darker red

### 2.5 Icon Button
- **Variants:** sm (32px), md (40px), lg (48px)
- **States:** Default, Hover, Active, Disabled
- **Style:** Rounded-full, surface background
- **Hover:** Surface-elevated

### 2.6 Floating Action Button (FAB)
- **Variants:** Single, Speed dial
- **States:** Default, Expanded
- **Style:** Gold gradient, circular, fixed position
- **Shadow:** Gold glow

### 2.7 Button Group
- **Variants:** Horizontal, Vertical
- **States:** Default, Active segment
- **Style:** Connected buttons, shared borders

---

## 3. Card Components

### 3.1 Experience Card
- **Variants:** Default, Featured, Compact, List
- **Elements:** Image (4:3), Category badge, Title, Rating, Price, Duration, Partner
- **States:** Default, Hover (translateY -4px + gold border), Loading
- **Hover:** Image zoom (scale 1.05), gold border glow
- **Bottom:** Gold accent line (2px)

### 3.2 Destination Card
- **Variants:** Default, Large (featured), Small
- **Elements:** Background image, Gradient overlay, Title, Stats
- **States:** Default, Hover (scale 1.05)
- **Style:** Rounded-3xl, full-bleed image, gradient text

### 3.3 Partner Card
- **Variants:** Default, Compact, List
- **Elements:** Logo, Name, Rating, Reviews, Specialties
- **States:** Default, Hover, Verified badge
- **Style:** Rounded-xl, surface background

### 3.4 Stat Card
- **Variants:** Default, Mini, Large
- **Elements:** Icon, Value, Label, Trend indicator
- **States:** Default, Hover
- **Style:** Surface background, gold icon background

### 3.5 Booking Card
- **Variants:** Default, Compact, Timeline
- **Elements:** Experience image, Title, Date, Status, Price, QR code
- **States:** Upcoming, Active, Completed, Cancelled
- **Style:** Status color indicator (left border)

### 3.6 Review Card
- **Variants:** Default, Compact, Highlighted
- **Elements:** Avatar, Name, Rating stars, Text, Date, Photos
- **States:** Default, Verified, Helpful
- **Style:** Rounded-xl, surface background

### 3.7 Offer Card
- **Variants:** Default, Banner, Inline
- **Elements:** Discount badge, Original price, Sale price, Countdown, CTA
- **States:** Default, Urgent, Expired
- **Style:** Red badge for discount, gold CTA

### 3.8 Notification Card
- **Variants:** Default, Unread, Compact
- **Elements:** Icon, Title, Description, Timestamp, Actions
- **States:** Read, Unread (gold dot), Hover
- **Style:** Left border color by type

### 3.9 Settings Card
- **Variants:** Default, Danger zone
- **Elements:** Title, Description, Action (toggle/button)
- **States:** Default, Active
- **Style:** Divided sections

### 3.10 Testimonial Card
- **Variants:** Default, Featured, Quote
- **Elements:** Avatar, Name, Quote text, Rating, Location
- **States:** Default, Active (carousel)
- **Style:** Rounded-2xl, glass morphism

---

## 4. Form Components

### 4.1 Text Input
- **Variants:** Default, With icon, With suffix, Search
- **States:** Default, Focus, Error, Disabled, Loading
- **Style:** Dark background, gold focus border, rounded-lg
- **Error:** Red border + error text

### 4.2 Textarea
- **Variants:** Default, Auto-resize
- **States:** Default, Focus, Error, Disabled
- **Style:** Dark background, gold focus border, rounded-lg

### 4.3 Select / Dropdown
- **Variants:** Default, Multi-select, Searchable
- **States:** Default, Open, Focus, Error, Disabled
- **Style:** Dark dropdown, gold highlight on hover
- **Dropdown:** Surface-elevated background, rounded-lg, shadow-lg

### 4.4 Date Picker
- **Variants:** Single date, Date range, Month picker
- **States:** Default, Open, Selected, Today, Disabled
- **Style:** Calendar grid, gold selected date, dark cells
- **Navigation:** Month/year arrows, dropdown

### 4.5 Time Picker
- **Variants:** Clock, List, Range
- **States:** Default, Selected, Disabled
- **Style:** Time slots grid, gold selected

### 4.6 Checkbox
- **Variants:** Default, Card, Toggle
- **States:** Unchecked, Checked, Indeterminate, Disabled
- **Style:** Gold check on dark background, rounded-sm
- **Animation:** Scale bounce on check

### 4.7 Radio Button
- **Variants:** Default, Card
- **States:** Unselected, Selected, Disabled
- **Style:** Gold dot on dark background, rounded-full

### 4.8 Toggle Switch
- **Variants:** Default, Small, Large
- **States:** Off, On, Disabled
- **Style:** Gold when on, gray when off, smooth slide
- **Animation:** 200ms slide

### 4.9 Slider / Range
- **Variants:** Single, Dual (range)
- **States:** Default, Active, Disabled
- **Style:** Gold track, white thumb, gold highlight

### 4.10 File Upload
- **Variants:** Dropzone, Button, Inline
- **States:** Default, Dragging, Uploading, Complete, Error
- **Style:** Dashed border, gold highlight on drag
- **Progress:** Gold progress bar

### 4.11 Search Input
- **Variants:** Default, Expanded, Overlay
- **States:** Default, Focus, With results
- **Style:** Search icon, dark background, gold focus
- **Results:** Dropdown with suggestions

---

## 5. Data Display Components

### 5.1 Table
- **Variants:** Default, Compact, Striped
- **States:** Default, Hover row, Selected row
- **Elements:** Header, Rows, Cells, Pagination, Empty state
- **Style:** Dark background, hover surface-elevated, gold sort indicator

### 5.2 Data Grid
- **Variants:** Table, Card grid, List
- **Elements:** Filters, Sort, Pagination, Bulk actions
- **Style:** Consistent with table styling

### 5.3 Pagination
- **Variants:** Numbers, Prev/Next, Infinite scroll
- **States:** Default, Active page, Disabled
- **Style:** Gold active page, dark buttons

### 5.4 Chart (Line)
- **Variants:** Default, Area, Stepped
- **Elements:** Lines, Points, Grid, Tooltip, Legend
- **Style:** Gold primary line, dark grid, surface tooltip

### 5.5 Chart (Bar)
- **Variants:** Vertical, Horizontal, Stacked, Grouped
- **Elements:** Bars, Grid, Tooltip, Legend
- **Style:** Gold primary bars, gradient fill

### 5.6 Chart (Pie/Donut)
- **Variants:** Pie, Donut, Semi-circle
- **Elements:** Slices, Legend, Center label
- **Style:** Multi-color palette, gold primary slice

### 5.7 Chart (Area)
- **Variants:** Default, Stacked, Gradient
- **Elements:** Area fill, Lines, Grid, Tooltip
- **Style:** Gold gradient fill

### 5.8 Stat Display
- **Variants:** Number, Number + Label, Number + Trend
- **Elements:** Value, Label, Trend arrow, Comparison
- **Style:** Gold number, muted label

### 5.9 Progress Bar
- **Variants:** Default, Striped, Animated
- **States:** Default, Success, Warning, Error
- **Style:** Gold gradient fill, dark track
- **Animation:** Smooth width transition

### 5.10 Badge
- **Variants:** Default, Dot, Count, Status
- **Colors:** Gold, Success, Warning, Error, Info, Neutral
- **Style:** Rounded-full, small text

### 5.11 Tag / Chip
- **Variants:** Default, Closable, Selectable
- **States:** Default, Active, Hover
- **Style:** Rounded-full, surface background, gold active
- **Close:** X icon, removes on click

### 5.12 Avatar
- **Variants:** Circle, Square, Rounded
- **Sizes:** xs (24px), sm (32px), md (40px), lg (56px), xl (80px), 2xl (120px)
- **Elements:** Image, Initials, Status indicator
- **Style:** Border on hover, gold ring for active

### 5.13 Avatar Group
- **Variants:** Default, Stacked
- **Elements:** Multiple avatars, Overflow count
- **Style:** Overlapping, gold border

### 5.14 Timeline
- **Variants:** Vertical, Horizontal
- **Elements:** Nodes, Connectors, Labels, Content
- **Style:** Gold active node, dark connectors

### 5.15 Empty State
- **Variants:** Default, Search, Error, No data
- **Elements:** Illustration, Title, Description, CTA
- **Style:** Centered, muted illustration

### 5.16 Loading State
- **Variants:** Skeleton, Spinner, Progress
- **Elements:** Placeholder shapes, spinner
- **Style:** Surface-elevated placeholders, gold spinner

---

## 6. Overlay Components

### 6.1 Modal / Dialog
- **Variants:** Default, Fullscreen, Drawer (right), Drawer (bottom)
- **States:** Opening, Open, Closing, Closed
- **Elements:** Backdrop, Container, Header, Body, Footer, Close button
- **Style:** Surface-elevated background, rounded-2xl, shadow-xl
- **Animation:** Fade backdrop + scale modal

### 6.2 Bottom Sheet (Mobile)
- **Variants:** Default, Half, Full
- **States:** Collapsed, Expanded, Dismissed
- **Elements:** Handle, Content, Actions
- **Style:** Surface background, rounded-t-2xl, drag to dismiss

### 6.3 Popover
- **Variants:** Default, With arrow
- **States:** Opening, Open, Closing
- **Elements:** Trigger, Content, Arrow
- **Style:** Surface-elevated, shadow-lg, rounded-lg

### 6.4 Tooltip
- **Variants:** Default, Rich (with icon/title)
- **States:** Showing, Hidden
- **Elements:** Text, Arrow
- **Style:** Dark background, white text, rounded-md
- **Behavior:** Show on hover, delay 300ms

### 6.5 Toast / Notification
- **Variants:** Default, Success, Warning, Error, Info
- **States:** Entering, Visible, Exiting
- **Elements:** Icon, Title, Description, Action, Close
- **Style:** Surface-elevated, left border by type
- **Animation:** Slide in from right, auto-dismiss

### 6.6 Lightbox
- **Variants:** Image, Gallery
- **States:** Opening, Open, Closing
- **Elements:** Backdrop, Image, Navigation arrows, Close button, Counter
- **Style:** Full-screen backdrop, centered image

### 6.7 Command Palette
- **Variants:** Default
- **States:** Opening, Open, Closed
- **Elements:** Search input, Results list, Categories
- **Style:** Centered modal, dark background, gold highlights

---

## 7. Layout Components

### 7.1 Container
- **Variants:** Default, Narrow, Wide, Full
- **Style:** Max-width constraints, responsive padding

### 7.2 Grid
- **Variants:** 2-col, 3-col, 4-col, Auto-fill, Masonry
- **Style:** Responsive columns, consistent gaps

### 7.3 Stack (Flex)
- **Variants:** Horizontal, Vertical
- **Style:** Consistent spacing between items

### 7.4 Divider
- **Variants:** Horizontal, Vertical, With text
- **Style:** Border color, optional gold accent

### 7.5 Section
- **Variants:** Default, Hero, Feature, Testimonial
- **Elements:** Title, Subtitle, Content, Background
- **Style:** Consistent padding, max-width content

### 7.6 Accordion
- **Variants:** Default, Bordered, Flush
- **States:** Collapsed, Expanded
- **Elements:** Header, Content, Chevron icon
- **Style:** Dark background, gold active indicator

### 7.7 Tabs
- **Variants:** Underline, Pill, Card
- **States:** Default, Active, Disabled
- **Elements:** Tab items, Active indicator, Content panels
- **Style:** Gold active, smooth transition

---

## 8. Navigation Components

### 8.1 Pagination
- **Variants:** Numbers, Prev/Next, Simple
- **States:** Default, Active, Disabled
- **Style:** Gold active page

### 8.2 Steps / Stepper
- **Variants:** Horizontal, Vertical
- **States:** Completed, Active, Upcoming
- **Elements:** Step numbers, Labels, Connectors
- **Style:** Gold completed, gold active, muted upcoming

### 8.3 Back Link
- **Variants:** Default, Icon
- **Style:** Gold text, chevron icon

### 8.4 Anchor Navigation
- **Variants:** Default, Sticky
- **States:** Default, Active
- **Style:** Scroll spy, gold active indicator

---

## 9. AI Concierge Components

### 9.1 Chat Bubble
- **Variants:** User (right), AI (left), System (center)
- **Elements:** Message text, Timestamp, Status (sent, read)
- **Style:** User: gold background, dark text. AI: surface background, white text

### 9.2 Chat Input
- **Variants:** Text only, With voice, With attachments
- **States:** Default, Recording, Sending
- **Elements:** Text input, Send button, Voice button, Attachment button
- **Style:** Dark input, gold send button

### 9.3 Quick Reply Chip
- **Variants:** Default, Suggested
- **States:** Default, Hover, Selected
- **Style:** Rounded-full, surface background, gold border on hover

### 9.4 Suggestion Card
- **Variants:** Default, Featured
- **Elements:** Title, Description, Image, CTA
- **Style:** Surface background, gold accent

### 9.5 Typing Indicator
- **Variants:** Dots, Waveform
- **Style:** Three animated dots, gold color

### 9.6 Voice Recorder
- **Variants:** Button, Full interface
- **States:** Idle, Recording, Processing
- **Elements:** Microphone icon, Waveform, Timer, Stop button
- **Style:** Gold pulse when recording

### 9.7 AI Recommendation Card
- **Variants:** Default, Horizontal, Vertical
- **Elements:** Match percentage, Image, Title, Price, Why section
- **Style:** Gold match badge, surface card

---

## 10. Booking Components

### 10.1 Calendar
- **Variants:** Month, Week, Range
- **States:** Default, Today, Selected, Available, Unavailable
- **Style:** Dark cells, gold selected, muted unavailable

### 10.2 Time Slot Picker
- **Variants:** Grid, List, Scroll
- **States:** Default, Selected, Unavailable
- **Style:** Dark cells, gold selected, red unavailable

### 10.3 Guest Counter
- **Variants:** Default, Compact
- **Elements:** Label, Minus button, Count, Plus button
- **Style:** Dark buttons, gold count

### 10.4 Price Breakdown
- **Variants:** Default, Compact
- **Elements:** Line items, Subtotal, Discount, Tax, Total
- **Style:** Muted labels, gold total

### 10.5 Payment Method Selector
- **Variants:** Cards, Icons, List
- **States:** Default, Selected
- **Elements:** Card icons, Card number, Expiry, CVV
- **Style:** Gold selected border

### 10.6 Booking Summary
- **Variants:** Default, Compact, Receipt
- **Elements:** Experience details, Date/Time, Guests, Price
- **Style:** Divided sections, gold total

### 10.7 Confirmation Screen
- **Variants:** Default, Success, Error
- **Elements:** Status icon, Title, Details, QR code, Actions
- **Style:** Gold success icon, centered layout

### 10.8 QR Code Display
- **Variants:** Default, With background
- **Elements:** QR code, Reference number, Instructions
- **Style:** White QR on dark background

---

## 11. Profile Components

### 11.1 User Avatar
- **Variants:** With status, With edit overlay
- **Sizes:** sm, md, lg, xl
- **Elements:** Image, Status dot, Edit icon
- **Style:** Gold ring for premium

### 11.2 Profile Header
- **Variants:** Default, Compact
- **Elements:** Avatar, Name, Bio, Stats, Edit button
- **Style:** Surface background, gold accents

### 11.3 Stats Row
- **Variants:** Default, With icons
- **Elements:** Multiple stat items
- **Style:** Gold numbers, muted labels

### 11.4 Settings Item
- **Variants:** Default, With toggle, With chevron
- **Elements:** Icon, Label, Description, Action
- **Style:** Surface background, divider between items

---

## 12. Dashboard Components

### 12.1 Dashboard Header
- **Variants:** Default, With actions
- **Elements:** Title, Description, Actions (buttons)
- **Style:** Surface background, gold title

### 12.2 Metric Card
- **Variants:** Default, Compact, With chart
- **Elements:** Icon, Value, Label, Trend, Mini chart
- **Style:** Surface background, gold icon bg

### 12.3 Dashboard Table
- **Variants:** Default, With actions, With status
- **Elements:** Header, Rows, Cells, Actions column
- **Style:** Dark background, hover surface-elevated

### 12.4 Filter Bar
- **Variants:** Default, Compact
- **Elements:** Search, Filters, Sort, Date range
- **Style:** Surface background, gold active filters

### 12.5 Dashboard Sidebar
- **Variants:** Expanded, Collapsed
- **Elements:** Nav items, Icons, Labels, Collapse toggle
- **Style:** Surface background, gold active indicator

### 12.6 Dashboard Card
- **Variants:** Default, With header, With footer
- **Elements:** Title, Content, Actions, Footer
- **Style:** Surface background, rounded-xl

---

## 13. Map Components

### 13.1 Map Container
- **Variants:** Default, Fullscreen, Split view
- **Elements:** Map, Controls, Legend
- **Style:** Dark map tiles, gold markers

### 13.2 Map Marker
- **Variants:** Default, Selected, Cluster
- **Elements:** Icon, Label, Popup
- **Style:** Gold marker, dark popup

### 13.3 Map Sidebar
- **Variants:** Default, Compact
- **Elements:** Location details, Photos, Actions
- **Style:** Surface background, scrollable

### 13.4 Map Controls
- **Variants:** Default
- **Elements:** Zoom in/out, Center, Fullscreen, Layer toggle
- **Style:** Dark buttons, gold icons

---

## 14. Media Components

### 14.1 Image
- **Variants:** Default, Rounded, Circle
- **States:** Loading, Loaded, Error
- **Style:** Lazy loading, skeleton placeholder

### 14.2 Image Gallery
- **Variants:** Grid, Carousel, Masonry
- **Elements:** Images, Navigation, Counter
- **Style:** Rounded corners, gold navigation

### 14.3 Video Player
- **Variants:** Default, Thumbnail
- **Elements:** Video, Controls, Play button
- **Style:** Dark controls, gold play button

### 14.4 Icon
- **Variants:** Filled, Outline
- **Sizes:** xs, sm, md, lg, xl
- **Colors:** Default (muted), Gold, Success, Error
- **Library:** Heroicons, Custom Egyptian icons

---

## 15. Feedback Components

### 15.1 Alert / Banner
- **Variants:** Info, Success, Warning, Error
- **Elements:** Icon, Title, Description, Action, Close
- **Style:** Left border color, dark background

### 15.2 Progress Indicator
- **Variants:** Linear, Circular, Steps
- **States:** Default, Indeterminate, Complete
- **Style:** Gold fill, dark track

### 15.3 Skeleton Loader
- **Variants:** Text, Card, Avatar, Table
- **Style:** Surface-elevated, pulse animation

### 15.4 Spinner
- **Variants:** Default, Small, Large
- **Style:** Gold, rotating

### 15.5 Empty State
- **Variants:** No data, No results, Error, Coming soon
- **Elements:** Illustration, Title, Description, CTA
- **Style:** Centered, muted

---

## 16. Utility Components

### 16.1 Copy to Clipboard
- **Variants:** Button, Icon
- **States:** Default, Copied
- **Style:** Gold checkmark on copy

### 16.2 Truncate / Ellipsis
- **Variants:** 1 line, 2 line, 3 line
- **Style:** Text overflow with ellipsis

### 16.3 Responsive Visibility
- **Variants:** Hide on mobile, Show on mobile, etc.
- **Style:** Display none/block based on breakpoint

### 16.4 Scroll to Top
- **Variants:** Button, Floating
- **States:** Hidden, Visible
- **Style:** Gold button, bottom-right position

### 16.5 Theme Toggle
- **Variants:** Default, Compact
- **States:** Light, Dark
- **Style:** Sun/Moon icon, gold active
