import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Spin, } from 'antd';
import { ClConsumer, } from "../contexts"
import './Clpost.css'

export class ClPost extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
    this.state = {
        post: ''
    }
  }

  componentDidMount() {
    if (this.props.match.params.pid) {
        console.log(`this.props.match.params.pid is ${this.props.match.params.pid}`);
    }
  }

  render() {
    return (
      <ClConsumer>
        {({ posts, }) => {
            let result = <Spin />;
            if (Object.keys(posts).length) {
                let post = posts[this.props.match.params.pid];
                let photos = post.photoUrls;
                result = photos.map((url, index) => <Card
                    key={`dgy_image_card_${index}`}
                    hoverable
                    // style={{ width: 800 }}
                    cover={<img alt="example" src={url} />}
                >
                </Card>)
            }
            return result;
        }}
      </ClConsumer>
    )
  }
}

export default ClPost
