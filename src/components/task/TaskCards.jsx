import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskCardButton } from "./button/AddTaskCardButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reOrder = (taskList, startIndex, endIndex) => {
  const draggingItem = taskList.splice(startIndex, 1);
  taskList.splice(endIndex, 0, draggingItem[0]);
};

export const TaskCards = () => {
  const [taskCardsList, setTaskCardsList] = useState([
    {
      id: "0",
      draggableId: "item-0",
    },
  ]);

  const handleDragEnd = (result) => {
    // ドロップ先がない場合（ドロップがキャンセルされた場合や、DragDropContext の外側にドロップされた場合）
    if (!result.destination) {
      return;
    }
    // ドロップ先と元の場所が同じ場合、何もしない
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    // タスクを並び替える
    reOrder(taskCardsList, result.source.index, result.destination.index);
    setTaskCardsList(taskCardsList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            className="taskCardsArea"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {taskCardsList.map((taskCard, index) => (
              <TaskCard
                key={taskCard.id}
                taskCardsList={taskCardsList}
                setTaskCardsList={setTaskCardsList}
                taskCard={taskCard}
                index={index}
              />
            ))}
            {provided.placeholder}
            <AddTaskCardButton
              taskCardsList={taskCardsList}
              setTaskCardsList={setTaskCardsList}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
