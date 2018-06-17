import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { signIn, signOut, onAuthStateChanged, } from "../api/firebaseApi";

const UserContext = React.createContext({
    currentUser: '',
    signIn: () => {},
    signOut: () => {}
});

export const UserConsumer = UserContext.Consumer;

export class UserProvider extends Component {

    static propTypes = {
        children: PropTypes.node,
    }

    constructor(props) {
        super(props);
        this.state = {
            currentUser: '',
        };
        // listen to auth state changes
        onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              this.setState({
                currentUser: user,
              });
            } else {
              // User is signed out.
              this.setState({
                currentUser: '',
              });
            }
        });
    }
  
    render() {
      return (
        <UserContext.Provider value={{
            currentUser: this.state.currentUser,
            signIn,
            signOut,
        }}>
            {this.props.children}
        </UserContext.Provider>
      )
    }
}