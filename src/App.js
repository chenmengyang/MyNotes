import React, { Component } from 'react';
import { LoginForm, Header, } from "./components";
import { UserProvider, UserConsumer, } from "./contexts";
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="app">
        <UserProvider>
          <LoginForm />
          <Header />
        </UserProvider>
      </div>
    );
  }
}

export default App;
