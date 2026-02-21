import { createContext, useContext, useState, ReactNode } from "react";
import { CreatorProfile, defaultProfile, PageLanguageMode } from "@/components/profile/types";

interface ProfileContextType {
  profile: CreatorProfile;
  updateProfile: (updates: Partial<CreatorProfile>) => void;
  setPageLanguage: (mode: PageLanguageMode) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<CreatorProfile>(defaultProfile);

  const updateProfile = (updates: Partial<CreatorProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const setPageLanguage = (mode: PageLanguageMode) => {
    setProfile((prev) => ({ ...prev, pageLanguage: mode }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, setPageLanguage }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
