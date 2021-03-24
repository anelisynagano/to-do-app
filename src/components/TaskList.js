import { Component } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    fetch("https://nagano-task-manager.herokuapp.com/tasks")
      .then((res) => res.json())
      .then((data) => this.setState({ tasks: data }));
  };

  addTask = (e, taskInfo) => {
    e.preventDefault();
    fetch("https://nagano-task-manager.herokuapp.com/tasks", {
      method: "POST",
      body: JSON.stringify(taskInfo),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => this.setState({ tasks: [...this.state.tasks, data] }));
    this.setState({ description: "" });
  };

  editTask = (editedTask) => {
    const taskObj = {
      description: editedTask.description,
      completed: editedTask.completed,
    };
    fetch(`https://nagano-task-manager.herokuapp.com/tasks/${editedTask._id}`, {
      method: "PUT",
      body: JSON.stringify(taskObj),
      headers: { "Content-type": "application/json" },
    });
  };

  deleteTask = (deletedTaskId) => {
    console.log(deletedTaskId);
    const id = { id: deletedTaskId };
    fetch(`https://nagano-task-manager.herokuapp.com/tasks/${deletedTaskId}`, {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: { "Content-type": "application/json" },
    });
    this.setState({
      tasks: this.state.tasks.filter((task) => task._id !== deletedTaskId),
    });
  };

  render() {
    return (
      <div>
        <TaskForm handleChange={this.handleChange} addTask={this.addTask} />

        {this.state.tasks.map((task) => (
          <Task
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            handleChange={this.handleChange}
            key={task._id}
            {...task}
          />
        ))}
      </div>
    );
  }
}

export default TaskList;
