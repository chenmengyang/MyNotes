import React, { Component } from 'react';
import { LoginForm, Header, Clposts, ClPost, } from "./components";
import { UserProvider, UserConsumer, ClProvider, } from "./contexts";
import { Route, Switch, withRouter } from 'react-router-dom';
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
        <UserProvider>
          <LoginForm />
          <Header />
          <ClProvider>
            <Switch>
              <Route exact path="/" component={Clposts} />
              <Route path="/post/:pid" component={ClPost} />
            </Switch>
          </ClProvider>
        </UserProvider>
    );
  }
}

export default App;
