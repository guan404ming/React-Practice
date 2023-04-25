import "./App.css";
import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleDoneTodo = this.handleDoneTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleClearDoneTodo = this.handleClearDoneTodo.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
  }

  handleAddTodo(e) {
    if (e.key === "Enter") {
      var currentTodos = this.state.todos;
      currentTodos.push({
        index: Date.now().toString(36),
        event: e.target.value,
        isDone: false,
      });
      this.setState({ todos: currentTodos });
      this.handleChangeView({ target: { id: "all" } });
    }
  }

  handleDeleteTodo(e) {
    var currentTodos = this.state.todos;
    for (var i = 0; i < currentTodos.length; i++) {
      if (currentTodos[i].index === e.target.id) {
        currentTodos.splice(i, 1);
      }
    }
    this.setState({ todos: currentTodos });
    this.handleChangeView({ target: { id: "all" } });
  }

  handleDoneTodo(e) {
    var currentTodos = this.state.todos;
    for (var i = 0; i < currentTodos.length; i++) {
      if (currentTodos[i].index === e.target.id) {
        currentTodos[i].isDone = !currentTodos[i].isDone;
      }
    }
    this.handleChangeView({ target: { id: "all" } });
    this.setState({ todos: currentTodos });
  }

  handleClearDoneTodo() {
    var currentTodos = this.state.todos;
    var undone = true;
    while (undone) {
      var used = 0;
      for (var i = 0; i < currentTodos.length; i++) {
        if (currentTodos[i].isDone) {
          currentTodos.splice(i, 1);
          used++;
        }
      }
      undone = used === 0 ? false : true;
    }
    this.setState({ todos: currentTodos });
    this.handleChangeView({ target: { id: "all" } });
    alert("Completed todos have been removed  ─=≡Σ((( つ•̀ω•́)つ ");
  }

  handleChangeView(e) {
    document.getElementById("active").classList = [];
    document.getElementById("all").classList = [];
    document.getElementById("completed").classList = [];

    if (e.target.id === "active") {
      this.setState({
        currentView: this.state.todos.filter((todo) => !todo.isDone),
      });
      document.getElementById("active").classList.add("selected");
    } else if (e.target.id === "completed") {
      this.setState({
        currentView: this.state.todos.filter((todo) => todo.isDone),
      });
      document.getElementById("completed").classList.add("selected");
    } else {
      this.setState({ currentView: this.state.todos });
      document.getElementById("all").classList.add("selected");
    }
  }

  render() {
    var displayTodo = this.state.currentView
      ? this.state.currentView
      : this.state.todos;

    return (
      <div id="root" className="todo-app__root">
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        <section className="todo-app__main">
          <input
            className="todo-app__input"
            placeholder="What needs to be done"
            onKeyPress={this.handleAddTodo}
          ></input>
          <ul id="todo-list" className="todo-app__list">
            {displayTodo.map((todo) => (
              <li className="todo-app__item" key={todo.index}>
                <div className="todo-app__checkbox">
                  <input
                    type="checkbox"
                    id={todo.index}
                    onClick={this.handleDoneTodo}
                    defaultChecked={todo.isDone}
                  ></input>
                  <label htmlFor={todo.index}></label>
                </div>
                <h1
                  className={`todo-app__item-detail ${
                    todo.isDone ? "is-done" : ""
                  }`}
                >
                  {todo.event}
                </h1>

                <img
                  src="https://cdn-icons-png.flaticon.com/512/1617/1617543.png"
                  className="todo-app__item-x"
                  onClick={this.handleDeleteTodo}
                  id={todo.index}
                  alt='cancel'
                ></img>
              </li>
            ))}
          </ul>
        </section>
        <footer
          id="todo-footer"
          className={`todo-app__footer ${
            this.state.todos.length === 0 ? "hide" : ""
          }`}
        >
          <div className="todo-app__total">
            {
              this.state.todos.filter((todo) => {
                return !todo.isDone;
              }).length
            }{" "}
            left
          </div>
          <div className="todo-app__view-buttons">
            <button
              id="all"
              onClick={this.handleChangeView}
              className="selected"
            >
              All
            </button>
            <button id="active" onClick={this.handleChangeView}>
              Active
            </button>
            <button id="completed" onClick={this.handleChangeView}>
              Completed
            </button>
          </div>
          <div
            className={`todo-app__clean ${
              this.state.todos.filter((todo) => todo.isDone).length === 0
                ? "hide"
                : ""
            }`}
          >
            <button onClick={this.handleClearDoneTodo}>Clear Completed</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
