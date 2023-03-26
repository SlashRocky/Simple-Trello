import React from "react";
import { v4 as uuid } from "uuid";

export const AddTaskCardButton = ({ taskCardsList, setTaskCardsList }) => {
  const taskCardId = uuid();

  const addTaskCard = () => {
    //タスクカードを追加する処理
    setTaskCardsList([
      ...taskCardsList,
      {
        id: taskCardId,
        draggableId: `item-${taskCardId}`,
      },
    ]);
  };

  return (
    <div className="addTaskCardButtonArea">
      <button className="addTaskCardButton" onClick={addTaskCard}>
        +
      </button>
    </div>
  );
};
