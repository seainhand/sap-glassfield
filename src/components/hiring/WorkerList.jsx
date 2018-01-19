
/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { Table, Input, Button, Icon , Card } from 'antd'; 
import { Link } from 'react-router';

const data = [{
  key: '1',
  status: 'Submitted',
  id: 'N574JS00003',
  name: "Peter",
  site: "shanghai",
  supplier: 'New Energy Inc.',
  owner: 'Li Xiang',
  submitted: "2017-4-8", 
  mainDocumentID: 'CRPAJP00010298', 
  cv: "",  
}, {
  key: '2',
  status: 'Created',
  id: 'N574JS00004',
  name: "Ant",
  site: "beijing",
  supplier: 'New Energy Inc.',
  owner: 'Li Xiang',
  submitted: "2017-4-8", 
  mainDocumentID: 'CRPAJP00010298', 
  cv: "",   
}];
 
class WorkList extends Component {
   state = {
    filterDropdownVisibleId: false,
    filterDropdownVisibleName: false,
    filterDropdownVisibleSite: false,
    filterDropdownVisibleSupplier: false,
    filterDropdownVisibleOwner: false,

    data,

    searchTextId: '',
    searchTextName: '',
    searchTextSite: '',
    searchTextSupplier: '',
    searchTextOwner: '',

    filteredId: false,
    filteredName: false,
    filteredSite: false,
    filteredSupplier: false,
    filteredOwner: false,
  };
  onInputChangeId = (e) => {
    this.setState({ searchTextId: e.target.value });
  };
  onInputChangeName = (e) => {
    this.setState({ searchTextName: e.target.value });
  };
  onInputChangeSite = (e) => {
    this.setState({ searchTextSite: e.target.value });
  };
  onInputChangeSupplier = (e) => {
    this.setState({ searchTextSupplier: e.target.value });
  };
  onInputChangeOwner = (e) => {
    this.setState({ searchTextOwner: e.target.value });
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
  onSearchName = () => {
    const { searchTextName } = this.state;
    const reg = new RegExp(searchTextName, 'gi');
    this.setState({
      filterDropdownVisibleName: false,
      filtered: !!searchTextName,
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
  onSearchSupplier = () => {
    const { searchTextSupplier } = this.state;
    const reg = new RegExp(searchTextSupplier, 'gi');
    this.setState({
      filterDropdownVisibleSupplier: false,
      filtered: !!searchTextSupplier,
      data: data.map((record) => {
        const match = record.supplier.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          supplier: (
            <span>
              {record.supplier.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  };
  onSearchOwner = () => {
    const { searchTextOwner } = this.state;
    const reg = new RegExp(searchTextOwner, 'gi');
    this.setState({
      filterDropdownVisibleOwner: false,
      filtered: !!searchTextOwner,
      data: data.map((record) => {
        const match = record.owner.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          owner: (
            <span>
              {record.owner.split(reg).map((text, i) => (
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
        text: 'Submitteded',
        value: 'Submitteded',
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
      render: (text, record, index) => (<Link to={"/hiring/workerdetail/" + record.id} >{record.id}</Link>),   
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextName}
            onChange={this.onInputChangeName}
            onPressEnter={this.onSearchName}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchName}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredName ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleName,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleName: visible,
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
      title: 'supplier',
      dataIndex: 'supplier',
      key: 'supplier',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextSupplier}
            onChange={this.onInputChangeSupplier}
            onPressEnter={this.onSearchSupplier}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchSupplier}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredSupplier ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleSupplier,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleSupplier: visible,
        }, () => this.searchInput.focus());
      }, 
    }, {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',  
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={this.state.searchTextOwner}
            onChange={this.onInputChangeOwner}
            onPressEnter={this.onSearchOwner}
            className="search-input"
          />
          <Button type="primary" onClick={this.onSearchOwner}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.filteredOwner ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisibleOwner,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisibleOwner: visible,
        }, () => this.searchInput.focus());
      }, 
    }, {
      title: 'submitted',
      dataIndex: 'submitted',
      key: 'submitted',  
    }, {
      title: 'Main Document ID',
      dataIndex: 'mainDocumentID',
      key: 'mainDocumentID', 
      render: (text, record, index) => (<Link to={"/hiring/orderdetail/" + record.mainDocumentID} >{record.mainDocumentID}</Link>),  
    }, {
      title: 'CV',
      dataIndex: 'cv',
      key: 'cv', 
    }];
    return (
        <div className="gutter-example">  
            <div className="gutter-box">
                <Card title="员工列表" bordered={false}>
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={this.state.data} />
                </Card>
            </div> 
        </div>
        )
  };
} 

export default WorkList;