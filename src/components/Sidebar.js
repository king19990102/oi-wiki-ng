/** @jsx jsx */
import Link from "./Link"
import { jsx } from "theme-ui"
import { Layout, Menu, Icon } from "antd"
import pathList from "../sidebar.yaml"
import SubMenu from "antd/lib/menu/SubMenu"
import Sider from "antd/lib/layout/Sider"

function Item(props) {
  // console.log(props);
  // const {items, ...other} = props;
  // console.log(items, other);
  const items = props
  const arr = Object.entries(items)[0]
  // console.log(arr);
  const key = arr[0],
    value = arr[1]
  // console.log(value);
  // if (value.length)
  if (typeof value === "string") {
    return (
      <Menu.Item key={key}>
        <Link to={value}>
          <span>{key}</span>
        </Link>
      </Menu.Item>
    )
    return ret
  }
  // array
  return (
    <SubMenu key={key} title={<span>{key}</span>}>
      {value.map(item => Item(item))}
    </SubMenu>
  )
  return ret
}

function openkey(props, pathname) {
  const items = props
  const arr = Object.entries(items)[0]
  const key = arr[0],
    value = arr[1]
  if (typeof value === "string") {
    if (value === pathname) return [key]
    return null
  }
  var ret = null
  value.forEach(item => {
    var k = openkey(item, pathname)
    if (k != null) ret = k
  })
  if (ret != null) ret.push(key)
  return ret
}

export default function(props) {
  // console.log(pathList)
  pathList.map(item => Item(item))
  var okey = null
  pathList.forEach(item => {
    var k = openkey(item, props.pathname)
    if (k != null) okey = k
  })
  if (okey == null) okey = []
  return (
    <Sider
      breakpoint="xl"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken)
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type)
      }}
      theme="light"
      width="300px"
      {...props}
    >
      <Menu
        theme="light"
        defaultSelectedKeys={[okey[0]]}
        defaultOpenKeys={okey}
        mode="inline"
        sx={{
            height: "100%", borderRight: 0,
            overflowY:"hidden",
            overflowX:"hidden",
            ':hover': {
                overflowY:"auto"
            }
        }}
      >
        {pathList.map(item => Item(item))}
      </Menu>
    </Sider>
  )
}
