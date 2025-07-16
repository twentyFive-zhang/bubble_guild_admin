import dayjs, { type Dayjs } from "dayjs";
import { atomWithStorage } from "jotai/utils";

const baseData = [
	{
		name: "全部用户",
		disabled: true,
		key: "1",
	},
	{
		name: "今日活跃",
		disabled: true,
		key: "2",
		activeDate: [dayjs().format("YYYYMMDD"), dayjs().format("YYYYMMDD")],
	},
	{
		name: "新签约",
		disabled: true,
		key: "3",
		signDate: [
			dayjs().subtract(7, "day").format("YYYYMMDD"),
			dayjs().format("YYYYMMDD"),
		],
	},
];

// type ITab = { name: string; key: string } & Partial<{
// 	userCode: string;
// 	disabled: boolean;
// 	activeDate: Dayjs[];
// 	signDate: Dayjs[];
// 	date: Dayjs[];
// }>;

type ITabString = { name: string; key: string } & Partial<{
	userCode: string;
	disabled: boolean;
	activeDate: string[];
	signDate: string[];
	date: string[];
}>;

const getInitial = () => {
	const data = localStorage.getItem("memberTabs");
	const items = (data ? JSON.parse(data) : baseData) as ITabString[];
	return items.map((item) => ({
		...item,
		activeDate: item.activeDate?.map((d) => dayjs(d)),
		signDate: item.signDate?.map((d) => dayjs(d)),
		date: item.date?.map((d) => dayjs(d)),
	}));
};

export const membersTabAtom = atomWithStorage<
	({ name: string; key: string } & Partial<{
		userCode: string;
		disabled: boolean;
		activeDate: Dayjs[];
		signDate: Dayjs[];
		date: Dayjs[];
	}>)[]
>("memberTabs", getInitial(), {
	setItem(_key, value) {
		localStorage.setItem(
			"memberTabs",
			JSON.stringify(
				value.map((item) => ({
					...item,
					activeDate: item.activeDate?.map((d) => dayjs(d).format("YYYYMMDD")),
					signDate: item.signDate?.map((d) => dayjs(d).format("YYYYMMDD")),
					date: item.date?.map((d) => dayjs(d).format("YYYYMMDD")),
				})),
			),
		);
	},
	getItem() {
		return getInitial();
	},
	removeItem() {
		localStorage.removeItem("memberTabs");
	},
});
