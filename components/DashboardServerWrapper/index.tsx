"use client";
import React, { ReactNode } from "react";
import DashboardNavSection from "../dashboardNavSection";
import SessionProviderWrapper from "../SessionProviderWrapper";
import Image from "next/image";
import { Drawer } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import RealTimeDate from "../RealTimeDate";
import { inter } from "@/utils/fonts/font";
import { useDisclosure } from "@mantine/hooks";

const DashboardServerWrapper = ({ children }: { children: ReactNode }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="w-full flex flex-col h-full  ">
      <nav className="w-full relative z-10 h-[80px] flex items-center shadow-lg justify-between px-4 lg:px-[52px] py-[37px] bg-[#F8F8F8]">
        <h1
          className={`${inter.className} text-[24px] lg:text-[36px] font-semibold`}
        >
          <span className="text-[#FF6767]">Dash</span>
          <span className="text-black">board</span>
        </h1>

        <div className="flex gap-8 items-center">
          <div>
            <RealTimeDate />
          </div>
          <IconMenu2
            onClick={open}
            color="black"
            size={"30px"}
            className="lg:hidden flex"
          />
        </div>
      </nav>

      <div className="bg-white relative gap-8 z-0 h-full w-full flex items-end justify-between">
        {/* {isToggle && ( */}

        <Drawer
          opened={opened}
          onClose={close}
          size={"xs"}
          withCloseButton={false}
          transitionProps={{
            transition: "rotate-left",
            duration: 150,
            timingFunction: "linear",
          }}
        >
          {/* Drawer content */}

          <Drawer.Content>
            <Drawer.Body className="h-full flex  z-50 flex-col justify-end items-center">
              <DashboardNavSection />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>
        <div className="h-full hidden lg:flex z-50 flex-col justify-end items-center">
          <Image
            src={"/avatar.png"}
            alt=""
            width={86}
            height={56}
            className="hidden lg:flex"
          />
          <DashboardNavSection />
        </div>
        {/* )} */}
        <div className="w-full overflow-hidden  h-full">
          <SessionProviderWrapper>{children} </SessionProviderWrapper>
        </div>
      </div>
    </div>
  );
};

export default DashboardServerWrapper;
