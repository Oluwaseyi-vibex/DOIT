import Image from "next/image";
export default function CompletedTaskCard() {
  return (
    <div className="w-full flex  gap-8 justify-center items-center rounded-2xl p-5 border h-[134px]">
      <span className="w-[15px] h-[15px] outline outline-2 outline-[#05A301] rounded-full bg-[#white] flex items-center justify-center"></span>

      <div className="w-[332px] h-full flex flex-col gap-2 justify-between">
        <h1 className="text-black font-bold text-sm">Walk the dog</h1>

        <p className="text-[#747474] text-[10px]">
          Take the dog to the park and bring treats as well.
        </p>

        <div className="flex flex-col gap-2 text-[10px]">
          <p className="text-black">
            Status: <span className="text-[#05A301]"> Completed</span>
          </p>

          <p className="text-[#747474]">Completed 2 days ago.</p>
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
}
