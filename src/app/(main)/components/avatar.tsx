"use client";

import { logout } from "@/app/actions";
import { Avatar, Button, Flex, Popover } from "antd";
import { redirect, useRouter } from "next/navigation";

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

export const UserAvatar = () => {
  const router = useRouter();
  return (
    <Popover
      placement="bottomRight"
      content={
        <Button
          type="text"
          onClick={() => {
            logout();
            router.replace("/sign-in");
          }}>
          退出登录
        </Button>
      }>
      <Flex align="center" gap={16} className="cursor-pointer">
        <div className="text-base">{data.nickname}</div>
        <Avatar src={data.guildIcon}></Avatar>
      </Flex>
    </Popover>
  );
};
