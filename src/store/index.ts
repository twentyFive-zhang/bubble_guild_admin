import { atomWithStorage } from "jotai/utils";

export const tokenAtom = atomWithStorage(
	"token",
	localStorage.getItem("token") || "",
	{
		setItem(_key, value) {
			localStorage.setItem("token", value);
		},
		getItem() {
			return localStorage.getItem("token") || "";
		},
		removeItem() {
			localStorage.removeItem("token");
		},
	},
);

export const userAtom = atomWithStorage<
	Partial<{
		// token，后续请求的时候，需要在请求头上加Token: 6834a4254791431fb9eb4b8374301cd3#1#3
		token: string;
		// 用户ID
		userId: number;
		// 用户编码
		userCode: string;
		// 用户昵称
		nickname: string;
		// 用户头像
		headUrl: string;
		// 公会ID
		guildId: number;
		// 公会编码
		guildCode: string;
		// 公会名称
		guildName: string;
		// 公会图标
		guildIcon: string;
		// 角色：1-会长 2-管理 10-普通成员
		role: number;
		roleName: string;
	}>
>("user", JSON.parse(localStorage.getItem("user") || "{}"));
