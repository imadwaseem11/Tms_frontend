import React from "react";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const BoardView = ({ tasks = [] }) => {
  if (!Array.isArray(tasks)) {
    return null;
  }

  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
};

BoardView.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // Include other task properties here if needed
    })
  ),
};

export default BoardView;
