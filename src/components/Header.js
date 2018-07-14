import React, { Component } from 'react'
import { Button, Icon } from 'antd';
import { UserConsumer, } from "../contexts"
import { withRouter, } from 'react-router-dom';
import "./Header.css";

export class Header extends Component {

  static propTypes = {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UserConsumer>
        {({ currentUser, signOut, }) => {
            if (currentUser) {
                return (
                  <div className="header">
                    <span className="text">精选</span>
                    {(this.props.history.location.pathname.includes('post')) ? 
                      <span className="back" onClick={() => this.props.history.push('/')}><Icon type="rollback" />返回</span>
                      :
                      null
                    }
                    <Button onClick={signOut}>Logout</Button>
                  </div>
                )
            }
        }}
      </UserConsumer>
    )
  }
}

export default withRouter(Header);
