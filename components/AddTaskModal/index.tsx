import { montserrat } from "@/utils/fonts/font";
export default function AddTaskModal() {
  return (
    <dialog id="my_modal_1" className="modal ">
      <div
        className={` modal-box rounded-none max-h-full h-[90%] flex flex-col justify-between max-w-[70%] p-12 bg-white  `}
      >
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <h1
              className={`${montserrat.className} text-black tracking-wider text-base font-semibold`}
            >
              Add New Task
            </h1>
            <span className="bg-[#F24E1E] w-[50px] h-[3px]"></span>
          </div>

          <div
            onClick={() => {
              const modal1 = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement | null;
              modal1?.close();
            }}
            className="text-black cursor-pointer tracking-wide font-semibold underline text-sm"
          >
            Go back
          </div>
        </div>

        <form className="w-full h-[78%] gap-4 flex flex-col items-start p-4 border border-[#A1A3AB] shadow-sm">
          <div className="flex gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-[511px] bg-white max-w-full border-[#A1A3AB] h-[37px] p-2"
            />
          </div>

          <div className="flex gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="Date"
            >
              Date
            </label>
            <input
              type="date"
              placeholder=""
              className="input input-bordered w-[511px] bg-white max-w-full border-[#A1A3AB] h-[37px] p-2"
            />
          </div>

          <div className="flex gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="Date"
            >
              Priority
            </label>
            <div className="flex gap-10">
              <div className="flex items-center gap-2">
                <span className="bg-[#F21E1E] w-[7px] h-[7px] rounded-full"></span>
                <p className="text-[13px]">Extreme</p>
                <input
                  type="checkbox"
                  className="checkbox rounded-none border-[#A1A3AB] w-[15px] h-[15px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-[#3ABEFF] w-[7px] h-[7px] rounded-full"></span>
                <p className="text-[13px]">Moderate</p>
                <input
                  type="checkbox"
                  className="checkbox rounded-none bg-white border border-[#A1A3AB] w-[15px] h-[15px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-[#05A301] w-[7px] h-[7px] rounded-full"></span>
                <p className="text-[13px]">Low</p>
                <input
                  type="checkbox"
                  className="checkbox rounded-none bg-white border border-[#A1A3AB] w-[15px] h-[15px]"
                />
              </div>
            </div>
          </div>

          <div className="flex h-full gap-2 flex-col">
            <label
              className="text-sm font-semibold text-black tracking-wider"
              htmlFor="Date"
            >
              Task Description
            </label>
            <textarea
              className="textarea textarea-bordered bg-white w-[511px] h-full border-[#A1A3AB] "
              placeholder=""
            ></textarea>
          </div>
        </form>
        <button className="py-2 px-4 bg-[#F24E1E] text-white">Done</button>
      </div>
    </dialog>
  );
}
