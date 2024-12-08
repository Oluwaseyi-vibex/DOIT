import React, { useState } from "react";
import { inter } from "@/utils/fonts/font";
import Image from "next/image";

import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import DashboardNavSection from "@/components/dashboardNavSection";
import RealTimeDate from "@/components/RealTimeDate";
import { DashboardServerWrapper, SessionProviderWrapper } from "@/components";
import { IconBrandMantine, IconMenu2 } from "@tabler/icons-react";

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
      <DashboardServerWrapper>{children}</DashboardServerWrapper>
    </main>
  );
}
