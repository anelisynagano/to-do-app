import { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [description, setDescription] = useState("");

  const handleAdd = (e) => {
    addTask(e, { description });
    setDescription("");
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        className="input"
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="add task"
        name="description"
        value={description}
      />

      <input className="submit-button" type="submit" value="+" />
    </form>
  );
};

export default TaskForm;
