import React from "react";
import Image from "next/image";
const PendingTaskCard = () => {
  return (
    <div className="w-full flex  gap-8 justify-center items-center rounded-2xl p-2 border h-[116px]">
      <span className="w-[15px] h-[15px] outline outline-2 outline-[#0225FF] rounded-full bg-[#white] flex items-center justify-center"></span>

      <div className="w-[332px] h-full flex flex-col gap-2 justify-between">
        <h1 className="text-black font-bold text-sm">
          Attend Nischal’s Birthday Party
        </h1>

        <p className="text-[#747474] text-[10px]">
          Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh
          Elements).....
        </p>

        <div className="flex justify-between text-[10px] items-center">
          <p className="text-black">
            Priority: <span className="text-[#42ADE2]"> Moderate</span>
          </p>
          <p className="text-black">
            Status: <span className="text-[#0225FF]"> In Progress</span>
          </p>

          <p className="text-[10px] text-[#A1A3AB] ">Created on: 20/06/2023</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-col justify-evenly">
        <div className="flex cursor-pointer w-fit h-fit gap-2">
          <span className="w-[3px] h-[3px] outline outline-2 outline-[#A1A3AB] rounded-full bg-[#white] flex items-center justify-center"></span>
          <span className="w-[3px] h-[3px] outline outline-2 outline-[#A1A3AB] rounded-full bg-[#white] flex items-center justify-center"></span>
          <span className="w-[3px] h-[3px] outline outline-2 outline-[#A1A3AB] rounded-full bg-[#white] flex items-center justify-center"></span>
        </div>

        <Image src={"/edit.png"} alt="" width={25} height={25} />
        <Image src={"/delete.png"} alt="" width={30} height={30} />
      </div>
    </div>
  );
};

export default PendingTaskCard;
