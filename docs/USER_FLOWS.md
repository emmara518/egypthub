# EgyptHub — User Flows

> **Version:** 2.0
> **Source of Truth:** Visual Boards (9 images)
> **Total Flows:** 12 primary flows

---

## 1. Explore Destination Flow

### 1.1 Entry Points
- Homepage → Destination grid → Click city card
- Homepage → Search bar → Type destination name
- Mobile → Bottom nav → Explore tab → Destination filter
- AI Concierge → "Show me destinations" → Click suggestion

### 1.2 Flow Steps

```
Entry Point
    │
    ▼
Destination List (grid/map toggle)
    │
    ├── Filter: Category, Price, Rating, Duration
    ├── Sort: Recommended, Price, Rating, Distance
    │
    ▼
Destination Detail
    │
    ├── Hero carousel (destination images)
    ├── Quick stats (rating, reviews, experiences count)
    ├── Description section
    ├── Experiences grid (filtered to destination)
    ├── Map with pins
    ├── Reviews section
    │
    ▼
Select Experience → Experience Detail
    │
    ▼
Book Experience → Booking Flow
```

### 1.3 Key Screens
1. Destination List
2. Destination Detail
3. Experience Detail
4. Booking Flow (entry)

### 1.4 Decision Points
- **Filter applied?** → Re-filter list
- **Map view?** → Switch to map with pins
- **Save destination?** → Add to favorites
- **Share?** → Share modal (link, social, QR)

### 1.5 Error States
- No destinations found → Empty state with suggestions
- Filter returns no results → "Clear filters" CTA
- Image fails to load → Placeholder with retry

---

## 2. Book Experience Flow

### 2.1 Entry Points
- Experience Detail → "Book Now" button
- AI Concierge → "Book this" suggestion
- Favorites → "Book" on saved item
- Search results → "Book" on experience card

### 2.2 Flow Steps

```
Entry Point
    │
    ▼
Step 1: Select Date (Calendar)
    │
    ├── Month navigation
    ├── Available dates highlighted (gold)
    ├── Unavailable dates grayed
    │
    ▼
Step 2: Select Time (Time Slots)
    │
    ├── Available time slots
    ├── Duration display
    ├── Price per slot
    │
    ▼
Step 3: Guest Details
    │
    ├── Number of guests
    ├── Name inputs
    ├── Contact info
    ├── Special requirements
    │
    ▼
Step 4: Add-ons (Optional)
    │
    ├── Add-on cards
    ├── Quantity selectors
    ├── Price update
    │
    ▼
Step 5: Booking Summary
    │
    ├── Experience details
    ├── Date/Time
    ├── Guest list
    ├── Add-ons
    ├── Price breakdown
    ├── Cancellation policy
    │
    ▼
Step 6: Payment
    │
    ├── Payment method selector
    ├── Card input / Apple Pay / Google Pay
    ├── Save card toggle
    ├── Terms checkbox
    │
    ▼
Step 7: Confirmation
    │
    ├── Success animation
    ├── Booking reference
    ├── QR code
    ├── Summary
    ├── Add to calendar
    ├── Download receipt
    │
    ▼
Done
```

### 2.3 Key Screens
1. Calendar Selection
2. Time Selection
3. Guest Details
4. Add-ons Selection
5. Booking Summary
6. Payment
7. Confirmation
8. QR Code / Ticket

### 2.4 Decision Points
- **Date unavailable?** → Show alternative dates
- **Time slot full?** → Show next available
- **Add extras?** → Add-ons step
- **Skip add-ons?** → Go to summary
- **Payment fails?** → Show error, retry
- **Save card?** → Checkbox, store securely

### 2.5 Error States
- Date unavailable → "Choose another date"
- Time slot full → "Next available: [time]"
- Payment declined → "Try another method"
- Network error → "Retry" with saved state
- Session timeout → Resume from last step

---

## 3. AI Concierge Flow

### 3.1 Entry Points
- AI Concierge tab → Welcome screen
- Homepage → "Try AI Concierge" banner
- Any screen → Floating AI button
- Voice activation → "Hey EgyptHub"

### 3.2 Flow Steps

