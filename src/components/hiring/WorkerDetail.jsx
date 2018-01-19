/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { Rate, Modal, Card, Icon, Cascader, Select, Row, Col, Table, Button, Input, message } from 'antd';
import ScheduleInterview from './ScheduleInterview';
import { hashHistory } from 'react-router'; 
// import TemplateTable from './TemplateTable';  

const userData = [{
  key: '1',
  name: 'cost',
  information: "10000", 
}, {
  key: '2',
  name: 'date',
  information: "2017-2-2", 
}];

const postingData = [{
  key: '1',
  name: 'Id',
  information: "N574JS00003", 
}, {
  key: '2',
  name: 'Name',
  information: "Peter", 
}, {
  key: '3',
  name: 'City',
  information: "shanghai", 
}, {
  key: '4',
  name: 'Supplier',
  information: "New Energy Inc.", 
}, {
  key: '5',
  name: 'Owner',
  information: "Li Xiang", 
}];

const documentData = [{
  key: '1',
  name: 'Main Document ID',
  information: "CRPAJP00010298", 
}, {
  key: '2',
  name: 'Document Title',
  information: "antd", 
}];

const qualificationData = [{
  key: '1',
  name: '工作年限',
  information: "8年", 
}, {
  key: '2',
  name: '资格证书',
  information: "有", 
}];


class WorkerDetail extends Component {
    state = { 
        qualificationData: qualificationData,
        interviewVisible: false 
    };  
    componentWillMount() { 
        console.log("这个ID：" + this.props.params.id)
    } 
    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.qualificationData];
            dataSource[index][key] = value;
            this.setState({ qualificationData: dataSource });
        };
    };
    showInterviewModal = () => {
        this.setState({
          interviewVisible: true,
        });
    };
    passWorker = () => {  
        hashHistory.push('/hiring/employform/' + this.props.params.id)  
    };  
    handleOk = (e) => {
        console.log(e);
        this.setState({
          interviewVisible: false,
        });
        message.success('提交成功!')
      }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
          interviewVisible: false,
        });
    }
    render() {  
        const userColumns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: 'Information',
          dataIndex: 'information',
          key: 'information', 
        }]; 

        const postingColumns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: 'Information',
          dataIndex: 'information',
          key: 'information', 
        }]; 

        const qualificationColumns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: 'Information',
          dataIndex: 'information',
          key: 'information', 
          render: (text, record, index) => (
            <EditableCell
              value={text}
              onChange={this.onCellChange(index, 'name')}
            />
          ),
        }];   
        return (
        <div className="gutter-example">  
            <div className="gutter-box">  
                <Card title="员工信息" bordered={false}>

                    <Row gutter={16} justify="left" type="flex" style={{ marginBottom: "24px", position: "relative"}}> 
                      <Col>
                        <Button style={{ width: "100px" }} type="primary" size="large" onClick={this.showInterviewModal} >
                            面试
                        </Button>
                        <Modal
                          title="Basic Modal"
                          visible={this.state.interviewVisible} 
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                        >
                          <ScheduleInterview />
                        </Modal>
                      </Col> 
                      <Col>
                        <Button style={{ width: "100px" }} size="large" onClick={this.passWorker} >
                            雇佣
                        </Button>
                      </Col> 
                    </Row> 
                    <Row gutter={16}>
                      <Col span={12}>
                      </Col> 
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Account" >
                                <Table pagination={{ pageSize: 5 }} columns={userColumns} dataSource={userData} />
                            </Card>
                            <Card title="Posting Information" style={{marginTop: "20px"}}>
                                <Table pagination={{ pageSize: 5 }} columns={postingColumns} dataSource={postingData} />
                                
                            </Card>
                        </Col>
                        <Col span={12}> 
                            <Card title="评分" style={{minHeight: "200px"}}>
                                <Row gutter={16}>
                                  <Rater title="技术"/>
                                </Row>
                                <Row gutter={16}>
                                  <Rater title="能力"/>
                                </Row>
                            </Card>
                            <Card title="Document Information" style={{marginTop: "20px"}} >
                                <Table pagination={{ pageSize: 5 }} columns={postingColumns} dataSource={documentData} />
                            </Card>
                            <Card title="Qualification" style={{marginTop: "20px"}}>
                                <Table pagination={{ pageSize: 5 }} columns={qualificationColumns} dataSource={this.state.qualificationData} />
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </div> 
        </div>
        )
    }
}

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}


class Rater extends React.Component {
  state = {
    value: 3,
    count: null,
  }
  handleChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    const title = this.props.title;
    return (
      <div style={{margin: "10px"}}> 
        <Rate onChange={this.handleChange} value={value} />
        {value && <span className="ant-rate-text">{title} : {value} stars</span>}
      </div>
    );
  }
}

 

export default WorkerDetail;