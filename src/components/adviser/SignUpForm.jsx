/**
 * Created by lixiang on 2017/7/19.
 */
import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Card, Radio } from 'antd';
import { hashHistory } from 'react-router'; 
import '../../style/pages/intlTelInput.less'
const InputGroup = Input.Group;
// import '../public/intlTelInput.js';
// import '../../style/pages/intlTelInput.less';
// import '../../style/pages/signup.less';
const FormItem = Form.Item;
const Option = Select.Option; 
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class SignUpForms extends Component {
    state = {
        confirmDirty: false,
        telephoneConfirm: false
    };
    handleSubmit = (e) => {
        e.preventDefault(); 
        if (!this.state.telephoneConfirm) {
            document.getElementById("telephone-err").style.opacity = 1;
            document.getElementById("telephone-err").style.filter = 'alpha(opacity=100)';
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err && this.state.telephoneConfirm) {
                console.log('Received values of form: ', values);
                hashHistory.push("/Dashboard"); 
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
    //由于注册手机号用的插件 所以有诸多地方需要设置
    telephoneConfirm = (e) => {
        if (e.target.value) {
            document.getElementById("telephone-err").style.opacity = 0;
            document.getElementById("telephone-err").style.filter = 'alpha(opacity=0)';
            this.setState({
                telephoneConfirm: true
            })
        } else {
            document.getElementById("telephone-err").style.opacity = 1;
            document.getElementById("telephone-err").style.filter='alpha(opacity=100)';
            this.setState({
                telephoneConfirm: false
            })
        }

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
        return ( 
            <div className="signup">  
                <Card title="Sign Up" style={{width: "700px", margin: "20px auto"}}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="First Name"
                            hasFeedback
                        >
                            {getFieldDecorator('firstName', {
                                rules: [{
                                    required: true, message: 'First Name cannot be blank.',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Last Name"
                            hasFeedback
                        >
                            {getFieldDecorator('lastName', {
                                rules: [{
                                    required: true, message: 'Last Name cannot be blank.',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Company name"
                            hasFeedback
                        >
                            {getFieldDecorator('companyName', {
                                rules: [{
                                    required: true, message: 'Company name cannot be blank.',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Email"
                            hasFeedback
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'Please enter a valid email address.',
                                }, {
                                    required: true, message: 'Please enter email address.',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Password"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please enter password!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Password again"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Password Repeat cannot be blank.',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>

                        <FormItem
                          {...formItemLayout}
                          label="Telephone"
                          required
                        >  
                           {getFieldDecorator('telephone')(
                                <Input onBlur={this.telephoneConfirm}/>
                            )}
                        </FormItem>
 
                        <FormItem
                            {...formItemLayout}
                            label="Country"
                            hasFeedback
                        >
                            {getFieldDecorator('country', {
                                rules: [{
                                    required: true, message: 'Country cannot be blank.',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem> 
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">Register</Button>
                        </FormItem>
                    </Form> 
                </Card>
            </div> 
        )
    }
}

const SignUpForm = Form.create()(SignUpForms);

export default SignUpForm;