```
Entry Point
    │
    ▼
Welcome Screen
    │
    ├── AI avatar + greeting
    ├── Quick action chips
    ├── Example prompts
    │
    ▼
Chat Interface
    │
    ├── Type message OR
    ├── Voice input (tap/hold mic)
    │
    ▼
AI Processing
    │
    ├── Typing indicator
    ├── "Thinking..." state
    │
    ▼
AI Response
    │
    ├── Text response
    ├── Suggestion cards (if applicable)
    ├── Quick reply chips
    │
    ▼
User Action
    │
    ├── Follow suggestion → New screen
    ├── Ask follow-up → Continue chat
    ├── Book → Booking flow
    ├── Save → Add to favorites
    │
    ▼
Continue or End
```

### 3.3 Key Screens
1. Concierge Welcome
2. Chat Interface
3. Voice Interface
4. Recommendation Cards
5. Trip Suggestions

### 3.4 AI Capabilities
- **Destination recommendations** based on preferences
- **Experience curation** based on budget, interests
- **Itinerary generation** with day-by-day plan
- **Booking assistance** with direct links
- **Voice interaction** for hands-free use
- **Context awareness** remembers conversation history

### 3.5 Error States
- AI doesn't understand → "I'm not sure, can you rephrase?"
- Network error → "Connection lost, retrying..."
- No results → "I couldn't find matches, let me suggest alternatives"

---

## 4. Manage Trip Flow

### 4.1 Entry Points
- Traveler Portal → "My Trips"
- Confirmation email → "View Trip"
- Push notification → Trip reminder
- AI Concierge → "Show my trips"

### 4.2 Flow Steps

```
Entry Point
    │
    ▼
Trip List
    │
    ├── Tabs: Upcoming | Past | Cancelled
    ├── Trip cards with status
    │
    ▼
Select Trip
    │
    ▼
Trip Details
    │
    ├── Trip header (destination, dates, status)
    ├── Day-by-day itinerary
    ├── Activity cards with times
    ├── Map with route
    ├── Documents section
    ├── Emergency contacts
    ├── Cost summary
    │
    ▼
Actions
    │
    ├── Edit trip → Edit modal
    ├── Share trip → Share modal
    ├── Download → PDF itinerary
    ├── Cancel trip → Confirmation dialog
    ├── Contact support → Support chat
    │
    ▼
Done
```

### 4.3 Key Screens
1. Trip List
2. Trip Details
3. Edit Trip Modal
4. Share Modal
5. Cancel Confirmation

### 4.4 Decision Points
- **Trip upcoming?** → Show "Edit" and "Cancel" actions
- **Trip past?** → Show "Review" and "Rebook" actions
- **Trip cancelled?** → Show "Rebook" action
- **Share trip?** → Choose sharing method
- **Cancel trip?** → Confirm with reason

### 4.5 Error States
- Trip not found → "Trip may have been removed"
- Edit conflict → "Trip was modified by another user"
- Share failed → "Try again or copy link"

---

## 5. Manage Booking Flow

### 5.1 Entry Points
- Traveler Portal → "My Bookings"
- Confirmation email → "View Booking"
- Push notification → Booking reminder
- AI Concierge → "Show my bookings"

### 5.2 Flow Steps

```
Entry Point
    │
    ▼
Booking List
    │
    ├── Tabs: Upcoming | Past | Cancelled
    ├── Booking cards with status
    │
    ▼
Select Booking
    │
    ▼
Booking Details
    │
    ├── Booking reference
    ├── Experience details
    ├── Date/Time
    ├── Guests
    ├── Price breakdown
    ├── QR code (for check-in)
    ├── Cancellation policy
    │
    ▼
Actions
    │
    ├── View QR code → QR modal
    ├── Download receipt → PDF download
    ├── Cancel booking → Confirmation dialog
    ├── Contact partner → Chat/call
    ├── Leave review → Review form
    │
    ▼
Done
```

### 5.3 Key Screens
1. Booking List
2. Booking Details
3. QR Code Modal
4. Cancel Confirmation
5. Review Form

### 5.4 Decision Points
- **Booking active?** → Show QR code and check-in options
- **Booking past?** → Show review option
- **Cancel booking?** → Check cancellation policy
- **Refund eligible?** → Show refund amount

### 5.5 Error States
- QR code expired → "Generate new code"
- Cancel failed → "Contact support"
- Review failed → "Save draft and retry"

---

## 6. Partner Management Flow

### 6.1 Entry Points
- Partner Dashboard → Sidebar navigation
- Partner login → Dashboard home
- Email notification → New booking/alert

### 6.2 Flow Steps

