import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main
          className="bg-[#FF6767] w-full py-16 px-44 bg-center h-screen text-white flex items-center justify-center"
          style={{
            backgroundImage: `url('/bg.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
