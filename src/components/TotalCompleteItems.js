import React from "react";
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const completedTodos = useSelector((state) =>
    state.todoReducer.filter((todo) => todo.completed === true)
  );
  return (
    <h4 className="mt-3">Total Completed Items: {completedTodos.length}</h4>
  );
};

export default TotalCompleteItems;