```
Entry Point
    │
    ▼
Dashboard Home
    │
    ├── Key metrics overview
    ├── Recent bookings
    ├── Performance chart
    │
    ▼
Navigate to Section
    │
    ├── Offers Management
    ├── Bookings Management
    ├── Analytics
    ├── Payouts
    ├── Settings
    │
    ▼
Perform Action
    │
    ├── Create/Edit offer
    ├── Confirm/Reject booking
    ├── View report
    ├── Withdraw payout
    ├── Update settings
    │
    ▼
Done
```

### 6.3 Key Screens
1. Partner Dashboard Home
2. Offers Management
3. Create/Edit Offer
4. Bookings Management
5. Booking Details
6. Partner Analytics
7. Partner Payouts
8. Partner Settings

### 6.4 Decision Points
- **New booking?** → Confirm or reject within time limit
- **Payout available?** → Withdraw or reinvest
- **Performance low?** → View analytics, adjust pricing
- **Offer expired?** → Renew or create new

### 6.5 Error States
- Booking conflict → "Time slot already booked"
- Payout failed → "Check bank details"
- Offer validation failed → "Fix required fields"

---

## 7. Admin Operations Flow

### 7.1 Entry Points
- Admin Dashboard → Sidebar navigation
- Admin login → Dashboard home
- Alert notification → System issue
- Email → New support ticket

### 7.2 Flow Steps

```
Entry Point
    │
    ▼
Admin Dashboard
    │
    ├── Platform overview
    ├── Key metrics
    ├── Recent activity
    │
    ▼
Navigate to Section
    │
    ├── User Management
    ├── Partner Management
    ├── Booking Management
    ├── Content Management
    ├── Analytics
    ├── Payments
    ├── System Settings
    │
    ▼
Perform Action
    │
    ├── Approve/Suspend user
    ├── Approve/Suspend partner
    ├── Process refund
    ├── Update content
    ├── Generate report
    ├── Modify system settings
    │
    ▼
Done
```

### 7.3 Key Screens
1. Admin Dashboard Home
2. User Management
3. Partner Management
4. Booking Management
5. Content Management
6. Analytics
7. Payments Management
8. System Settings
9. Activity Logs
10. Support Tickets

### 7.4 Decision Points
- **User violates policy?** → Warn, suspend, or ban
- **Partner application?** → Review, approve, or reject
- **Refund request?** → Check policy, process or deny
- **System alert?** → Investigate, fix, or escalate
- **Content update?** → Draft, review, publish

### 7.5 Error States
- Action failed → "Retry" with error details
- Permission denied → "Insufficient permissions"
- System error → "Contact system administrator"
- Data conflict → "Refresh and try again"

---

## 8. Search & Discover Flow

### 8.1 Entry Points
- Homepage → Search bar
- Mobile → Search icon
- Explore page → Search input
- AI Concierge → "Search for..."

### 8.2 Flow Steps

```
Entry Point
    │
    ▼
Search Input (focus)
    │
    ├── Recent searches
    ├── Popular searches
    ├── Suggestions
    │
    ▼
Type Query
    │
    ├── Auto-complete suggestions
    ├── Category filters
    │
    ▼
Search Results
    │
    ├── Results grid/list
    ├── Filters (price, rating, category, location)
    ├── Sort (relevance, price, rating)
    ├── Map toggle
    │
    ▼
Select Result
    │
    ▼
Detail Page → Book / Save / Share
```

### 8.3 Key Screens
1. Search Input with Suggestions
2. Search Results
3. Filter Modal
4. Sort Modal
5. Map View

---

## 9. Authentication Flow

### 9.1 Entry Points
- Homepage → "Login" / "Sign Up"
- Any page → Protected action → Redirect to login
- Deep link → Auth required

### 9.2 Flow Steps

```
Entry Point
    │
    ▼
Login Screen
    │
    ├── Email/Phone + Password
    ├── Social login (Google, Facebook, Apple)
    ├── "Forgot password?" link
    │
    ▼
[If new user] → Sign Up
    │
    ├── Name, Email, Phone
    ├── Password
    ├── Terms checkbox
    ├── "Create Account"
    │
    ▼
[If forgot password] → Reset
    │
    ├── Enter email
    ├── Check email
    ├── Enter new password
    │
    ▼
Authenticated → Redirect to previous page
```

### 9.3 Key Screens
1. Login
2. Sign Up
3. Forgot Password
4. Reset Password
5. Email Verification
6. Phone Verification

---

## 10. Checkout Flow

### 10.1 Entry Points
- Booking Summary → "Proceed to Payment"
- Cart → "Checkout" (if cart system exists)

### 10.2 Flow Steps

