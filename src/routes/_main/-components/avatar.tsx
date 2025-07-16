"use client";
import { Avatar, Button, Flex, Popover } from "antd";
import { useAtom } from "jotai/react";
import { useLogout } from "@/hooks/logout";
import { userAtom } from "@/store";

export const UserAvatar = () => {
	const [userData] = useAtom(userAtom);
	const toLogout = useLogout();

	return (
		<Popover
			placement="bottomRight"
			content={
				<Button type="text" onClick={toLogout}>
					退出登录
				</Button>
			}
		>
			<Flex align="center" gap={16} className="cursor-pointer">
				<div className="text-base">{userData?.nickname}</div>
				<Avatar src={userData?.headUrl}></Avatar>
			</Flex>
		</Popover>
	);
};
