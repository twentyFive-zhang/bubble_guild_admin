import { Avatar, Flex, Layout } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Menus from "./components/menus";
import PageTitle from "./components/pageTitle";
import { UserAvatar } from "./components/avatar";

const data = {
  // token，后续请求的时候，需要在请求头上加Token: 6834a4254791431fb9eb4b8374301cd3#1#3
  token: "6834a4254791431fb9eb4b8374301cd3#1#3",
  // 用户ID
  userId: 1,
  // 用户编码
  userCode: "55037344",
  // 用户昵称
  nickname: "云若雨",
  // 用户头像
  headUrl:
    "https://dimengbubble-test.oss-cn-shenzhen.aliyuncs.com/default_head/default_head_male.jpg",
  // 公会ID
  guildId: 3,
  // 公会编码
  guildCode: "9365238",
  // 公会名称
  guildName: "测试三号公会",
  // 公会图标
  guildIcon:
    "https://dimengbubble-test.oss-cn-shenzhen.aliyuncs.com/5da513ba89fe451da4172d29681725c3.jpg",
  // 角色：1-会长 2-管理 10-普通成员
  role: 1,
  roleName: "会长",
};
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="h-screen">
      <Header className="!bg-white">
        <Flex justify="space-between" align="center" className="h-full">
          <Flex align="center" gap={16}>
            <Avatar src={data.guildIcon} size="large"></Avatar>
            <div className="text-lg font-bold">运营后台</div>
          </Flex>
          <UserAvatar></UserAvatar>
        </Flex>
      </Header>
      <Layout hasSider>
        <Sider theme="light" className="h-full overflow-y-auto">
          <Menus></Menus>
        </Sider>
        <Content className="p-5 h-full overflow-y-auto">
          <PageTitle>{children}</PageTitle>
        </Content>
      </Layout>
    </Layout>
  );
}
