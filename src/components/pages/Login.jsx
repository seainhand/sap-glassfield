/**
 * Created by lixiang on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox , Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { hashHistory } from 'react-router';
const FormItem = Form.Item; 

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values); 
                if (values.userName == "hiring") {
                    hashHistory.push("/hiring/index"); 
                } else if (values.userName == "program") {
                    hashHistory.push("/app/program/dashboard/index"); 
                } else if (values.userName == "supplier") {
                    hashHistory.push("/app/supplier/dashboard/index"); 
                }
            }
        });
    };
    gitHub = () => {
        location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>Acekoala</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Username cannot be blank.' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Password cannot be blank.' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem >
                          {getFieldDecorator('userType', {
                                rules: [{
                                    required: true, message: 'User Type cannot be blank.',
                                }],
                            })(
                            <RadioGroup>
                              <Radio value="0">Publisher</Radio>
                              <Radio value="1">Advertiser</Radio> 
                            </RadioGroup>
                          )}
                        </FormItem> 
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Keep me logged in for 7 days</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>Forgot Password?</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                Log In
                            </Button>  
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

export default Form.create()(Login);