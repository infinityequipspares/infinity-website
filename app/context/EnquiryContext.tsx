"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface EnquiryItem {
  id: string;
  partNumber: string;
  name: string;
  category?: string;
  image?: string;
  quantity: number;
}

interface EnquiryContextType {
  items: EnquiryItem[];
  addToEnquiry: (item: Omit<EnquiryItem, "quantity">) => void;
  removeFromEnquiry: (id: string) => void;
  clearEnquiry: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("infinity_enquiry_cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse enquiry cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("infinity_enquiry_cart", JSON.stringify(items));
  }, [items]);

  const addToEnquiry = (product: Omit<EnquiryItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.partNumber === product.partNumber);
      if (existing) {
        return prev.map((item) =>
          item.partNumber === product.partNumber
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromEnquiry = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id && item.partNumber !== id));
  };

  const clearEnquiry = () => {
    setItems([]);
  };

  return (
    <EnquiryContext.Provider
      value={{
        items,
        addToEnquiry,
        removeFromEnquiry,
        clearEnquiry,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}
