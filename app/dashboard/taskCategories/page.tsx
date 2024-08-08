import Image from "next/image";
import { montserrat } from "@/utils/fonts/font";
import { Table } from "@/components";

export default function TaskCategories() {
  return (
    <main className="w-full h-full flex flex-col justify-end  ">
      <div className="w-full h-[95%] gap-6 py-7 px-16 ">
        <div className="w-full flex flex-col gap-6 rounded-2xl  p-6 h-full border border-[#A1A3AB] shadow-[#A1A3AB] shadow-sm">
          <div className="flex w-full flex-col gap-5">
            <div className="w-full flex justify-between">
              <div className="flex flex-col">
                <h1
                  className={`${montserrat.className} text-black text-xl font-semibold`}
                >
                  Task Categories
                </h1>
                <span className="bg-[#F24E1E] w-[50px] h-[3px]"></span>
              </div>

              <div className="text-black font-semibold underline text-sm">
                Go back
              </div>
            </div>
            <button className="py-2 w-fit text-sm rounded-md items-center px-5 bg-[#F24E1E] text-white">
              Add Category
            </button>
          </div>

          <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full flex justify-between">
              <div className="flex flex-col">
                <h1
                  className={`${montserrat.className} text-black text-[15px] font-semibold`}
                >
                  Task Status
                </h1>
                <span className="bg-[#F24E1E] w-[50px] h-[3px]"></span>
              </div>

              <div className="flex cursor-pointer items-center justify-center w-fit gap-2">
                <Image src={"/add.png"} alt="" width={14} height={14} />
                <p className="text-[#A1A3AB] text-[12px]">Add Task Status</p>
              </div>
            </div>

            <div className="w-full border border-[#A1A3AB] shadow-md rounded-xl h-fit p-3 ">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
