import type { ItemType } from "antd/es/menu/interface";

type IRoute = {
	title: string;
	href: string;
	children?: IRoute[];
};
export const routes = [
	{
		title: "首页",
		href: "/dashboard",
	},
	{
		title: "数据管理",
		href: "/dataManage",
	},
	{
		title: "签约管理",
		href: "/sign",
		children: [
			{
				title: "签约用户管理",
				href: "/members",
			},
			{
				title: "签约申请",
				href: "/apply",
			},
			{
				title: "解约申请",
				href: "/remove",
			},
			{
				title: "违规记录",
				href: "/punish",
			},
		],
	},
	{
		title: "聊天室管理",
		href: "/chatRoom",
		children: [
			{
				title: "经营状况",
				href: "/statics",
			},
			{
				title: "房间信息",
				href: "/roomInfo",
				hideChildren: true,
				children: [{ title: "房间详情", href: "/detail" }],
			},
		],
	},
	{
		title: "工会管理",
		href: "/union",
		children: [
			{
				title: "人员设置",
				href: "/members",
			},
			{
				title: "操作日志",
				href: "/log",
			},
			{
				title: "账号管理",
				href: "/account",
			},
		],
	},
	{
		title: "房间管理",
		href: "/room",
		children: [{ title: "房间牌照管理", href: "/license" }],
	},
];

export const routeMap: Record<
	string,
	{ title: string; href: string; children?: IRoute[] }[]
> = {};

const flatRoutesToMenuList = (
	routes: (IRoute & { hideChildren?: boolean })[],
	key?: string,
	routeList?: IRoute[],
): ItemType[] => {
	return routes.map((item) => {
		const { title, href, children, hideChildren } = item;
		if (!children?.length || hideChildren) {
			routeMap[`${key || ""}${href}`] = [...(routeList || []), item];
		}
		const childrenData = children?.length
			? {
					children: flatRoutesToMenuList(children, `${key || ""}${href}`, [
						...(routeList || []),
						item,
					]),
				}
			: {};
		return {
			label: title,
			title,
			key: `${key || ""}${href}`,
			...(hideChildren ? {} : childrenData),
		};
	});
};

export const menuList = flatRoutesToMenuList(routes);

// console.log(routeMap);
