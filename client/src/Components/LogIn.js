import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Typography, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import AuthHelperMethods from "../Components/_AuthHelper";
import AttackBar from '../Components/AttackBar'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import TitleBar from "./TitleBar";

class LogIn extends Component {
  constructor(props) {
    super(props);
  }

  Auth = new AuthHelperMethods();

  state = {
    username: "",
    password: "",
    loginSuccess: false
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.password]: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(response => {
        if (response.status === 400) {
          return alert("Sorry those credentials don't exist!");
        }
        this.setState({ loginSuccess: true });
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    if (this.state.loginSuccess) {
      return <Redirect to="/CharSelect" />;
    }
    return (
      <>
        <TitleBar />
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="flex-start"
          style={{
            padding: "20px"
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            style={{
              color: "white",
              fontFamily: "Merienda, cursive",
              paddingBottom: "20px"
            }}
          >
            Log In To Play Now!
          </Typography>
          <Paper
            style={{
              backgroundColor: "#f5f5f5"
            }}
          >
            <Box style={{ padding: "20px" }}
            >
              <Typography
                variant="h6"
                component="h6"
                style={{
                  fontFamily: "Merienda, cursive"
                }}
              >
                Log In Below
              </Typography>
              <TextField
                id="outlined-name"
                label="Name"
                name="username"
                onChange={this.changeHandler}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-password-input"
                name="password"
                label="Password"
                onChange={this.changeHandler}
                type="password"
                margin="normal"
                variant="outlined"
                style={{
                  paddingLeft: "3px"
                }}
              />
            </Box>
            <Box component="span" style={{ padding: "20px" }} >
              <Button
              variant="contained"
              color="primary"
              id="loginButton"
              onClick={this.handleFormSubmit}
              style={{ fontFamily: "Merienda, cursive" }}
              >
              Login
              </Button>

              <Typography
                style={{
                  paddingTop: "10px",
                  paddingLeft: "20px",
                  fontFamily: "Merienda, cursive"
                }}
              >
                Don't have an account?
                <Button onClick={()=> { return <Redirect to="/signup" /> }}>Sign Up</Button>
              </Typography>
              <AttackBar />
            </Box>
          </Paper>
        </Grid>
      </>
    );
  }
}

export default LogIn;
