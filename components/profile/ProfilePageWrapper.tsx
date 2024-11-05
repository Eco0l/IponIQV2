// src/components/profile/ProfilePageWrapper.tsx
import { ReactNode } from "react";

export const ProfilePageWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center gap-6 p-6 bg-neutral-100 min-h-screen">
    {children}
  </div>
);
