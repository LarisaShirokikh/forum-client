export interface User {
  firstName: string;
  lastName: string;
  about: string;
  privacySettings: {};
  id: number;
  name: string;
  
  avatar?: string;
  cover?: string;
  surname?: string;
  email: string;
  password?: string;
  description?: string;
  city?: string;
  baby?: number;
  work?: string;
  website?: string;
  createdAt: Date;
  karma?: number;
  roles: ("Новичек" | "MODERATOR" | "ADMIN" | "SUPERADMIN" | "ORGANIZATOR")[];
  updatedAt: Date;
  reviews?: Review[];
  purchases?: Purchase[];
  topics?: Topic[];
  videos?: Video[];
  stories?: Story[];
  posts?: Post[];
  groups?: Group[];
  medalsReceived?: Medal[];
  followers?: Follower[];
  followings?: Follower[];
  comments?: Comment[];
  confirmationCodes?: ConfirmationCode[];
  likes?: Like[];
  products?: Product[];
  photos?: Photo[];
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
