"use client";
// src/components/RealTimeDate.tsx
import React, { useState, useEffect } from "react";

const RealTimeDate: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup on component unmount
  }, []);

  const formatDay = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-medium text-black text-[15px]">
        {formatDay(currentDate)}
      </p>
      <p className="text-[#3ABEFF] text-[14px] font-medium">
        {formatDate(currentDate)}
      </p>
    </div>
  );
};

export default RealTimeDate;
