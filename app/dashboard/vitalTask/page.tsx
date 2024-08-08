import { montserrat } from "@/utils/fonts/font";
import { ToDoTaskCard, PendingTaskCard } from "@/components";
import Image from "next/image";
export default function VitalTask() {
  return (
    <main className="w-full h-full flex flex-col justify-end  ">
      <div className="w-full h-[93%] flex justify-between items-center gap-6  p-6 ">
        <div className="w-[50%] rounded-2xl  p-6 h-full border border-[#A1A3AB] shadow-[#A1A3AB] shadow-sm">
          <div className="flex flex-col">
            <h1
              className={`${montserrat.className} text-black text-xl font-semibold`}
            >
              Vital Tasks
            </h1>
            <span className="bg-[#F24E1E] w-[50px] h-[3px]"></span>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <ToDoTaskCard />
            <PendingTaskCard />
          </div>
        </div>
        <div className="w-[50%] px-6 py-12 border border-[#A1A3AB] shadow-[#A1A3AB] shadow-sm rounded-2xl h-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-xl font-semibold tracking-wide">
              Walk the dog
            </h1>
            <p className="text-black font-medium text-[12px]">
              Priority: <span className="text-[#F21E1E]"> Extreme</span>
            </p>
            <p className="text-black font-medium text-[12px]">
              Status: <span className="text-[#F21E1E]"> Not Started</span>
            </p>
            <p className="text-[10px] text-[#A1A3AB] ">
              Created on: 20/06/2023
            </p>
          </div>

          <div className="text-base my-6 text-[#747474] w-full">
            Take Luffy and Jiro for a leisurely stroll around the neighborhood.
            Enjoy the fresh air and give them the exercise and mental
            stimulation they need for a happy and healthy day. Don&apos;t forget
            to bring along squeaky and fluffy for some extra fun along the way!
          </div>

          <ul className=" list-decimal text-[#747474] px-4 ">
            <li>Listen to a podcast or audiobook</li>
            <li>Practice mindfulness or meditation</li>
            <li>Take photos of interesting sights along the way</li>
            <li>Practice obedience training with your dog</li>
            <li>Chat with neighbors or other dog walkers</li>
            <li>Listen to music or an upbeat playlist</li>
          </ul>

          <div className="flex w-full h-fit justify-end items-end mt-8 gap-3">
            <div className="w-[36px] h-[36px] rounded-lg bg-[#FF6767] flex items-center justify-center">
              <Image src={"/delete2.png"} width={15} height={15} alt="" />
            </div>
            <div className="w-[36px] h-[36px] rounded-lg bg-[#FF6767] flex items-center justify-center">
              <Image src={"/edit2.png"} width={15} height={15} alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
