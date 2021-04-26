export enum LocalStorageKey {
  Culture = 'culture',
  AuthToken = 'auth-token',
  RecentSearches = 'recent-searches',
  ApiErrors = 'api-errors',
  Rare = 'rare',
  Preferences = 'preferences',
}

export enum LocalStorageExpiration {
  VeryShort = 30,
  Short = 60,
  Normal = 60 * 5,
  Long = 60 * 60,
  VeryLong = 60 * 60 * 24,
  Week = 60 * 60 * 24 * 7,
  Infinite = 60 * 60 * 24 * 365 * 50,
}
