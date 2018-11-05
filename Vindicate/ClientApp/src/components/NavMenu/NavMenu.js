import React from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import "antd/dist/antd.css";
import "./NavMenu.css";

const { Sider } = Layout;

class NavMenu extends React.Component {
    handleClick = (e) => {
        this.props.history.push(e.item.props.url);
    }

    render() {
        return (
            <Sider style={{ overflow: 'auto', height: '100vh', maxWidth: 'unset !important', position: 'absolute', left: 0 }}
                breakpoint="lg"
                width="100%"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick}>
                    <Menu.Item key="0">
                        <h3 style={{ color: "#ffffff", marginBottom: "none", marginTop: "10px" }}>Vindicate</h3>
                        </Menu.Item>
                        <Menu.Item key="1" url="projects">
                            <Icon type="pushpin" />
                            <span className="nav-text">Projects</span>
                        </Menu.Item>
                        <Menu.Item key="2" url="issues">
                            <Icon type="info-circle" />
                            <span className="nav-text">Issues</span>
                        </Menu.Item>
                        <Menu.Item key="3" url="reports">
                            <Icon type="file" />
                            <span className="nav-text">Reports</span>
                        </Menu.Item>
                        <Menu.Item key="4" url="admin">
                            <Icon type="setting" />
                            <span className="nav-text">Administration</span>
                        </Menu.Item>
                    </Menu>
                </Sider>);
    }
}

export default withRouter(NavMenu)