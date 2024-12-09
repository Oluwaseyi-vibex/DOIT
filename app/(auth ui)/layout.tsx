import "../globals.css";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          className="bg-[#FF6767] w-full py-8 px-4 lg:py-16 lg:px-44 bg-center h-screen text-white flex items-center justify-center"
          style={{
            backgroundImage: `url('/bg.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