```
Entry Point
    │
    ▼
Order Summary
    │
    ├── Items/experiences
    ├── Quantity
    ├── Price breakdown
    │
    ▼
Payment Method
    │
    ├── Saved cards
    ├── New card
    ├── Apple Pay / Google Pay
    │
    ▼
Card Input (if new card)
    │
    ├── Card number
    ├── Expiry
    ├── CVV
    ├── Name on card
    ├── Save card checkbox
    │
    ▼
Review & Confirm
    │
    ├── Total amount
    ├── Terms acceptance
    ├── "Pay Now" button
    │
    ▼
Processing
    │
    ├── Loading state
    ├── "Processing payment..."
    │
    ▼
Result
    │
    ├── Success → Confirmation screen
    ├── Failed → Error + retry options
    │
    ▼
Done
```

### 10.3 Key Screens
1. Order Summary
2. Payment Method Selection
3. Card Input Form
4. Review & Confirm
5. Processing State
6. Success / Error

---

## 11. Profile Management Flow

### 11.1 Entry Points
- Profile page → "Edit Profile"
- Settings → "Account"
- Onboarding → "Complete your profile"

### 11.2 Flow Steps

```
Entry Point
    │
    ▼
Profile Page
    │
    ├── Avatar
    ├── Name, Bio
    ├── Stats (trips, reviews, points)
    │
    ▼
Edit Profile
    │
    ├── Change avatar
    ├── Edit name, email, phone
    ├── Update bio
    ├── Change password
    ├── Language preference
    ├── Notification settings
    │
    ▼
Save Changes
    │
    ├── Validation
    ├── Success message
    │
    ▼
Done
```

### 11.3 Key Screens
1. Profile View
2. Edit Profile Form
3. Change Avatar Modal
4. Change Password
5. Notification Settings
6. Language Settings

---

## 12. Notification Flow

### 12.1 Entry Points
- Bell icon → Notification panel
- Push notification → Tap to open
- Email → Click link to view

### 12.2 Flow Steps

```
Entry Point
    │
    ▼
Notification Panel/List
    │
    ├── Unread (bold, gold dot)
    ├── Read (normal)
    ├── Filter by type
    │
    ▼
Select Notification
    │
    ├── Booking update → Booking details
    ├── Promo → Offer page
    ├── System → Settings
    ├── AI suggestion → AI Concierge
    │
    ▼
Action Taken
    │
    ├── Mark as read
    ├── Delete
    ├── Mute notifications
    │
    ▼
Done
```

### 12.3 Key Screens
1. Notification Panel (dropdown)
2. Notification List (full page)
3. Notification Detail
4. Notification Settings

---

## 13. Review & Rating Flow

### 13.1 Entry Points
- Post-booking → "Leave a Review"
- Trip completed → Prompt notification
- Booking details → "Review" button

### 13.2 Flow Steps

```
Entry Point
    │
    ▼
Review Form
    │
    ├── Overall rating (1-5 stars)
    ├── Category ratings
    │   ├── Value for money
    │   ├── Experience quality
    │   ├── Guide/Host
    │   ├── Organization
    ├── Written review
    ├── Photo upload (optional)
    │
    ▼
Preview Review
    │
    ├── See how it looks
    ├── Edit if needed
    │
    ▼
Submit Review
    │
    ├── Validation
    ├── Success message
    ├── "Thank you" screen
    │
    ▼
Done
```

### 13.3 Key Screens
1. Review Form
2. Photo Upload
3. Preview
4. Success / Thank You

---

## 14. Support Flow

### 14.1 Entry Points
- Help center → "Contact Us"
- Booking details → "Get Help"
- Profile → "Support"
- AI Concierge → "I need help"

### 14.2 Flow Steps

```
Entry Point
    │
    ▼
Help Center
    │
    ├── FAQ search
    ├── Category browsing
    ├── "Contact Support" CTA
    │
    ▼
Contact Options
    │
    ├── Chat with AI
    ├── Chat with agent
    ├── Email form
    ├── Phone call
    │
    ▼
Submit Request
    │
    ├── Category selection
    ├── Description
    ├── Attachments
    ├── Priority level
    │
    ▼
Ticket Created
    │
    ├── Reference number
    ├── Estimated response time
    ├── "We'll get back to you"
    │
    ▼
Done
```

### 14.3 Key Screens
1. Help Center
2. FAQ
3. Contact Options
4. Ticket Form
5. Ticket Confirmation
6. Chat Interface
