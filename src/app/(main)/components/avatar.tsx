"use client";

import { logout } from "@/app/actions";
import { Avatar, Button, Flex, Popover } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const UserAvatar = () => {
  const router = useRouter();
  const [userData] = useState(() => JSON.parse(global?.localStorage?.getItem("user") || "{}"));
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
        <div className="text-base">{userData.nickname}</div>
        <Avatar src={userData.headUrl}></Avatar>
      </Flex>
    </Popover>
  );
};
