import React from "react";
import Image from "next/image";
const Table: React.FC = () => {
  return (
    <table className="table-auto  w-full border-collapse">
      <thead className="">
        <tr className="text-black  text-[15px] tracking-wider">
          <th className="px-4 py-2 rounded-t-xl border border-gray-300">SN</th>
          <th className="px-4 py-2 border border-gray-300">Task Status</th>
          <th className="px-4 py-2 border border-gray-300">Action</th>
        </tr>
      </thead>
      <tbody className="text-black text-center">
        <tr className="text-black text-[15px]">
          <td className="px-4 py-2 ">1</td>
          <td className="px-4 py-2 ">Completed</td>
          <td className="px-4 py-3 flex items-center w-full gap-4 justify-center ">
            <div className="flex w-fit cursor-pointer rounded-md items-center bg-[#F24E1E] p-2 gap-2 text-sm">
              <Image src={"/edit2.png"} alt="" width={16} height={16} />
              <p className="text-white">Edit</p>
            </div>

            <div className="flex w-fit cursor-pointer rounded-md items-center bg-[#F24E1E] p-2 gap-2 text-sm">
              <Image src={"/delete2.png"} alt="" width={16} height={16} />
              <p className="text-white">Delete</p>
            </div>
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 ">2</td>
          <td className="px-4 py-2 ">In Progress</td>
          <td className="px-4 py-3 flex items-center w-full gap-4 justify-center ">
            <div className="flex w-fit cursor-pointer rounded-md items-center bg-[#F24E1E] p-2 gap-2 text-sm">
              <Image src={"/edit2.png"} alt="" width={16} height={16} />
              <p className="text-white">Edit</p>
            </div>

            <div className="flex w-fit cursor-pointer rounded-md items-center bg-[#F24E1E] p-2 gap-2 text-sm">
              <Image src={"/delete2.png"} alt="" width={16} height={16} />
              <p className="text-white">Delete</p>
            </div>
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 ">3</td>
          <td className="px-4 py-2 ">Not Started</td>
          <td className="px-4 py-3 flex items-center w-full gap-4 justify-center ">
            <div className="flex w-fit cursor-pointer rounded-md items-center bg-[#F24E1E] p-2 gap-2 text-sm">
              <Image src={"/edit2.png"} alt="" width={16} height={16} />
              <p className="text-white">Edit</p>
            </div>

            <div className="flex w-fit cursor-pointer rounded-md items-center bg-[#F24E1E] p-2 gap-2 text-sm">
              <Image src={"/delete2.png"} alt="" width={16} height={16} />
              <p className="text-white">Delete</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
