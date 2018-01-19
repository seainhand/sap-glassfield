/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
import { Link } from 'react-router';

class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: ''
    };
    componentDidMount() {
        const _path = this.props.path;
        this.setState({
            openKey: _path.substr(0, _path.lastIndexOf('/')),
            selectedKey: _path
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        console.log(this.state);

    };
    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v[v.length - 1]
        })
    };
    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsible
                collapsed={this.props.collapsed}
                onCollapse={this.onCollapse}
                style={{overflowY: 'auto'}}
            >
                <div className="logo" />
                <Menu
                    onClick={this.menuClick}
                    theme="dark"
                    mode={this.state.mode}
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={[this.state.openKey]}
                    onOpenChange={this.openMenu}
                > 
 
                    
                    <SubMenu
                        key="/hiring"
                        title={<span><Icon type="scan" /><span className="nav-text">Hiring</span></span>}
                    >
                        <Menu.Item><Link to={'/hiring/index'}>首页</Link></Menu.Item>
                        <Menu.Item><Link to={'/hiring/templatetable'}>创建订单</Link></Menu.Item>
                        <Menu.Item><Link to={'/hiring/orderlist'}>订单列表</Link></Menu.Item>
                        <Menu.Item><Link to={'/hiring/workerlist'}>人员列表</Link></Menu.Item>
                        <Menu.Item><Link to={'/hiring/employlist'}>合同列表</Link></Menu.Item>

                    </SubMenu>  
                    <SubMenu
                        key="/supplier"
                        title={<span><Icon type="chrome" /><span className="nav-text">Supplier</span></span>}
                    >
                        <Menu.Item><Link to={'/supplier/index'}>首页</Link></Menu.Item> 
                        <Menu.Item><Link to={'/supplier/orderlist'}>订单列表</Link></Menu.Item> 
                        <Menu.Item><Link to={'/supplier/workerlist'}>人员列表</Link></Menu.Item>
                        <Menu.Item><Link to={'/supplier/employlist'}>合同列表</Link></Menu.Item>
                    </SubMenu>  
                    <SubMenu
                        key="/adviser"
                        title={<span><Icon type="shop" /><span className="nav-text">Adviser</span></span>}
                    >
                        <Menu.Item key="/index"><Link to={'/adviser/signup'}>signup</Link></Menu.Item> 
                    </SubMenu> 
                   
 
                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}


                    // <SubMenu
                    //     key="/campaign"
                    //     title={<span><Icon type="scan" /><span className="nav-text">campaign</span></span>}
                    // >

                    //     <Menu.Item key="/campaign"><Link to={'/campaign/create'}>Create</Link></Menu.Item> 
                    //     <Menu.Item key="/index"><Link to={'/campaign/index'}>campaign</Link></Menu.Item> 
                    // </SubMenu> 
export default SiderCustom;