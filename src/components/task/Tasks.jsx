import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Task } from "./Task";

const reOrder = (taskList, startIndex, endIndex) => {
  const draggingItem = taskList.splice(startIndex, 1);
  taskList.splice(endIndex, 0, draggingItem[0]);
};

export const Tasks = ({ taskList, setTaskList }) => {
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
    reOrder(taskList, result.source.index, result.destination.index);
    setTaskList(taskList);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {taskList.map((task, index) => (
                <div key={task.id}>
                  <Task
                    index={index}
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
