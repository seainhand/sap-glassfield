
/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { Table, Input, Button, Icon , Card } from 'antd';
require('../../style/report/index.less');

const data = [{
  key: '1',
  name: 'ddd',
  status: 'Created',
  impression: 9932,
  click: 32,
  install: 32,
  ctr: "32%",
  cvr: "32%",
  budgetRemain: 0.41,
}, {
  key: '2',
  name: 'hhtt',
  status: 'Paused',
  impression: 2251,
  click: 66,
  install: 11,
  ctr: "42%",
  cvr: "86%",
  budgetRemain: 0.22,
}];
 
class Report extends Component {
   state = {
    filterDropdownVisible: false,
    data,
    searchText: '',
    filtered: false,
  };
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: data.map((record) => {
        const match = record.name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  render() {
    const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput.focus());
      }, 
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'age',
      filters: [{
        text: 'Created',
        value: 'Created',
      }, {
        text: 'Started',
        value: 'Started',
      }, {
        text: 'Paused',
        value: 'Paused',
      }, {
        text: 'Completed',
        value: 'Completed',
      }, {
        text: 'Expired',
        value: 'Expired',
      }],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    }, {
      title: 'Impression',
      dataIndex: 'impression',
      key: 'impression',  
    }, {
      title: 'Click',
      dataIndex: 'click',
      key: 'click',  
    }, {
      title: 'Install',
      dataIndex: 'install',
      key: 'install',  
    }, {
      title: 'Ctr',
      dataIndex: 'ctr',
      key: 'ctr',  
    }, {
      title: 'Cvr',
      dataIndex: 'cvr',
      key: 'cvr',  
    }, {
      title: 'Budget Remain',
      dataIndex: 'budgetRemain',
      key: 'budgetRemain',  
    }];
    return (
        <div className="gutter-example">  
            <div className="gutter-box">
                <Card title="注册表单" bordered={false}>
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={this.state.data} />
                </Card>
            </div> 
        </div>
        )
  };
} 

export default Report;