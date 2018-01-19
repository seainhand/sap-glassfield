
/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { Table, Input, Button, Icon , Card } from 'antd'; 
import { Link } from 'react-router';

const data = [{
  key: '1',
  status: 'Started',
  id: '51003',
  title: "antd",
  site: "shanghai",
  bussinessUnit: 'IT',
  primaryCost: '3000',
  start: "2017-4-8",
  end: "2017-8-5",
  positions: '3',
  candidates: '2',
  hired: "1",  
}, {
  key: '2',
  status: 'Created',
  id: '51004',
  title: "antd",
  site: "beijing",
  bussinessUnit: 'IT',
  primaryCost: '4000',
  start: "2017-4-8",
  end: "2017-8-5",
  positions: '3',
  candidates: '2',
  hired: "1",   
}];
 
class OrderList extends Component {
   state = {
    filterDropdownVisibleId: false,
    filterDropdownVisibleTitle: false,
    filterDropdownVisibleSite: false,
    filterDropdownVisibleBussinessUnit: false,
    filterDropdownVisiblePrimaryCost: false,

    data,

    searchTextId: '',
    searchTextTitle: '',
    searchTextSite: '',
    searchTextBussinessUnit: '',
    searchTextPrimaryCost: '',

    filteredId: false,
    filteredTitle: false,
    filteredSite: false,
    filteredBussinessUnit: false,
    filteredPrimaryCost: false,
  };
  onInputChangeId = (e) => {
    this.setState({ searchTextId: e.target.value });
  };
  onInputChangeTitle = (e) => {
    this.setState({ searchTextTitle: e.target.value });
  };
  onInputChangeSite = (e) => {
    this.setState({ searchTextSite: e.target.value });
  };
  onInputChangeBussinessUnit = (e) => {
    this.setState({ searchTextBussinessUnit: e.target.value });
  };
  onInputChangePrimaryCost = (e) => {
    this.setState({ searchTextPrimaryCost: e.target.value });
  };
  onSearchId = () => {
    const { searchTextId } = this.state;
    const reg = new RegExp(searchTextId, 'gi');
    this.setState({
      filterDropdownVisibleId: false,
      filtered: !!searchTextId,
      data: data.map((record) => {
        const match = record.id.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          id: (
            <span>
              {record.id.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
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
  onSearchSite = () => {
    const { searchTextSite } = this.state;
    const reg = new RegExp(searchTextSite, 'gi');
    this.setState({
      filterDropdownVisibleSite: false,
      filtered: !!searchTextSite,
      data: data.map((record) => {
        const match = record.site.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          site: (
            <span>
              {record.site.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  onSearchBussinessUnit = () => {
    const { searchTextBussinessUnit } = this.state;
    const reg = new RegExp(searchTextBussinessUnit, 'gi');
    this.setState({
      filterDropdownVisibleBussinessUnit: false,
      filtered: !!searchTextBussinessUnit,
      data: data.map((record) => {
        const match = record.bussinessUnit.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          bussinessUnit: (
            <span>
              {record.bussinessUnit.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  onSearchPrimaryCost = () => {
    const { searchTextPrimaryCost } = this.state;
    const reg = new RegExp(searchTextPrimaryCost, 'gi');
    this.setState({
      filterDropdownVisiblePrimaryCost: false,
      filtered: !!searchTextPrimaryCost,
      data: data.map((record) => {
        const match = record.primaryCost.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          primaryCost: (
            <span>
              {record.primaryCost.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  render() {
    const columns = [{
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      title: 'Id',
      dataIndex: 'id',
      key: 'id',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextId}
            onChange={this.onInputChangeId}
            onPressEnter={this.onSearchId}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchId}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredId ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleId,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleId: visible,
        }, () => this.searchInput.focus());
      },  
      render: (text, record, index) => (<Link to={"/hiring/orderdetail/" + record.id} >{record.id}</Link>),   
    }, {
      title: '标题',
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
    }, {
      title: '城市',
      dataIndex: 'site',
      key: 'site',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextSite}
            onChange={this.onInputChangeSite}
            onPressEnter={this.onSearchSite}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchSite}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredSite ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleSite,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleSite: visible,
        }, () => this.searchInput.focus());
      }, 
    }, {
      title: '业务单元',
      dataIndex: 'bussinessUnit',
      key: 'bussinessUnit',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextBussinessUnit}
            onChange={this.onInputChangeBussinessUnit}
            onPressEnter={this.onSearchBussinessUnit}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchBussinessUnit}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredBussinessUnit ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleBussinessUnit,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleBussinessUnit: visible,
        }, () => this.searchInput.focus());
      }, 
    }, {
      title: 'Primary Cost',
      dataIndex: 'primaryCost',
      key: 'primaryCost',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextPrimaryCost}
            onChange={this.onInputChangePrimaryCost}
            onPressEnter={this.onSearchPrimaryCost}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchPrimaryCost}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredPrimaryCost ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisiblePrimaryCost,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisiblePrimaryCost: visible,
        }, () => this.searchInput.focus());
      }, 
    }, {
      title: 'start',
      dataIndex: 'start',
      key: 'start', 
    }, {
      title: 'end',
      dataIndex: 'end',
      key: 'end', 
    }, {
      title: 'positions',
      dataIndex: 'positions',
      key: 'positions', 
    }, {
      title: 'candidates',
      dataIndex: 'candidates',
      key: 'candidates', 
    }, {
      title: 'hired',
      dataIndex: 'hired',
      key: 'hired', 
    }];
    return (
        <div className="gutter-example">  
            <div className="gutter-box">
                <Card title="订单列表" bordered={false}>
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={this.state.data} />
                </Card>
            </div> 
        </div>
        )
  };
} 

export default OrderList;