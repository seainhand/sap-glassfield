/**
 * Created by lixiang on 2017/7/13.
 */ 
import React, { Component } from 'react';
import { Upload, Table, message, Card, Steps, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import { hashHistory } from 'react-router'; 
const FormItem = Form.Item;
const Step = Steps.Step;
const Option = Select.Option; 
 
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

class WorkerForms extends Component {
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

    submit = () => {
      message.success('上传员工成功')
      setTimeout(() => {
        hashHistory.push('/supplier/orderlist')
      }, 1000) 
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
                    label={(
                        <span>
                            员工ID&nbsp;
                            <Tooltip title="每个注册员工有一个ID码">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: '请输入员工ID!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="员工姓名"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="开始时间"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认你的密码!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="结束时间"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认你的密码!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="简历"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [],
                    })(
                      <Upload {...props}>
                        <Button>
                          <Icon type="upload" /> Click to Upload
                        </Button>
                      </Upload>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="profile picture"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [],
                    })(
                      <Upload {...props}>
                        <Button>
                          <Icon type="upload" /> Click to Upload
                        </Button>
                      </Upload>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            昵称&nbsp;
                            <Tooltip title="别人怎么称呼你?">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem> 
                <FormItem
                    {...formItemLayout}
                    label="描述"
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
                    label="每日薪水"
                    hasFeedback
                >
                    {getFieldDecorator('salary', {
                        rules: [{
                            required: true, message: '请输入每日薪水!',
                        }],
                    })(
                        <Input />
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
              title: '填写工人信息',
              content: workerForm,
            }, {
              title: '请确认信息',
              content: resultTable,
            }];
        return (
        <div className="gutter-example">  
            <div className="gutter-box">
                <Card title="员工表单" bordered={false}>
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
 
const WorkerForm = Form.create()(WorkerForms);

export default WorkerForm;