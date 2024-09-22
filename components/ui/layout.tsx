import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/background.jpg')",
      }}
    >
      {/* Dimming overlay */}
      <div className="absolute inset-0 bg-black opacity-5"></div>

      {/* Scrollable content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
