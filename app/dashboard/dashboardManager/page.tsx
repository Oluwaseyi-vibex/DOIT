"use client";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { ToDoTaskCard, AddTaskModal } from "@/components";
import { CustomScroll } from "react-custom-scroll";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectTodos } from "@/services/TodoServices";
import { useSearchParams } from "next/navigation";

import { observer } from "mobx-react-lite";
import projectStore from "@/mobx/ProjectStore";

function DashboardManager() {
  // const [statusFilter, setStatusFilter] = useState<string>(""); // "" means show all tasks

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup on component unmount
  }, []);
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const name = searchParams.get("name") as string;
  const pId = searchParams.get("id") as string;
  projectStore.setTestId(pId);

  // console.log(pId);

  const [hasRun, setHasRun] = useState(false); // State to track if the query has already run

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["todos", pId],
    queryFn: () => fetchProjectTodos(pId as string),
    // enabled: !!pId && !hasRun, // Run only if id exists and the query hasn't run before
    // retry: false,
    refetchInterval: 5000,
  });

  const myTodos = data && data.data ? data.data : [];

  // Define a filter status: 'completed', 'incomplete', or 'all'
  const [filterStatus, setFilterStatus] = useState("completed");

  // Apply the filter to the `myTodos` array
  const filteredTodos = (Array.isArray(myTodos) ? myTodos : []).filter(
    (todo: any) => {
      if (filterStatus === "completed") return todo.completed;
      if (filterStatus === "incomplete") return !todo.completed;
      return true;
    }
  );

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <main className="w-full h-full flex flex-col justify-end  ">
      <div className="w-full h-[93%] flex flex-col items-center gap-6 px-2 lg:px-6 ">
        <div className="flex justify-between lg:px-0 px-2 w-full">
          <div className="w-full h-fit flex items-center gap-3">
            <h1 className="font-semibold text-4xl text-black">
              Welcome back, {session?.user.name}
            </h1>
            <Image src={"/handwave.png"} alt="" width={42.42} height={41} />
          </div>
        </div>
        <div className="w-full py-4 space-y-8 lg:space-y-0 lg:py-0 border overflow-x-auto lg:shadow-[#A1A3AB] lg:gap-8 flex lg:flex-row flex-col items-start justify-between lg:h-[85%] lg:shadow-sm lg:p-4 ">
          <div className="lg:w-[40%] w-full h-fit lg:p-4 border lg:shadow-lg border-none">
            <div className="flex px-4 justify-between">
              <div className="flex w-fit items-start justify-center">
                <Image src={"/Pending.png"} alt="" width={30} height={39} />
                <p className="text-[#FF6767] font-semibold text-lg">To-Do</p>
              </div>

              <div
                onClick={() => {
                  const modal1 = document.getElementById(
                    "my_modal_1"
                  ) as HTMLDialogElement | null;
                  modal1?.showModal();
                }}
                className="flex cursor-pointer items-center justify-center w-fit gap-2"
              >
                <Image src={"/add.png"} alt="" width={14} height={14} />
                <p className="text-[#A1A3AB] text-[15px]">Add task</p>
              </div>
            </div>
            <AddTaskModal />

            <div className="my-2 px-4 text-black text-sm">
              {formatDate(currentDate)}
            </div>
            <div className="w-full  ">
              <CustomScroll heightRelativeToParent="100%">
                {/* <div className="w-[352px] h-[385px] p-3"> */}
                {isLoading ? (
                  <div className="lg:w-[380px] h-[385px] flex flex-col items-center text-black text-lg justify-center">
                    <span className="loading loading-bars loading-lg"></span>{" "}
                  </div>
                ) : (
                  <div className="flex flex-col lg:w-[380px] lg:h-[385px] p-3 gap-4">
                    {Array.isArray(myTodos) && myTodos.length > 0 ? (
                      myTodos.map((todo: any) => (
                        <ToDoTaskCard
                          key={todo.id}
                          id={todo.id}
                          name={todo.title}
                          descrip={todo.description}
                          priority={todo.priority}
                          status={todo.status}
                          date={todo.expiresAt}
                          completed={todo.completed}
                          EditTodo={todo}
                          todoId={todo.id}
                        />
                      ))
                    ) : (
                      <p className="text-lg text-error font-medium">
                        No tasks available!
                      </p>
                    )}
                  </div>
                )}
                {/* </div> */}
              </CustomScroll>
            </div>
          </div>

          <div className="lg:w-[40%] w-full h-fit lg:p-4 border lg:gap-10 flex flex-col  lg:shadow-lg border-none">
            <div className="flex w-fit items-center p-4 lg:px-0 gap-4 justify-center">
              <Image src={"/Book.png"} alt="" width={18} height={18} />
              <p className="text-[#0225FF] font-semibold text-lg">
                Pending Task
              </p>
            </div>
            <CustomScroll heightRelativeToParent="100%">
              <div className="flex flex-col lg:h-[385px] p-3 gap-4">
                {isLoading ? (
                  <div className="lg:w-[380px] w-full h-[385px] flex flex-col items-center text-black text-lg justify-center">
                    <span className="loading loading-bars loading-lg"></span>{" "}
                  </div>
                ) : (
                  <div className="flex flex-col lg:w-[380px] w-full lg:h-[385px] lg:p-3 gap-4">
                    {Array.isArray(myTodos) && myTodos.length > 0 ? (
                      myTodos
                        .filter((todo: any) => todo.completed === false)
                        .map((todo: any) => (
                          <ToDoTaskCard
                            key={todo.id}
                            id={todo.id}
                            name={todo.title}
                            descrip={todo.description}
                            priority={todo.priority}
                            status={todo.status}
                            date={todo.expiresAt}
                            completed={todo.completed}
                            EditTodo={todo}
                            todoId={todo.id}
                          />
                        ))
                    ) : (
                      <p className="text-lg text-error font-medium">
                        No tasks available!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CustomScroll>
          </div>

          <div className="lg:w-[40%] w-full h-fit lg:p-4 border-2 border-black lg:gap-10 flex flex-col  lg:shadow-lg border-none">
            <div className="flex w-fit items-center px-4 lg:px-0 gap-3 justify-center">
              <Image src={"/Book.png"} alt="" width={18} height={18} />
              <p className="text-[#FF6767] font-semibold text-lg">
                Completed Task
              </p>
            </div>

            <CustomScroll heightRelativeToParent="100%">
              {isLoading ? (
                <div className="lg:w-[380px] lg:h-[385px] flex flex-col items-center text-black text-lg justify-center">
                  <span className="loading loading-bars loading-lg"></span>{" "}
                </div>
              ) : (
                <div className="flex flex-col lg:w-[380px] lg:h-[385px] p-3 gap-4">
                  {" "}
                  {/* Render tasks based on filteredTodos */}
                  {Array.isArray(filteredTodos) && filteredTodos.length > 0 ? (
                    filteredTodos.map((todo: any) => (
                      <ToDoTaskCard
                        key={todo.id}
                        id={todo.id}
                        name={todo.title}
                        descrip={todo.description}
                        priority={todo.priority}
                        status={todo.status}
                        date={todo.expiresAt}
                        EditTodo={todo}
                        completed={todo.completed}
                        todoId={todo.id}
                      />
                    ))
                  ) : (
                    <p className="text-lg text-error font-medium">
                      No tasks available!
                    </p>
                  )}
                </div>
              )}
            </CustomScroll>
          </div>
        </div>
      </div>
    </main>
    // </Suspense>
  );
}

export default observer(DashboardManager);

// "use client";

// import Image from "next/image";
// import { useState, useEffect, Suspense } from "react";
// import { ToDoTaskCard } from "@/components";
// import { CustomScroll } from "react-custom-scroll";
// import { useSession } from "next-auth/react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchProjectTodos } from "@/services/TodoServices";
// import { useSearchParams } from "next/navigation";
// import { observer } from "mobx-react-lite";
// import projectStore from "@/mobx/ProjectStore";

// const DashboardManager = observer(() => {
//   const [statusFilter, setStatusFilter] = useState<string>(""); // "" means show all tasks
//   const [currentDate, setCurrentDate] = useState<Date>(new Date());

//   // Set up a timer to update the current date
//   useEffect(() => {
//     const timerId = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 1000); // Update every second

//     return () => clearInterval(timerId); // Cleanup on component unmount
//   }, []);

//   const formatDate = (date: Date) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     return date.toLocaleDateString("en-US", options);
//   };

//   // Use NextAuth to get the session
//   const { data: session } = useSession();

//   // Get search params (encapsulated in a separate Client Component)
//   const ParamsHandler = () => {
//     const searchParams = useSearchParams();
//     const name = searchParams.get("name") as string;
//     const pId = searchParams.get("id") as string;

//     // Set the project ID in MobX store
//     projectStore.setTestId(pId);

//     return { name, pId };
//   };

//   const { name, pId } = ParamsHandler();

//   // React Query to fetch todos
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["todos", pId],
//     queryFn: () => fetchProjectTodos(pId as string),
//     refetchInterval: 5000, // Refetch data every 5 seconds
//   });

//   const myTodos = data && data.data ? data.data : [];

//   // Filter todos by status
//   const filteredTodos = (Array.isArray(myTodos) ? myTodos : []).filter(
//     (todo: any) => {
//       if (statusFilter === "completed") return todo.completed;
//       if (statusFilter === "incomplete") return !todo.completed;
//       return true;
//     }
//   );

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <main className="w-full h-full flex flex-col justify-end">
//         <div className="w-full h-[93%] flex flex-col items-center gap-6 px-2 lg:px-6">
//           <div className="flex justify-between lg:px-0 px-2 w-full">
//             <div className="w-full h-fit flex items-center gap-3">
//               <h1 className="font-semibold text-4xl text-black">
//                 Welcome back, {session?.user.name}
//               </h1>
//               <Image src={"/handwave.png"} alt="" width={42.42} height={41} />
//             </div>
//           </div>
//           <div className="w-full py-4 space-y-8 lg:space-y-0 lg:py-0 border overflow-x-auto lg:shadow-[#A1A3AB] lg:gap-8 flex lg:flex-row flex-col items-start justify-between lg:h-[85%] lg:shadow-sm lg:p-4">
//             {/* To-Do Task Section */}
//             <TaskSection
//               title="To-Do"
//               imageSrc="/Pending.png"
//               tasks={myTodos}
//               isLoading={isLoading}
//               filter={(todo: any) => true} // Show all todos
//               currentDate={currentDate}
//               formatDate={formatDate}
//             />

//             {/* Pending Task Section */}
//             <TaskSection
//               title="Pending Task"
//               imageSrc="/Book.png"
//               tasks={myTodos}
//               isLoading={isLoading}
//               filter={(todo: any) => !todo.completed} // Show incomplete todos
//             />

//             {/* Completed Task Section */}
//             <TaskSection
//               title="Completed Task"
//               imageSrc="/Book.png"
//               tasks={filteredTodos}
//               isLoading={isLoading}
//               filter={(todo: any) => todo.completed} // Show completed todos
//             />
//           </div>
//         </div>
//       </main>
//     </Suspense>
//   );
// });

// const TaskSection = ({
//   title,
//   imageSrc,
//   tasks,
//   isLoading,
//   filter,
//   currentDate,
//   formatDate,
// }: any) => {
//   const filteredTasks = tasks.filter(filter);

//   return (
//     <div className="lg:w-[40%] w-full h-fit lg:p-4 border lg:shadow-lg border-none">
//       <div className="flex px-4 justify-between">
//         <div className="flex w-fit items-start justify-center">
//           <Image src={imageSrc} alt="" width={30} height={39} />
//           <p className="text-[#FF6767] font-semibold text-lg">{title}</p>
//         </div>
//       </div>
//       <div className="my-2 px-4 text-black text-sm">
//         {formatDate ? formatDate(currentDate) : null}
//       </div>
//       <div className="w-full">
//         <CustomScroll heightRelativeToParent="100%">
//           {isLoading ? <LoadingSpinner /> : <TaskList tasks={filteredTasks} />}
//         </CustomScroll>
//       </div>
//     </div>
//   );
// };

// const LoadingSpinner = () => (
//   <div className="lg:w-[380px] h-[385px] flex flex-col items-center text-black text-lg justify-center">
//     <span className="loading loading-bars loading-lg"></span>
//   </div>
// );

// const TaskList = ({ tasks }: { tasks: any[] }) => (
//   <div className="flex flex-col lg:w-[380px] lg:h-[385px] p-3 gap-4">
//     {tasks.length > 0 ? (
//       tasks.map((todo: any) => (
//         <ToDoTaskCard
//           key={todo.id}
//           id={todo.id}
//           name={todo.title}
//           descrip={todo.description}
//           priority={todo.priority}
//           status={todo.status}
//           date={todo.expiresAt}
//           completed={todo.completed}
//           EditTodo={todo}
//           todoId={todo.id}
//         />
//       ))
//     ) : (
//       <p className="text-lg text-error font-medium">No tasks available!</p>
//     )}
//   </div>
// );

// export default DashboardManager;
