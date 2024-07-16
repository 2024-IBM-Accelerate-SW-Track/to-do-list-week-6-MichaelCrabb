import React from "react";
import "../component/todos.css";
import {Card,CardContent,Grid,ListItemButton,ListItemText,Checkbox,} from "@mui/material";

// 1. This component formats and returns the list of todos.
// 2. Treat the question mark like an if statement.
// If the todos array has items in the list [todos.length], we want to return the list
// Else, return a message saying "You have no todo's left"
// 3. The map function is called to assign each array item with a key
// 4. Think of lines 14-23 as a loop. For each todo in the todo list, we want to give the list item
// a key, and it's own card shown in the UI
const Todos = ({ todos, deleteTodo }) => {
    const todoList = todos.length ? (
      todos.map((todo) => {
        let color = "";
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
           "October", "November", "December"]
        let due_date = new Date(todo.due_date);
        let due_week_day = days[due_date.getDay() - 1];
        let due_month = months[due_date.getMonth() - 1];
        let due_month_day = due_date.getDate();
        for (let i = 0; i < 31; ++i) {

        }
        if (todo.due_date > todo.date) {
          color = "red";
        }
        else {
          color = "white";
        }
        return (
          <Grid key={todo.id} className="grid">
            <Card className="card" data-testid={todo.content} style = {{ backgroundColor: color }}>
              <ListItemButton component="a" href="#simple-list">
                <Checkbox style={{ paddingLeft: 0 }} color="primary" onClick={ () => { deleteTodo(todo.id) }}/>
                <ListItemText primary={todo.content} secondary={"Due: " + due_week_day + ", " + due_month
                  + " " + due_month_day}/>
              </ListItemButton>
            </Card>
          </Grid>
        );
      })
    ) : (
      <p>You have no more tasks left. Time to relax.</p>
    );
    // Lastly, return the todoList constant that we created above to show all of the items on the screen.
    return (
      <div className="todoCollection" style={{ padding: "10px" }}>
        {todoList}
      </div>
    );
};
  
export default Todos;
