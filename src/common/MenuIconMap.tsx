// 映射菜单表图标
import { UserOutlined } from "@ant-design/icons";
export const iconList: any = {
  "/home": <UserOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />,
};

// 模拟菜单数据
export const menuList = [
  {
    key: "/home",
    label: "首页",
    icon: <UserOutlined />,
  },
  {
    key: "/lin",
    label: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user-manage/list",
        label: "用户列表",
        icon: <UserOutlined />,
      },
    ],
  },
];
