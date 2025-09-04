
'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { User, Profile } from '@/lib/types';

interface UserContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, value }: { children: ReactNode; value: UserContextType }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
