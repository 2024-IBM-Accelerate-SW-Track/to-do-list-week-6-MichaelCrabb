import { DesktopDatePicker , LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import Axios from "axios";
import "./AddTodo.css";

class AddTodo extends Component {
    // A local react state of the this component with a content property set to nothing.
    constructor() {
      super();
      this.state = {
        content: "",
        date: "",
        due_date: null,
      };
    }
    // The handleChange function updates the react state with the new input value provided from the user.
    // "event" is the defined action a user takes. In this case, the event is triggered when the user types something
    // into the text field.
    handleChange = (event) => {
      this.setState({
        content: event.target.value,
        date: Date().toLocaleString('en-US'),
      });
    };
    handleDateChange = (newDate) => {
      this.setState({
          due_date: newDate,
      });
  };
    // The handleSubmit function collects the forms input and puts it into the react state.
    // event.preventDefault() is called to prevents default event behavior like refreshing the browser.
    // this.props.addTodo(this.state) passes the current state (or user input) into the addTodo function defined
    // in the Home.js file which then adds the input into the list.
    handleSubmit = (event) => {
      const jsonObject = {
        id: this.state.id,
        task: this.state.content,
        currentDate: this.state.date,
        dueDate: this.state.due_date
     };
     Axios({
      method: "POST",
      url: "http://localhost:3010/add/item",
      data: {jsonObject},
      headers: {
         "Content-Type": "application/json"
      }
      }).then(res => {
        console.log(res.data.message);
      });
      event.preventDefault();
      if (this.state.content.trim()) {
        this.props.addTodo({
          content: this.state.content,
          date: this.state.date,
          due_date: this.state.due_date,
          });
        this.setState({
          content: "",
          due_date: null,
        });
      }
    };
    render() {
      return (
        // 1. The return statement should include a text field input with the handleChange function from above that
        // is passed into an onChange event.
        // 2. The return should also include a button with the handleSubmit function from above that is passed into
        // an OnClick event.
        // 3. The value of the text field also should reflect the local state of this component.
        <div>
          <TextField
            label="Add New Item"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.content}
            data-testid="new-item-textfield"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>         
            <DesktopDatePicker
              id="new-item-date"
              label={this.due_date}
              value={this.state.due_date}
              onChange={this.handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            data-testid="new-item-button"
            >
            Add task
          </Button>
        </div>
      );
    }
  }
  
  export default AddTodo;