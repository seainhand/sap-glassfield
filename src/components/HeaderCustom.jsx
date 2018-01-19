/**
 * Created by lixiang on 2017/4/13.
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout, Badge, Input, AutoComplete } from 'antd';
const Search = Input.Search;
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import screenfull from 'screenfull';
import { gitOauthToken, gitOauthInfo } from '../axios';
import { queryString } from '../utils';
import avater from '../style/imgs/b1.jpg';

const dataSource = ["aaa", "baba", "ccc", "cdfdcc", "c1scc", "ccac", "cczzc"];

class HeaderCustom extends Component {
    state = {
        user: '',
        dataSource: dataSource
    };
    componentDidMount() {
        const QueryString = queryString(); 
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            this.setState({
                user: _user
            });
        }
    };
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };
    searchPublisher = (e) => { 
        const data = [];
        dataSource.map((publisher, i) => { 
            if(publisher.indexOf(e) > -1) data.push(publisher) 
        })  
        this.setState({
            dataSource: data
        }) 
    };
    render() { 
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" > 
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'left' }}
                > 
                    <Menu.Item key="aaa" style={{border: 0}}>
                        <label style={{marginLeft: "16px", marginRight: "5px", fontSize: "16px", color: "#000"}}>publishers : </label>
                        <AutoComplete
                            className="certain-category-search"
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={false}
                            dropdownStyle={{ width: 300 }}
                            size="large"
                            style={{ width: '100%' }}
                            dataSource={this.state.dataSource}
                            placeholder="input here"
                            optionLabelProp="value"
                            onSearch={this.searchPublisher}
                        >
                            <Search 
                                style={{ width: 200 }}
                                onSearch={value => console.log(value)} 
                                size="large"
                            /> 
                        </AutoComplete>
                    </Menu.Item>
                </Menu>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                > 

                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.state.user.login}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}

export default HeaderCustom;