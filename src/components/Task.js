import { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);

    const { description, completed, _id } = this.props;
    this.state = {
      isEditMode: false,
      description,
      completed,
      _id,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleEdit = () => {
    const { editTask } = this.props;
    const { description, completed, _id, isEditMode } = this.state;
    editTask({
      description,
      completed,
      _id,
    });
    this.setState({ isEditMode: !isEditMode });
  };

  render() {
    const { isEditMode, description, completed, _id } = this.state;
    const { deleteTask } = this.props;
    return (
      <div className="task-card">
        {isEditMode ? (
          <form>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="task"
              value={description}
              name="description"
            />
          </form>
        ) : (
          <>
            <div
              className={completed ? "done" : ""}
              onClick={() => this.setState({ completed: !completed })}
            >
              {description}
            </div>
          </>
        )}
        <div className="button-container">
          <div onClick={this.handleEdit}>{isEditMode ? "✔️" : "✏️"}</div>
          <div onClick={() => deleteTask(_id)}>❌</div>
        </div>
      </div>
    );
  }
}

export default Task;
