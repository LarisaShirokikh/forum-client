export interface UserProfile {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  about: string;
  privacySettings: Record<string, any>;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  karma: number;
  lastSeen: string;
  topicsCount: number;
  commentsCount: number;
  telegramMessagesCount: number;
  eventsCount: number;
  coverUrl: string;
  surname: string;
  description: string;
  work: string;
  website: string;
  roles: string[];
}
