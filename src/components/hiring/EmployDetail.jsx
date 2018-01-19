/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { DatePicker, Card, Form, Input, Icon, 
         Cascader, Select, Row, Col, Table, Button ,InputNumber, message } from 'antd';
import { hashHistory } from 'react-router'; 
// import TemplateTable from './TemplateTable';
require('../../style/hiring/create.less');
const { RangePicker } = DatePicker;  

const userData = [{
  key: '1',
  name: '需求方',
  information: "李想", 
}, {
  key: '2',
  name: '日期',
  information: "2017-8-2", 
}];

const accountData = [{
  key: '1',
  name: '员工',
  information: "Lex", 
}, {
  key: '2',
  name: '合同单号',
  information: "3520DC5", 
}];

const postingData = [{
  key: '1',
  name: '工期',
  information: "2017-8-2 2017-8-20", 
}, {
  key: '2',
  name: 'Time Sheet Type',
  information: "Time In/Time Out", 
}, {
  key: '3',
  name: 'Time Sheet Frequency',
  information: "Weekly", 
}, {
  key: '4',
  name: 'Allow time in hundaedths of hours on time sheet',
  information: "Yes", 
}, {
  key: '5',
  name: 'Issue warning if hours per day are exceeded on time sheet',
  information: "Yes", 
}, {
  key: '6',
  name: '每天工作小时',
  information: "5", 
}, {
  key: '7',
  name: '每周工作天数',
  information: "5", 
}, {
  key: '8',
  name: '总工作天数',
  information: "40", 
}, {
  key: '9',
  name: 'Maximum Expense',
  information: "0.58", 
}, {
  key: '10',
  name: 'Comments To Buyer',
  information: "", 
}, {
  key: '10',
  name: 'Comments To Supplier',
  information: "", 
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

class createForm extends Component {
    state = {
        confirmDirty: false,
        current: 0,
        qualificationData: qualificationData
    }; 
    onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.qualificationData];
            dataSource[index][key] = value;
            this.setState({ qualificationData: dataSource });
        };
    };
    componentWillMount() { 
        console.log("这个ID：" + this.props.params.id)
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
                <Card title="招聘表单" bordered={false}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="User Information" >
                                <Table pagination={{ pageSize: 5 }} columns={userColumns} dataSource={userData} />
                            </Card>
                            <Card title="Account" style={{marginTop: "20px"}}>
                                <Table pagination={{ pageSize: 5 }} columns={postingColumns} dataSource={accountData} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Posting Information" >
                                <Table pagination={{ pageSize: 5 }} columns={postingColumns} dataSource={postingData} />
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



const EmployDetail = Form.create()(createForm);

export default EmployDetail;