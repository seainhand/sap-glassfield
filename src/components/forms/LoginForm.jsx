/**
 * Created by lixiang on 2017/4/14.
 */
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        alert('??')
    };
    render() { 
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                <FormItem> 
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            
                </FormItem>
                <FormItem> 
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    
                </FormItem>
                <FormItem> 
                        <Checkbox>记住我</Checkbox>
                    
                    <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                        登录
                    </Button>
                    或 <a href="">现在就去注册!</a>
                </FormItem>
            </Form>
        );
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;