import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';

import './index.styl';

const { Header, Sider, Content } = Layout;
const { Item: MenuItem } = Menu;

class LayoutMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const { collapsed } = this.state;
        this.setState({
            collapsed: !collapsed,
        });
    }

    render() {
        const { collapsed } = this.state;

        const { children } = this.props;
        return (
            <Layout className="layout-wrapper">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['user']} onClick={this.handleClick}>
                        <MenuItem key="user">
                            <Link to="/">
                                <Icon type="user" />
                                <span className="nav-text">用户管理</span>
                            </Link>
                        </MenuItem>
                        <MenuItem key="2">
                            <Link to="/label">
                                <Icon type="video-camera" />
                                <span className="nav-text">标签管理</span>
                            </Link>
                        </MenuItem>
                        <MenuItem key="3">
                            <Link to="/content">
                                <Icon type="upload" />
                                <span className="nav-text">内容管理</span>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="layout-header">
                        <Icon
                            className="trigger"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content className="layout-containers">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

LayoutMain.propTypes = {
    children: PropTypes.node,
};

LayoutMain.defaultProps = {
    children: [],
};

export default LayoutMain;
