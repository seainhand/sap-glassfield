
/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { Table, Input, Button, Icon , Card } from 'antd';
import { Link } from 'react-router';
require('../../style/report/index.less');

const data = [{
  key: '1',
  title: 'ddd',
  category: 'Created',
  stbillrate: "9932",
  description: "32"
}, {
  key: '2',
  title: 'sss',
  category: 'Started',
  stbillrate: "4564656",
  description: "dsfsdfsddfdsf"
}];
 
class TemplateTable extends Component {
   state = {
    filterDropdownVisibleTitle: false,
    filterDropdownVisibleSTBillRate: false,
    filterDropdownVisibleDescription: false,
    data,
    searchTextTitle: '',
    searchTextSTBillRate: '',
    searchTextDescription: '',
    filteredTitle: false,
    filteredSTBillRate: false,
    filteredDescription: false,
  };
  onInputChangeTitle = (e) => {
    this.setState({ searchTextTitle: e.target.value });
  };
  onInputChangeSTBillRate = (e) => {
    this.setState({ searchTextSTBillRate: e.target.value });
  };
  onInputChangeDescription = (e) => {
    this.setState({ searchTextDescription: e.target.value });
  };
  onSearchTitle = () => {
    const { searchTextTitle } = this.state;
    const reg = new RegExp(searchTextTitle, 'gi');
    this.setState({
      filterDropdownVisibleTitle: false,
      filtered: !!searchTextTitle,
      data: data.map((record) => {
        const match = record.title.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          title: (
            <span>
              {record.title.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  onSearchSTBillRate = () => {
    const { searchTextSTBillRate } = this.state;
    const reg = new RegExp(searchTextSTBillRate, 'gi');
    this.setState({
      filterDropdownVisibleSTBillRate: false,
      filtered: !!searchTextSTBillRate,
      data: data.map((record) => {
        const match = record.stbillrate.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          stbillrate: (
            <span>
              {record.stbillrate.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  onSearchDescription = () => {
    const { searchTextDescription } = this.state;
    const reg = new RegExp(searchTextDescription, 'gi');
    this.setState({
      filterDropdownVisibleDescription: false,
      filtered: !!searchTextDescription,
      data: data.map((record) => {
        const match = record.description.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          description: (
            <span>
              {record.description.split(reg).map((text, i) => (
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextTitle}
            onChange={this.onInputChangeTitle}
            onPressEnter={this.onSearchTitle}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchTitle}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredTitle ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleTitle,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleTitle: visible,
        }, () => this.searchInput.focus());
      }, 
      render: (text, record, index) => (<Link to={"/hiring/orderform/" + record.key} >{record.title}</Link>), 
    }, {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
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
      title: 'ST Bill Rate',
      dataIndex: 'stbillrate',
      key: 'stbillrate',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextSTBillRate}
            onChange={this.onInputChangeSTBillRate}
            onPressEnter={this.onSearchSTBillRate}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchSTBillRate}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredSTBillRate ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleSTBillRate,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleSTBillRate: visible,
        }, () => this.searchInput.focus());
      }, 
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextDescription}
            onChange={this.onInputChangeDescription}
            onPressEnter={this.onSearchDescription}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchDescription}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredDescription ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleDescription,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleDescription: visible,
        }, () => this.searchInput.focus());
      }, 
    }];
    return (
        <div className="gutter-example">  
            <div className="gutter-box">
                <Card title="招聘模板" bordered={false}>
                    <Button type="primary" size="large" style={{marginBottom: "20px"}}>
                      <Link to="/hiring/orderform">创建订单（不使用模板）</Link>
                    </Button>
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={this.state.data} />
                </Card>
            </div> 
        </div>
        )
  };
} 

export default TemplateTable;