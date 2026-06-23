// ============================================================
// مصر هب - الأنواع المشتركة (Shared Types)
// ============================================================

// ---- الأدوار ----
export enum UserRole {
  USER = 'user',
  PARTNER = 'partner',
  AMBASSADOR = 'ambassador',
  ADMIN = 'admin',
}

// ---- حالات ----
export enum BusinessStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum OfferStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  PAUSED = 'paused',
}

// ---- المستخدم ----
export interface IUser {
  id: string;
  phone: string;
  name: string;
  email?: string;
  role: UserRole;
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface IUserPublic extends Omit<IUser, 'email' | 'isVerified'> {}

// ---- المدينة ----
export interface ICity {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  descriptionAr?: string;
  descriptionEn?: string;
  imageUrl?: string;
  isActive: boolean;
}

// ---- التصنيف ----
export interface ICategory {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  icon: string;
  parentId?: string;
  sortOrder: number;
}

// ---- المنشأة ----
export interface IBusiness {
  id: string;
  ownerId: string;
  cityId: string;
  nameAr: string;
  nameEn?: string;
  descriptionAr: string;
  descriptionEn?: string;
  slug: string;
  phone?: string;
  whatsapp?: string;
  addressAr?: string;
  addressEn?: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  coverImage?: string;
  status: BusinessStatus;
  commissionRate: number;
  isFeatured: boolean;
  categories?: ICategory[];
  city?: ICity;
  workingHours?: Record<string, { open: string; close: string }>;
  createdAt: string;
}

// ---- العرض ----
export interface IOffer {
  id: string;
  businessId: string;
  titleAr: string;
  titleEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  originalPrice: number;
  offerPrice: number;
  currency: string;
  validFrom: string;
  validUntil: string;
  maxBookings: number;
  currentBookings: number;
  isActive: boolean;
  imageUrl?: string;
  business?: IBusiness;
}

// ---- الحجز ----
export interface IBooking {
  id: string;
  userId: string;
  businessId: string;
  offerId?: string;
  ambassadorId?: string;
  bookingCode: string;
  status: BookingStatus;
  totalAmount: number;
  commissionAmount: number;
  guestCount: number;
  bookingDate: string;
  bookingTime?: string;
  notes?: string;
  qrCode?: string;
  business?: IBusiness;
  user?: IUserPublic;
  createdAt: string;
}

// ---- السفير ----
export interface IAmbassador {
  id: string;
  userId: string;
  referralCode: string;
  bioAr?: string;
  bioEn?: string;
  cityId?: string;
  isApproved: boolean;
  totalEarnings: number;
  availableBalance: number;
  commissionRate: number;
  user?: IUserPublic;
  city?: ICity;
}

// ---- أرباح السفير ----
export interface IAmbassadorEarning {
  id: string;
  ambassadorId: string;
  bookingId?: string;
  amount: number;
  status: string;
  descriptionAr?: string;
  createdAt: string;
}

// ---- التقييم ----
export interface IReview {
  id: string;
  userId: string;
  businessId: string;
  bookingId?: string;
  rating: number;
  commentAr?: string;
  user?: IUserPublic;
  createdAt: string;
}

// ---- الـ API Response ----
export interface IApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ---- JWT Payload ----
export interface IJwtPayload {
  sub: string;
  phone: string;
  role: UserRole;
  name: string;
}

// ---- OTP ----
export interface IOtpRequest {
  phone: string;
}

export interface IOtpVerify {
  phone: string;
  code: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
