"use client";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919167867476?text=Hello%20Infinity%20Equipments%20And%20Spares,%20I%20need%20assistance."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-9 w-9 fill-white"
      >
        <path d="M16.02 3.2C8.94 3.2 3.2 8.94 3.2 16c0 2.26.6 4.47 1.73 6.42L3 29l6.78-1.78A12.75 12.75 0 0 0 16.02 28.8C23.08 28.8 28.8 23.06 28.8 16S23.08 3.2 16.02 3.2Zm0 23.2c-1.94 0-3.83-.52-5.49-1.5l-.39-.23-4.02 1.05 1.07-3.92-.25-.4A10.3 10.3 0 1 1 16.02 26.4Zm5.64-7.73c-.31-.16-1.83-.9-2.11-1-.28-.1-.48-.16-.68.16-.2.31-.78 1-.95 1.2-.18.2-.35.23-.66.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.64.13-.13.31-.35.47-.53.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.68-1.64-.94-2.25-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.52.08-.79.39-.28.31-1.05 1.03-1.05 2.5s1.08 2.9 1.24 3.1c.16.2 2.12 3.24 5.14 4.54.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.83-.75 2.09-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.58-.36Z" />
      </svg>
    </a>
  );
}