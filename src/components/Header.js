import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd';
import { UserConsumer, } from "../contexts"
import "./Header.css";

export class Logout extends Component {

  static propTypes = {
  }

  render() {
    return (
      <UserConsumer>
        {({ currentUser, signOut, }) => {
            if (currentUser) {
                return (<div className="header">
                    <span className="text">My Notes</span>
                    <Button onClick={signOut}>Logout</Button>
                </div>)
            }
        }}
      </UserConsumer>
    )
  }
}

export default Logout;
