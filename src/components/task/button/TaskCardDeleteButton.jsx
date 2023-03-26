import React from "react";

export const TaskCardDeleteButton = ({
  taskCardsList,
  setTaskCardsList,
  taskCard,
}) => {
  const taskCardDeleteButton = (id) => {
    setTaskCardsList(taskCardsList.filter((taskCard) => taskCard.id !== id));
  };

  return (
    <div>
      <button
        className="taskCardDeleteButton"
        onClick={() => {
          taskCardDeleteButton(taskCard.id);
        }}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};
