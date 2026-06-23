// Utilities
export { cn, Portal, formatCurrency, formatDate, formatTime, formatRelativeTime } from './utils';

// Hooks
export {
  useMediaQuery,
  useBreakpoint,
  useReducedMotion,
  useClickOutside,
  useLockedBody,
  useDebounce,
  useScrollPosition,
} from './hooks';

// Components
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { Input } from './components/Input';
export type { InputProps, InputSize } from './components/Input';

export { Textarea } from './components/Textarea';
export type { TextareaProps, TextareaSize } from './components/Textarea';

export { Spinner } from './components/Spinner';
export type { SpinnerProps, SpinnerSize, SpinnerColor } from './components/Spinner';

export { Icon } from './components/Icon';
export type { IconProps, IconSize, IconColor } from './components/Icon';

export {
  PyramidIcon,
  CompassIcon,
  StarIcon,
  SunIcon,
  WaveIcon,
  PalmIcon,
  LotusIcon,
} from './components/EgyptianIcons';

export { Card, CardHeader, CardContent, CardFooter } from './components/Card';
export type { CardProps, CardVariant } from './components/Card';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeColor, BadgeVariant, BadgeSize } from './components/Badge';

export { Avatar, AvatarGroup } from './components/Avatar';
export type { AvatarProps, AvatarSize, AvatarStatus } from './components/Avatar';

export { Skeleton } from './components/Skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/Skeleton';

export { Modal } from './components/Modal';
export type { ModalProps, ModalSize } from './components/Modal';

export { Drawer } from './components/Drawer';
export type { DrawerProps, DrawerPosition, DrawerSize } from './components/Drawer';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipPosition, TooltipVariant } from './components/Tooltip';

export { ToastProvider, useToast, ToastContainer } from './components/Toast';
export type { Toast, ToastType, ToastState } from './components/Toast';

// Layout Components
export { Grid } from './components/Grid';
export type { GridProps } from './components/Grid';

export { Stack } from './components/Stack';
export type { StackProps } from './components/Stack';

export { Flex } from './components/Flex';
export type { FlexProps } from './components/Flex';

export { Section } from './components/Section';
export type { SectionProps } from './components/Section';

export { SectionHeader } from './components/SectionHeader';
export type { SectionHeaderProps } from './components/SectionHeader';

export { PageContainer } from './components/PageContainer';
export type { PageContainerProps } from './components/PageContainer';

export { HeroContainer } from './components/HeroContainer';
export type { HeroContainerProps } from './components/HeroContainer';

export { DashboardLayout } from './components/DashboardLayout';
export type { DashboardLayoutProps } from './components/DashboardLayout';

// Navigation Components
export { Breadcrumb } from './components/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb';

export { Tabs } from './components/Tabs';
export type { TabsProps, Tab } from './components/Tabs';

export { Stepper } from './components/Stepper';
export type { StepperProps, Step } from './components/Stepper';

export { BottomNavigation } from './components/BottomNavigation';
export type { BottomNavigationProps, BottomNavItem } from './components/BottomNavigation';

export { Sidebar, MobileSidebar } from './components/Sidebar';
export type { SidebarProps, SidebarNavItem, SidebarUser, MobileSidebarProps } from './components/Sidebar';

export { Header, MobileHeader } from './components/Header';
export type { HeaderProps, HeaderNavLink, HeaderUser, MobileHeaderProps } from './components/Header';

// Sprint 3 — Discovery Layer

// Group A — Hero System
export { Hero, HeroContent, HeroMedia, HeroSearch, HeroStats, HeroCTA } from './components/Hero';
export type { HeroProps, HeroContentProps, HeroMediaProps, HeroSearchProps, HeroStatsProps, HeroCTAProps } from './components/Hero';

// Group B — Destination Discovery
export { DestinationCard } from './components/DestinationCard';
export type { DestinationCardProps } from './components/DestinationCard';

export { DestinationGrid } from './components/DestinationGrid';
export type { DestinationGridProps } from './components/DestinationGrid';

export { DestinationCarousel } from './components/DestinationCarousel';
export type { DestinationCarouselProps } from './components/DestinationCarousel';

export { DestinationBadge } from './components/DestinationBadge';
export type { DestinationBadgeProps, DestinationBadgeType } from './components/DestinationBadge';

// Group C — Experience Discovery
export { ExperienceCard } from './components/ExperienceCard';
export type { ExperienceCardProps } from './components/ExperienceCard';

export { ExperienceGrid } from './components/ExperienceGrid';
export type { ExperienceGridProps } from './components/ExperienceGrid';

export { ExperienceCarousel } from './components/ExperienceCarousel';
export type { ExperienceCarouselProps } from './components/ExperienceCarousel';

export { ExperienceBadge } from './components/ExperienceBadge';
export type { ExperienceBadgeProps, ExperienceBadgeType } from './components/ExperienceBadge';

