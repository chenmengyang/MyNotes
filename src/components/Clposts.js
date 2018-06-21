import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ClProvider, ClConsumer, } from "../contexts"
import { Table, Spin, Icon, } from 'antd';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import './Clposts.css'
import { spawn } from 'child_process';

export class Clposts extends Component {

  static propTypes = {
  }

  constructor(props) {
      super(props);
      this.state = {
        sortedInfo: {}
      };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  render() {
    return (
        <ClConsumer>
            {({ posts, }) => {
                let dataSource = R.toPairs(posts).map(element => ({
                    'key': element[1].id,
                    'hot': element[1].status.light,
                    'title': element[1].title,
                    'postDate': element[1].postDate.substr(13,),
                }));
                //
                if (this.state.sortedInfo.order === 'ascend') {
                    dataSource = dataSource.sort((a,b)=>new Date(a.postDate) - new Date(b.postDate))
                } else if (this.state.sortedInfo.order === 'descend') {
                    dataSource = dataSource.sort((a,b)=>new Date(b.postDate) - new Date(a.postDate))
                }
                //
                const columns = [
                    {
                        title: 'Hot',
                        dataIndex: 'hot',
                        render: (flag) => flag ? <Icon type="heart" style={{ fontSize: 16, color: 'red' }}/> : <Icon type="smile-o"  style={{ fontSize: 16, color: 'green' }}/>
                    },
                    {
                        title: 'Title',
                        dataIndex: 'title',
                        render: (text, record) => <Link to={`/post/${record.key}`}>{text}</Link>,
                    },
                    {
                        title: 'postDate',
                        dataIndex: 'postDate',
                        render: (date) => ((new Date()-new Date(date))<1) ? <span style={{color: 'green'}}><i className="far fa-hand-receiving"></i>{date}</span>: <span>{date}</span>,
                        sorter: () => {},
                        sortOrder: this.state.sortedInfo.columnKey === 'postDate' && this.state.sortedInfo.order,
                    }
                ];
                // console.log(`arr is ${JSON.stringify(arr)}`);
                if (dataSource && dataSource.length) {
                    return <Table dataSource={dataSource} columns={columns} onChange={this.handleChange} />
                } else {
                    return <Spin />
                }
            }}
        </ClConsumer>
    )
  }
}

export default Clposts
