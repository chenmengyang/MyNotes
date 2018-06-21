import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { getClPosts, } from "../api/firebaseApi";

const ClContext = React.createContext({
    posts: {},
});

export const ClConsumer = ClContext.Consumer;

export class ClProvider extends Component {

    static propTypes = {
        children: PropTypes.node,
    }

    constructor(props) {
        super(props);
        this.state = {
            posts: {},
        };
    }

    async componentDidMount() {
        let posts = await getClPosts();
        this.setState({
            posts,
        });
    }
  
    render() {
      return (
        <ClContext.Provider value={{
            posts: this.state.posts,
        }}>
            {this.props.children}
        </ClContext.Provider>
      )
    }
}