// Group D — Stories
export { StoryCard } from './components/StoryCard';
export type { StoryCardProps } from './components/StoryCard';

export { StoryCarousel } from './components/StoryCarousel';
export type { StoryCarouselProps } from './components/StoryCarousel';

export { StoryPreview } from './components/StoryPreview';
export type { StoryPreviewProps } from './components/StoryPreview';

// Group E — Offers
export { OfferCard } from './components/OfferCard';
export type { OfferCardProps } from './components/OfferCard';

export { OfferBanner } from './components/OfferBanner';
export type { OfferBannerProps } from './components/OfferBanner';

export { OfferCountdown } from './components/OfferCountdown';
export type { OfferCountdownProps } from './components/OfferCountdown';

// Group F — Trust & Social Proof
export { Testimonials } from './components/Testimonials';
export type { TestimonialsProps, Testimonial } from './components/Testimonials';

export { ReviewCard } from './components/ReviewCard';
export type { ReviewCardProps } from './components/ReviewCard';

export { RatingStars } from './components/RatingStars';
export type { RatingStarsProps } from './components/RatingStars';

export { TrustBar } from './components/TrustBar';
export type { TrustBarProps } from './components/TrustBar';

export { PartnerLogos } from './components/PartnerLogos';
export type { PartnerLogosProps, PartnerLogo } from './components/PartnerLogos';

// Group G — Data Display
export { StatsBar } from './components/StatsBar';
export type { StatsBarProps, StatsBarItem } from './components/StatsBar';

export { MetricCard } from './components/MetricCard';
export type { MetricCardProps } from './components/MetricCard';

export { Counter } from './components/Counter';
export type { CounterProps } from './components/Counter';

// Group H — Map Foundation
export { MapContainer, MapPin, MapTooltip, MapFilters } from './components/MapContainer';
export type { MapContainerProps, MapPinProps, MapTooltipProps, MapFiltersProps, MapCoordinates } from './components/MapContainer';

export { useCountdown, useCounter } from './hooks';

// Sprint 4 — AI Concierge Layer

// Group A — Chat System
export { ChatBubble } from './components/ChatBubble';
export type { ChatBubbleProps } from './components/ChatBubble';

export { ChatMessage } from './components/ChatMessage';
export type { ChatMessageProps } from './components/ChatMessage';

export { ChatComposer } from './components/ChatComposer';
export type { ChatComposerProps } from './components/ChatComposer';

export { SuggestionChips } from './components/SuggestionChips';
export type { SuggestionChipsProps } from './components/SuggestionChips';

export { ConversationTimeline } from './components/ConversationTimeline';
export type { ConversationTimelineProps, TimelineEntry } from './components/ConversationTimeline';

export { ChatWindow } from './components/ChatWindow';
export type { ChatWindowProps } from './components/ChatWindow';

// Group B — AI Recommendation Components
export { AIWelcome } from './components/AIWelcome';
export type { AIWelcomeProps } from './components/AIWelcome';

export { AIRecommendationCard } from './components/AIRecommendationCard';
export type { AIRecommendationCardProps } from './components/AIRecommendationCard';

export { AIInsightCard } from './components/AIInsightCard';
export type { AIInsightCardProps } from './components/AIInsightCard';

export { AITripPlanCard } from './components/AITripPlanCard';
export type { AITripPlanCardProps, TripDay } from './components/AITripPlanCard';

export { AIItineraryCard } from './components/AIItineraryCard';
export type { AIItineraryCardProps, ItineraryDay } from './components/AIItineraryCard';

// Group C — Voice Components
export { VoiceRecorder } from './components/VoiceRecorder';
export type { VoiceRecorderProps } from './components/VoiceRecorder';

export { VoiceWaveform } from './components/VoiceWaveform';
export type { VoiceWaveformProps } from './components/VoiceWaveform';

export { VoicePlayer } from './components/VoicePlayer';
export type { VoicePlayerProps } from './components/VoicePlayer';

export { VoiceStatus } from './components/VoiceStatus';
export type { VoiceStatusProps, VoiceStatusType } from './components/VoiceStatus';

// Group D — AI Actions
export { QuickActions } from './components/QuickActions';
export type { QuickActionsProps, QuickAction } from './components/QuickActions';

export { SmartSuggestions } from './components/SmartSuggestions';
export type { SmartSuggestionsProps, SmartSuggestion } from './components/SmartSuggestions';

export { ContextCards } from './components/ContextCards';
export type { ContextCardsProps, ContextCard } from './components/ContextCards';

export { IntentSelector } from './components/IntentSelector';
export type { IntentSelectorProps, IntentOption } from './components/IntentSelector';

// Group E — Trip Planner
export { TripPlanner } from './components/TripPlanner';
export type { TripPlannerProps, TripPlannerStep } from './components/TripPlanner';

