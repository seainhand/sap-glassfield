
/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { Table, Input, Button, Icon , Card } from 'antd'; 
import { Link } from 'react-router';

const data = [{
  key: '1',
  status: '未回执',
  id: 'CRPAWO0001511',
  worker: "antd",
  site: "shanghai",
  workerID: 'N574JS000012',
  buyer: 'Corporation A',
  start: "2017-4-8",
  end: "2017-8-5",
  type: '3', 
}, {
  key: '2',
  status: '雇用成功',
  id: 'CRPAWO0001512',
  worker: "antd",
  site: "beijing",
  workerID: 'N574JS000013',
  buyer: 'Corporation A',
  start: "2017-4-8",
  end: "2017-8-5",
  type: '3', 
}];
 
class EmployList extends Component {
   state = {
    filterDropdownVisibleId: false,
    filterDropdownVisibleWorker: false,
    filterDropdownVisibleSite: false,
    filterDropdownVisibleWorkerID: false,
    filterDropdownVisibleBuyer: false,

    data,

    searchTextId: '',
    searchTextWorker: '',
    searchTextSite: '',
    searchTextWorkerID: '',
    searchTextBuyer: '',

    filteredId: false,
    filteredWorker: false,
    filteredSite: false,
    filteredWorkerID: false,
    filteredBuyer: false,
  };
  onInputChangeId = (e) => {
    this.setState({ searchTextId: e.target.value });
  };
  onInputChangeWorker = (e) => {
    this.setState({ searchTextWorker: e.target.value });
  };
  onInputChangeSite = (e) => {
    this.setState({ searchTextSite: e.target.value });
  };
  onInputChangeWorkerID = (e) => {
    this.setState({ searchTextWorkerID: e.target.value });
  };
  onInputChangeBuyer = (e) => {
    this.setState({ searchTextBuyer: e.target.value });
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
  onSearchWorker = () => {
    const { searchTextWorker } = this.state;
    const reg = new RegExp(searchTextWorker, 'gi');
    this.setState({
      filterDropdownVisibleWorker: false,
      filtered: !!searchTextWorker,
      data: data.map((record) => {
        const match = record.worker.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          worker: (
            <span>
              {record.worker.split(reg).map((text, i) => (
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
  onSearchWorkerID = () => {
    const { searchTextWorkerID } = this.state;
    const reg = new RegExp(searchTextWorkerID, 'gi');
    this.setState({
      filterDropdownVisibleWorkerID: false,
      filtered: !!searchTextWorkerID,
      data: data.map((record) => {
        const match = record.workerID.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          workerID: (
            <span>
              {record.workerID.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  onSearchBuyer = () => {
    const { searchTextBuyer } = this.state;
    const reg = new RegExp(searchTextBuyer, 'gi');
    this.setState({
      filterDropdownVisibleBuyer: false,
      filtered: !!searchTextBuyer,
      data: data.map((record) => {
        const match = record.buyer.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          buyer: (
            <span>
              {record.buyer.split(reg).map((text, i) => (
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
      render: (text, record, index) => <span style={{color: record.key == 1 ? "red" : "black"}}>{record.status}</span> 
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
      render: (text, record, index) => (<Link to={"/supplier/employdetail/" + record.id} >{record.id}</Link>),   
    }, {
      title: 'Job Seeker/Worker',
      dataIndex: 'worker',
      key: 'worker',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextWorker}
            onChange={this.onInputChangeWorker}
            onPressEnter={this.onSearchWorker}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchWorker}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredWorker ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleWorker,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleWorker: visible,
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
      title: 'Worker ID',
      dataIndex: 'workerID',
      key: 'workerID',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextWorkerID}
            onChange={this.onInputChangeWorkerID}
            onPressEnter={this.onSearchWorkerID}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchWorkerID}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredWorkerID ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleWorkerID,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleWorkerID: visible,
        }, () => this.searchInput.focus());
      }, 
    }, {
      title: 'Primary Cost',
      dataIndex: 'buyer',
      key: 'buyer',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextBuyer}
            onChange={this.onInputChangeBuyer}
            onPressEnter={this.onSearchBuyer}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchBuyer}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredBuyer ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleBuyer,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleBuyer: visible,
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
      title: 'type',
      dataIndex: 'type',
      key: 'type', 
    }];
    return (
        <div className="gutter-example">  
            <div className="gutter-box">
                <Card title="合同列表" bordered={false}>
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={this.state.data} />
                </Card>
            </div> 
        </div>
        )
  };
} 

export default EmployList;