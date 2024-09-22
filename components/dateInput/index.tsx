import React, { useState, ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import projectStore from "@/mobx/ProjectStore";

const DateInputComponent: React.FC = () => {
  // const [inputDate, setInputDate] = useState<string>("");

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    // setInputDate(dateValue);
    const currentDate = new Date(dateValue);
    console.log(currentDate);
    projectStore.project.expiresAt = currentDate.toISOString();
    console.log(projectStore.project.expiresAt);
  };

  return (
    <div>
      <label>
        <input type="datetime-local" onChange={handleDateChange} />
      </label>
    </div>
  );
};

export default observer(DateInputComponent);