export { TripBudgetSelector } from './components/TripBudgetSelector';
export type { TripBudgetSelectorProps, BudgetLevel } from './components/TripBudgetSelector';

export { TripDurationSelector } from './components/TripDurationSelector';
export type { TripDurationSelectorProps } from './components/TripDurationSelector';

export { TripCompanionSelector } from './components/TripCompanionSelector';
export type { TripCompanionSelectorProps, CompanionType } from './components/TripCompanionSelector';

export { TripPreferencesSelector } from './components/TripPreferencesSelector';
export type { TripPreferencesSelectorProps, Preference } from './components/TripPreferencesSelector';

// Sprint 5 — Booking & Commerce Layer

// Group A — Booking Flow
export { BookingStepper } from './components/BookingStepper';
export type { BookingStepperProps, BookingStep } from './components/BookingStepper';

export { BookingSummary } from './components/BookingSummary';
export type { BookingSummaryProps } from './components/BookingSummary';

export { BookingSidebar } from './components/BookingSidebar';
export type { BookingSidebarProps } from './components/BookingSidebar';

export { BookingTimeline } from './components/BookingTimeline';
export type { BookingTimelineProps } from './components/BookingTimeline';

export { BookingReview } from './components/BookingReview';
export type { BookingReviewProps } from './components/BookingReview';

// Group B — Date & Time
export { Calendar } from './components/Calendar';
export type { CalendarProps } from './components/Calendar';

export { DateRangePicker } from './components/DateRangePicker';
export type { DateRangePickerProps } from './components/DateRangePicker';

export { TimeSlotPicker } from './components/TimeSlotPicker';
export type { TimeSlotPickerProps, TimeSlot } from './components/TimeSlotPicker';

export { AvailabilityCalendar } from './components/AvailabilityCalendar';
export type { AvailabilityCalendarProps, AvailabilityDay } from './components/AvailabilityCalendar';

// Group C — Travelers
export { TravelerSelector } from './components/TravelerSelector';
export type { TravelerSelectorProps } from './components/TravelerSelector';

export { GuestCounter } from './components/GuestCounter';
export type { GuestCounterProps } from './components/GuestCounter';

export { TravelerForm } from './components/TravelerForm';
export type { TravelerFormProps } from './components/TravelerForm';

export { TravelerCard } from './components/TravelerCard';
export type { TravelerCardProps } from './components/TravelerCard';

// Group D — Pricing
export { PriceBreakdown } from './components/PriceBreakdown';
export type { PriceBreakdownProps, PriceLine } from './components/PriceBreakdown';

export { PriceCard } from './components/PriceCard';
export type { PriceCardProps } from './components/PriceCard';

export { DiscountBadge } from './components/DiscountBadge';
export type { DiscountBadgeProps, DiscountType } from './components/DiscountBadge';

export { CouponInput } from './components/CouponInput';
export type { CouponInputProps } from './components/CouponInput';

export { TaxSummary } from './components/TaxSummary';
export type { TaxSummaryProps, TaxRow } from './components/TaxSummary';

// Group E — Checkout
export { CheckoutForm } from './components/CheckoutForm';
export type { CheckoutFormProps, CheckoutField } from './components/CheckoutForm';

export { PaymentMethodSelector } from './components/PaymentMethodSelector';
export type { PaymentMethodSelectorProps, PaymentOption } from './components/PaymentMethodSelector';

export { PaymentCard } from './components/PaymentCard';
export type { PaymentCardProps } from './components/PaymentCard';

export { InstallmentSelector } from './components/InstallmentSelector';
export type { InstallmentSelectorProps, InstallmentPlan } from './components/InstallmentSelector';

export { BillingAddress } from './components/BillingAddress';
export type { BillingAddressProps } from './components/BillingAddress';

// Group F — Confirmation
export { BookingConfirmation } from './components/BookingConfirmation';
export type { BookingConfirmationProps, BookingDetail } from './components/BookingConfirmation';

export { QRCodeCard } from './components/QRCodeCard';
export type { QRCodeCardProps } from './components/QRCodeCard';

export { BookingTicket } from './components/BookingTicket';
export type { BookingTicketProps, TicketPassenger } from './components/BookingTicket';

export { BookingReference } from './components/BookingReference';
export type { BookingReferenceProps } from './components/BookingReference';

export { ShareBooking } from './components/ShareBooking';
export type { ShareBookingProps } from './components/ShareBooking';

// Group G — Wallet & Rewards
export { WalletCard } from './components/WalletCard';
export type { WalletCardProps } from './components/WalletCard';

export { PointsCard } from './components/PointsCard';
export type { PointsCardProps, RewardTier } from './components/PointsCard';

export { RewardBadge } from './components/RewardBadge';
export type { RewardBadgeProps, RewardItem } from './components/RewardBadge';

export { ReferralCard } from './components/ReferralCard';
export type { ReferralCardProps } from './components/ReferralCard';
