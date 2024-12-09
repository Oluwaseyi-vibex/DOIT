import React, { Suspense } from "react";
import { inter } from "@/utils/fonts/font";
import { DashboardServerWrapper } from "@/components";

// import { options } from "../api/auth/[...nextauth]/options";
// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(options);
  // if (!session) {
  //   redirect("api/auth/signin?callbackUrl=/server");
  // }

  return (
    <main
      className={`${inter.className} w-full h-screen flex flex-col items-center justify-center`}
      style={{
        backgroundImage: `url('/dashboardBg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <DashboardServerWrapper>
        <Suspense>{children}</Suspense>
      </DashboardServerWrapper>
    </main>
  );
}
