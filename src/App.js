import React from "react";
import shortid from "shortid";
import "./App.css";

class App extends React.Component {
  state = {
    date: "",
    todos: [],
    todoToShow: "All",
    data: "",
  };
  handlechange = (event) => {
    if (event.target.value !== "") {
      this.setState({ data: event.target.value });
    }
  };
  toggleComplete = (todo) => {
    let completedata = this.state.todos.map((r) => {
      if (r.id === todo.id) {
        return {
          ...todo,
          id: todo.id,
          complete: true,
        };
      } else {
        return r;
      }
    });
    localStorage.setItem("SettingToDo", JSON.stringify(completedata));
    this.setState({ todos: completedata });
  };
  updateTodoShow = (s) => {
    this.setState({ todoToShow: s });
  };

  handleDelete = (todo) => {
    const data = this.state.todos;
    data.splice(data.indexOf(todo), 1);
    this.setState({ todos: data });
    localStorage.setItem("SettingToDo", JSON.stringify(this.state.todos));
  };
  handleAllCompleteDelete = () => {
    this.setState(
      { todos: this.state.todos.filter((todo) => !todo.complete) },
      () =>
        localStorage.setItem("SettingToDo", JSON.stringify(this.state.todos))
    );
  };
  handleSubmit = () => {
    if (this.state.data !== "" && document.querySelector("#date").value !== "") {
      this.setState(
        {
          todos: [
            {
              id: shortid.generate(),
              text: this.state.data,
              date: document.querySelector("#date").value,
              complete: false,
            },
            ...this.state.todos,
          ],
        },
        () => {
          localStorage.setItem("SettingToDo", JSON.stringify(this.state.todos));
        }
      );
      this.setState({
        data:"",
        date:""
      });
      document.querySelector("#input").value = "";
      document.querySelector("#date").value = "";
    } else {
      if (this.state.data === "") {
        alert("Plz Fill the text");
      }
      if (document.querySelector("#date").value === "") {
        alert("Plz Select the date");
      }
    }
  };
  componentDidMount() {
    if (localStorage.getItem("SettingToDo") !== null) {
      this.setState({ todos: JSON.parse(localStorage.getItem("SettingToDo")) });
    }
  }
  render() {
    let todos = [];
    if (this.state.todoToShow === "All") {
      todos = this.state.todos;
    } else if (this.state.todoToShow === "Active") {
      todos = this.state.todos.filter((todo) => !todo.complete);
    } else if (this.state.todoToShow === "Complete") {
      todos = this.state.todos.filter((todo) => todo.complete);
    }
    return (
      <div className="App">
        <div className="box">
          <div>
            <br />
            <br />
            <br />
            <button
              className="button-color"
              onClick={() => this.updateTodoShow("All")}
            >
              All
            </button>
            &nbsp;
            <button
              className="button-color"
              onClick={() => this.updateTodoShow("Active")}
            >
              Active
            </button>
            &nbsp;
            <button
              className="button-color"
              onClick={() => this.updateTodoShow("Complete")}
            >
              Complete
            </button>
            &nbsp;
            {this.state.todos.some((todo) => todo.complete) ? (
              <button
                className="button-color"
                onClick={this.handleAllCompleteDelete}
              >
                Clear All Complete
              </button>
            ) : null}
            <div>
              {this.state.todos.filter((todo) => !todo.complete).length} Active
              todos{" "}
            </div>
          </div>{" "}
          <br />
          <br />
          <div className="row">
            <div className="col1">
              <input
                id="input"
                type="text"
                onChange={this.handlechange}
                placeholder="Enter a todo"
                required
              />
            </div>
            <div className="col1">
              <input
                id="date"
                type="date"
                defaultValue={this.state.date.getDate}
              />
            </div>
            <div className="col1">
              <button
                className="btn btn-1 button-add"
                onClick={this.handleSubmit}
              >
                Add To Do{" "}
              </button>
            </div>
          </div>
          <div>
            {todos.map((todo) => (
              <div>
                <div className="background-color-data" key={todo.id}>
                  <span className="align-text">
                    {todo.text} &nbsp;&nbsp;&nbsp;&nbsp;
                    {todo.date}
                  </span>
                  <span className="button-align">
                    <button
                      className="button-color-text"
                      onClick={() => this.handleDelete(todo)}
                    >
                      ✘
                    </button>
                    {!todo.complete ? (
                      <button
                        className="button-color-text-1"
                        onClick={() => this.toggleComplete(todo)}
                      >
                        ✔
                      </button>
                    ) : null}
                  </span>
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
