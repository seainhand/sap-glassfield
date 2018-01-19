/**
 * Created by lixiang on 2017/7/13.
 */ 
import React, { Component } from 'react';
import { Upload, Tooltip, Table, message, Card, Steps, Form, Input, DatePicker, 
         Icon, Cascader, Radio, Select, Row, Col, Checkbox, Button } from 'antd';
import { hashHistory } from 'react-router'; 
const FormItem = Form.Item;
const { RangePicker } = DatePicker; 
const Step = Steps.Step;
const Option = Select.Option; 
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
 
const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

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

class HringForms extends Component {
    state = {
        confirmDirty: false,
        current: 0,
    };
    next() {
      if (this.state.current == 1) {
        this.props.form.validateFieldsAndScroll((err, values) => { 
              console.log('Received values of form: ', values); 
        });
      }  
      const current = this.state.current + 1;
      this.setState({ current });
    }
    prev() {
      const current = this.state.current - 1;
      this.setState({ current });
    }
    submit = () => {
        message.success('提交成功!')
        setTimeout(() => {
            hashHistory.push('/hiring/employlist') 
        }, 500)
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
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
        }]; 
        const workerForm = (
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
                  label="Time Sheet Type"
                >
                  {getFieldDecorator('timeSheetType', {
                        rules: [{
                            required: true, message: 'Time Sheet Type cannot be blank.',
                        }],
                    })(
                    <RadioGroup>
                      <Radio value="0">Standard</Radio>
                      <Radio value="1">Time In/Time Out</Radio> 
                      <Radio value="2">No Time Sheets</Radio> 
                    </RadioGroup>
                  )}
                </FormItem> 
                <FormItem
                  {...formItemLayout}
                  label="Time Sheet Frequency"
                >
                  {getFieldDecorator('timeSheetFrequency', {
                        rules: [{
                            required: true, message: 'Time Sheet Frequency cannot be blank.',
                        }],
                    })(
                    <RadioGroup>
                      <Radio value="0">Weekly</Radio> 
                    </RadioGroup>
                  )}
                </FormItem> 
                <FormItem
                  {...formItemLayout}
                  label="Allow time in hundaedths of hours on time sheet"
                >
                  {getFieldDecorator('timeInHundaedths', {
                        rules: [{
                            required: true, message: 'cannot be blank.',
                        }],
                    })(
                    <RadioGroup>
                      <Radio value="0">Yes</Radio>
                      <Radio value="1">No</Radio> 
                    </RadioGroup>
                  )}
                </FormItem> 
                <FormItem
                  {...formItemLayout}
                  label="Issue warning if hours per day are exceeded on time sheet"
                >
                  {getFieldDecorator('issueWarning', {
                        rules: [{
                            required: true, message: 'Issue Warning cannot be blank.',
                        }],
                    })(
                    <RadioGroup>
                      <Radio value="0">Yes</Radio>
                      <Radio value="1">No</Radio> 
                    </RadioGroup>
                  )}
                </FormItem> 

                <FormItem
                    {...formItemLayout}
                    label="每天工作小时"
                    hasFeedback
                >
                    {getFieldDecorator('personNum', {
                        rules: [{
                            required: true, message: '请输入您需要的人数!',
                        }],
                    })(
                        <Input
                            type="number" 
                            initialValue={1}
                            formatter={value => `${Math.abs(Math.floor(value))}`}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="每周工作天数"
                    hasFeedback
                >
                    {getFieldDecorator('personNum', {
                        rules: [{
                            required: true, message: '请输入您需要的人数!',
                        }],
                    })(
                        <Input
                            type="number" 
                            initialValue={1}
                            formatter={value => `${Math.abs(Math.floor(value))}`}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="总工作天数"
                    hasFeedback
                >
                    {getFieldDecorator('personNum', {
                        rules: [{
                            required: true, message: '请输入您需要的人数!',
                        }],
                    })(
                        <Input
                            type="number" 
                            initialValue={1}
                            formatter={value => `${Math.abs(Math.floor(value))}`}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Maximum Expense"
                    hasFeedback
                >
                    {getFieldDecorator('personNum', {
                        rules: [{
                            required: true, message: '请输入您需要的人数!',
                        }],
                    })(
                        <Input
                            type="number" 
                            step="0.01"
                            initialValue={1}
                            formatter={value => `${Math.abs(Math.floor(value))}`}
                        />
                    )}
                </FormItem>


                 
                <FormItem
                    {...formItemLayout}
                    label="Comments To Buyer"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入描述!',
                        }],
                    })(
                        <Input  type="textarea" rows={4} />
                    )}
                </FormItem> 
                <FormItem
                    {...formItemLayout}
                    label="Comments To Supplier"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入描述!',
                        }],
                    })(
                        <Input  type="textarea" rows={4} />
                    )}
                </FormItem>    
            </Form>
        ); 
        const resultTable = (
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="User Information" >
                        <Table pagination={{ pageSize: 5 }} columns={userColumns} dataSource={userData} />
                    </Card>
                    <Card title="Employ Information" style={{marginTop: "20px"}}>
                        <Table pagination={{ pageSize: 5 }} columns={postingColumns} dataSource={accountData} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Posting Information" >
                        <Table pagination={{ pageSize: 20 }} columns={postingColumns} dataSource={postingData} />
                    </Card>
                    <Card title="Qualification" style={{marginTop: "20px"}}>
                        <Table pagination={{ pageSize: 5 }} columns={qualificationColumns} dataSource={qualificationData} />
                    </Card>
                </Col>
            </Row>
        ); 
        const steps = [{
              title: '填写雇佣信息',
              content: workerForm,
            }, {
              title: '请确认信息',
              content: resultTable,
            }];
        return (
        <div className="gutter-example">  
            <div className="gutter-box">
                <Card title="雇佣合同" bordered={false}>
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
 
const EmployForm = Form.create()(HringForms);

export default EmployForm;