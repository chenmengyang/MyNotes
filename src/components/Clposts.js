import React from 'react'
import PropTypes from 'prop-types'
import { ClProvider, ClConsumer, } from "../contexts"
import { Table, Spin, Icon, } from 'antd';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import './Clposts.css'

const Clposts = () => {
  return (
    <ClConsumer>
        {({ posts, }) => {
            // console.log(`post is ${JSON.stringify(posts)}`);
            let dataSource = R.toPairs(posts).map(element => ({
                'key': element[1].id,
                'hot': element[1].status.light,
                'title': element[1].title,
                'postDate': element[1].postDate,
            }));

            const columns = [{
                title: 'Hot',
                dataIndex: 'hot',
                key: 'key',
                render: (flag) => flag ? <Icon type="heart" style={{ fontSize: 16, color: 'red' }}/> : <Icon type="smile-o"  style={{ fontSize: 16, color: 'green' }}/>
                }, {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: (text, record) => <Link to={`/post/${record.key}`}>{text}</Link>,
                }, {
                title: 'postDate',
                dataIndex: 'postDate',
                key: 'key',
            }];

            // console.log(`arr is ${JSON.stringify(arr)}`);
            if (dataSource && dataSource.length) {
                return <Table dataSource={dataSource} columns={columns} />
            } else {
                return <Spin />
            }
        }}
    </ClConsumer>
  )
}

Clposts.propTypes = {

}

export default Clposts
