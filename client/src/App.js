import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import Portfolio from "./components/Portfolio";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Portfolio />
      </div>
    );
  }
}

export default App;
