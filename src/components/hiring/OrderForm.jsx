/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { DatePicker, Card, Form, Input, Icon, 
         Cascader, Select, Row, Col, Table, Button ,InputNumber, Steps, message } from 'antd';
import { hashHistory } from 'react-router'; 
// import TemplateTable from './TemplateTable';
require('../../style/hiring/create.less');
const { RangePicker } = DatePicker; 
const Step = Steps.Step;


const FormItem = Form.Item;
const Option = Select.Option; 
const residences = [{
    value: 'IT',
    label: 'IT',
    children: [{
        value: 'engineer',
        label: '工程师',
        children: [{
            value: 'front',
            label: '前端工程师',
        }],
    }],
}, {
    value: 'produck',
    label: '产品',
    children: [{
        value: 'create',
        label: '创造型',
        children: [{
            value: 'user',
            label: '用户端',
        }],
    }],
}];

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
  name: '预算',
  information: "60000", 
}, {
  key: '2',
  name: '单号',
  information: "3520DC5", 
}];

const postingData = [{
  key: '1',
  name: '工期',
  information: "2017-8-2 2017-8-20", 
}, {
  key: '2',
  name: '需要人数',
  information: "5", 
}, {
  key: '3',
  name: '需要职业',
  information: "会计", 
}, {
  key: '4',
  name: '相关描述',
  information: "优秀", 
}, {
  key: '5',
  name: '是否需要出差',
  information: "是", 
}, {
  key: '6',
  name: '需要人数',
  information: "5", 
}, {
  key: '2',
  name: '前往城市',
  information: "5", 
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

class OrderForms extends Component {
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
    next() { 
      if (this.state.current == 0) {
        this.props.form.validateFieldsAndScroll((err, values) => { 
            if (!err) {
                console.log('Received values of form: ', values);
                const current = this.state.current + 1;
                this.setState({ current });
            } else {
              
            }
        });
      }  
    }
    prev() {
      const current = this.state.current - 1;
      this.setState({ current });
    }
    submit = () => {
      message.success('Processing complete!')
      hashHistory.push('/hiring/orderlist')
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        const { current } = this.state; 
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
        const requestForm = (
            <Form onSubmit={this.handleSubmit}> 
                <FormItem
                    {...formItemLayout}
                    label="日期"
                    hasFeedback
                >
                    {getFieldDecorator('date', {
                        rules: [{
                            required: true, message: '请输入日期!',
                        }],
                    })(
                        <RangePicker onChange={this.onChange} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="需要人数"
                    hasFeedback
                >
                    {getFieldDecorator('personNum', {
                        rules: [{
                            required: true, message: '请输入您需要的人数!',
                        }],
                    })(
                        <InputNumber 
                            initialValue={1}
                            formatter={value => `${Math.abs(Math.floor(value))}`}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="需要职业"
                    hasFeedback
                >
                    {getFieldDecorator('job', {
                        initialValue: ['IT', 'engineer', 'front'],
                        rules: [{ type: 'array', required: true, message: '请输您需要什么技能的人!' }],
                    })(
                        <Cascader options={residences} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="相关描述"
                    hasFeedback
                >
                    {getFieldDecorator('description', {
                        rules: [{
                            required: true, message: '请确认你的密码!',
                        }],
                    })(
                        <Input type="textarea" rows={4}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="是否需要出差"
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="前往城市"
                >
                    {getFieldDecorator('residence', {
                        initialValue: '北京',
                        rules: [{ required: true, message: '请选择你的常住地址!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="业务部门"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入你的电话号码!' }],
                    })(
                        <Input />

                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="预算"
                    hasFeedback
                >
                    {getFieldDecorator('cost', {
                        rules: [{
                            required: true, message: '请输入您的预算!',
                        }],
                    })(
                        <InputNumber 
                            initialValue={1}
                            formatter={value => `${Math.abs(Math.floor(value))}`}
                        />
                    )}
                </FormItem>   
            </Form>);
        // const templateTable = (<TemplateTable />)
        const resultTable = (
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
        );

        const steps = [{
          title: '填写表单',
          content: requestForm,
        }, {
          title: '请确认信息',
          content: resultTable,
        }];
        return (
        <div className="gutter-example">  
            <div className="gutter-box">
                <Card title="订单填写" bordered={false}>
                    <Steps current={current}>
                      {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content" style={{padding: "20px",backgroundColor: "#fff"}}>{steps[this.state.current].content}</div>
                    <div className="steps-action">
                      {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                      }
                      {
                        this.state.current === steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.submit()}>Done</Button>
                      }
                      {
                        this.state.current > 0
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                          Previous
                        </Button>
                      }
                    </div>
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



const HiringOrderForm = Form.create()(OrderForms);

export default HiringOrderForm;