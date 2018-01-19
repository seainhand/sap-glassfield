import React, { Component } from 'react';
import { Layout } from 'antd';
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
        publisher: '',
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    setPublisher = (publisher) => {
        this.setState({
            publisher: publisher,
        });
    };
    render() {
        return (
            <Layout className="ant-layout-has-sider">
              <SiderCustom path={this.props.location.pathname} collapsed={this.state.collapsed} />
              <Layout>
                <HeaderCustom toggle={this.toggle} setPublisher={publisher => this.setPublisher(publisher)}/>
                <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                  {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  React-Admin ©2017 Created by 396452902@qq.com
                </Footer>
              </Layout>
            </Layout>
        );
    }
}

export default App;
