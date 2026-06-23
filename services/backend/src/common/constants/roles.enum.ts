export enum UserRole {
  TRAVELER = 'traveler',
  AMBASSADOR = 'ambassador',
  PARTNER = 'partner',
  MARKETING = 'marketing',
  FINANCE = 'finance',
  CONTENT_ADMIN = 'content_admin',
  SUPER_ADMIN = 'super_admin',
}

export const RoleHierarchy: Record<UserRole, number> = {
  [UserRole.TRAVELER]: 10,
  [UserRole.AMBASSADOR]: 20,
  [UserRole.PARTNER]: 30,
  [UserRole.MARKETING]: 40,
  [UserRole.FINANCE]: 50,
  [UserRole.CONTENT_ADMIN]: 60,
  [UserRole.SUPER_ADMIN]: 99,
};

export const RoleInheritance: Record<UserRole, UserRole[]> = {
  [UserRole.TRAVELER]: [],
  [UserRole.AMBASSADOR]: [UserRole.TRAVELER],
  [UserRole.PARTNER]: [UserRole.TRAVELER],
  [UserRole.MARKETING]: [UserRole.AMBASSADOR, UserRole.TRAVELER],
  [UserRole.FINANCE]: [UserRole.PARTNER, UserRole.AMBASSADOR, UserRole.TRAVELER],
  [UserRole.CONTENT_ADMIN]: [UserRole.MARKETING, UserRole.AMBASSADOR, UserRole.TRAVELER],
  [UserRole.SUPER_ADMIN]: [
    UserRole.CONTENT_ADMIN,
    UserRole.MARKETING,
    UserRole.FINANCE,
    UserRole.PARTNER,
    UserRole.AMBASSADOR,
    UserRole.TRAVELER,
  ],
};
