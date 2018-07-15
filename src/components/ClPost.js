import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Spin, Col, Row, } from 'antd';
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
  }

  randomValue() {
    return Math.round(Math.random()*50);
  }

  render() {
    return (
      <ClConsumer>
        {({ posts, }) => {
            let result = <Spin />;
            let title = "";
            if (Object.keys(posts).length) {
                let post = posts[this.props.match.params.pid];
                let photos = post.photoUrls;
                title = post.title.replace(/\[.*?]/g,'');
                result = photos.map((url, index) => <Col key={`ph_col_${index}`} className='image-col' lg={8} sm={12} xs={24}>
                  <Card cover={<img alt="example" src={url} />}/>
                </Col>)
            }
            return (
              <React.Fragment>
                <p className='title'>{title}</p>
                <Row gutter={{ xs: 2, sm: 4, md: 8, lg: 16 }} className={`superrow`}>
                  {result}
                </Row>
              </React.Fragment>
            )
        }}
      </ClConsumer>
    )
  }
}

export default ClPost;