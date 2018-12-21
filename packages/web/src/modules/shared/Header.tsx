import * as React from "react";
import { Layout, Icon, Menu } from "antd";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export class Header extends React.PureComponent {
  render() {
    return (
      <div>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <a style={{ display: "inline" }} href="/listings">
                listings
              </a>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <a style={{ display: "inline" }} href="/create-listing">
                create listing
              </a>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <a style={{ display: "inline" }} href="/register">
                  register
                </a>
              </Menu.Item>
              <Menu.Item key="4">
                <a style={{ display: "inline" }} href="/login">
                  login
                </a>
              </Menu.Item>
              <Menu.Item key="5">
                <a style={{ display: "inline" }} href="/logout">
                  logout
                </a>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </div>
    );
  }
}
