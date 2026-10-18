"use client";

import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-[fadeInUp_0.8s_ease-out_forwards]">
      {children}
    </div>
  );
}
