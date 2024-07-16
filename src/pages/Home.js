import React, { Component } from "react";
import AddTodo from "../component/AddTodo.js";
import Todos from "../component/todos.js";
import Footer from "../component/footer.js";
import "./Home.css";

class Home extends Component {
  // A default state of this component with an empty list of todos.
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }
  addTodo = (todo) => {
    if (this.state.todos.find(t => t.content === todo.content)) {
      // If the todo item already exists in the list, do nothing and return
      return;
    } 
    else {
      let date = new Date(todo.date);
      if (todo.due_date === null || todo.due_date === "Invalid Date"
          || new Date(todo.due_date) < date.setHours(date.getHours() - 24)) {
        return;
      }
      else {
        todo.id = Math.random();
        let new_list = [...this.state.todos, todo];
        this.setState({
          todos: new_list,
        });
      }
    }
  };
  deleteTodo = (id) => {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos: todos,
    });
  };
  render() {
    return (
      <div className="Home">
        <Todos todos={[...this.state.todos]} deleteTodo={this.deleteTodo}/>
        <AddTodo addTodo={this.addTodo} />
        <h1>Todo List</h1>
        <Footer /> {this.footer}
      </div>
    );
  }
}

export default Home;
