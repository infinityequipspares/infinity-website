'use client'; // Yeh zaroori hai kyunki hum browser hooks use kar rahe hain

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Jab bhi 'pathname' (URL) change hoga, scroll upar chala jayega
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
