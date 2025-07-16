import request from "@/utils/request";

export async function getVerifyCode(data: {
	phone: string;
}): Promise<API.ResponseModel> {
	return request("/send-verify-code", { data });
}

export async function updateGuildIcon(data: {
	icon: string;
}): Promise<API.ResponseModel> {
	return request("/guild/update", { data });
}

export async function uploadFile({
	file,
}: {
	file: File;
}): Promise<API.ResponseModel<string>> {
	const formData = new FormData();

	if (file) {
		formData.append("file", file);
	}

	return request("/upload", {
		data: formData,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}

export async function login(data: {
	phone: string;
	verifyCode: string;
}): Promise<
	API.ResponseModel<{
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
> {
	return request("/login", { data });
}

export async function logout() {
	return request("/logout");
}

export async function home(): Promise<
	API.ResponseModel<{
		// 公会ID
		guildId: number;
		// 公会编码：页面上显示这个字段
		guildCode: string;
		// 公会名称
		guildName: string;
		// 公会图标
		guildIcon: string;
		// 申请加入公会用户数量
		applyJoinUsers: number;
		// 申请退出公会用户数量
		applyLeaveUsers: number;
		// 今日流水
		todayTurnover: number;
		// 本周流水
		thisWeekTurnover: number;
		// 本月流水
		thisMonthTurnover: number;
		// 成员数量
		members: number;
		// 今日上线成员数量
		todayActiveUsers: number;
		// 今日获得收益成员数量
		todayIncomeUsers: number;
		// 今日获得收益成员数量相较昨日增长百分比
		todayIncomeUserIncrease: string;
		todayRoomTurnoverRankList: {
			rank: number;
			roomNo: string;
			roomName: string;
			value: number;
		}[];
		todayUserTurnoverRankList: {
			rank: number;
			userCode: string;
			nickname: string;
			value: number;
		}[];
		lastSevenDaysTurnoverList: { time: string; value: number }[];
	}>
> {
	return request("/home");
}

export async function getMemberPage(
	data: API.PageParams<{
		// 开始时间
		statStartTime: string;
		// 结束时间
		statEndTime: string;
		// 用户编码
		userCode: string;
		// 活跃时间start
		activeStartTime: string;
		// 活跃时间end
		activeEndTime: string;
		// 签约时间start
		joinStartTime: string;
		// 签约时间end
		joinEndTime: string;
	}>,
): Promise<
	API.ResponseModel<
		API.PageModel<{
			userId: number;
			// 用户编码
			userCode: string;
			// 昵称
			nickname: string;
			// 最后活跃时间
			activeTimeStr: string;
			// 流水
			turnover: number;
			// 签约时间
			joinTimeStr: string;
		}>
	>
> {
	return request("/guild-member/page", { data });
}

export async function getJoinPage(
	data: API.PageParams<{
		// 1-未处理 2-已处理
		type: string;
		// 用户编码
		userCode: string;
	}>,
): Promise<
	API.ResponseModel<
		API.PageModel<{
			// 提交审核的时候用这个字段
			id: number;
			// 用户编码
			userCode: string;
			// 昵称
			nickname: string;
			// 申请时间
			applyTimeStr: string;
			// 审核状态：1-待审核 其他的都是已处理，其他的具体状态见下面的auditStatusName
			auditStatus: number;
			// 审核状态名称
			auditStatusName: string;
		}>
	>
> {
	return request("/guild-member/join-page", { data });
}

export async function getPunishPage(
	data: API.PageParams<{
		// 开始时间：yyyyMMddHHmmss 例如202510618121212
		punishTimeStart: string;
		// 结束时间：yyyyMMddHHmmss 例如202510618121212
		punishTimeEnd: string;
		userCode: string;
	}>,
): Promise<
	API.ResponseModel<
		API.PageModel<{
			userId: number;
			userCode: string;
			nickname: string;
			joinTimeStr: string;
			reasonContent: string;
			violationsTimes: number;
			punishName: string;
			punishTimeStr: string;
		}>
	>
> {
	return request("/guild-member/punish-page", { data });
}

export async function applyJoin(data: {
	// ID列表：记得取之前列表里的ID字段，不要用userCode字段
	idList: number[];
	// 1-通过 0-拒绝
	pass: 1 | number;
}) {
	return request("/guild-member/audit-join-apply", { data });
}

export async function removeMember({ userId }: { userId: number }) {
	return request(`/guild-member/remove/${userId}`);
}

export async function applyLeave(data: {
	// ID列表：记得取之前列表里的ID字段，不要用userCode字段
	idList: number[];
	// 1-通过 0-拒绝
	pass: 1 | number;
}) {
	return request("/guild-member/audit-leave-apply", { data });
}

export async function getLeavePage(
	data: API.PageParams<{
		// 1-未处理 2-已处理
		type: string;
		// 用户编码
		userCode: string;
	}>,
): Promise<
	API.ResponseModel<
		API.PageModel<{
			// 提交审核的时候用这个字段
			id: number;
			// 用户编码
			userCode: string;
			// 昵称
			nickname: string;
			// 流水
			turnover: number;
			// 申请时间
			applyTimeStr: string;
			// 审核状态：1-待审核 其他的都是已处理，其他的具体状态见下面的auditStatusName
			auditStatus: number;
			// 审核状态名称
			auditStatusName: string;
		}>
	>
> {
	return request("/guild-member/leave-page", { data });
}

export async function getLogPage(
	data: API.PageParams<{
		// 操作类型
		urlName: string;
		// 用户编码
		userCode: string;
	}>,
): Promise<
	API.ResponseModel<
		API.PageModel<{
			// 被操作用户ID
			userId: number;
			// 被操作用户编码
			userCode: string;
			// 被操作用户昵称
			nickname: string;
			// 操作用户编码
			operateUserCode: string;
			// 操作用户昵称
			operateNickname: string;
			// 操作类型
			urlName: string;
			// 操作时间
			createTimeStr: string;
		}>
	>
> {
	return request("/log/page", { data });
}

export async function getMemberListPage(
	data: API.PageParams<{
		// 角色: 2-管理 10-普通成员
		guildUserRole: string;
		// 用户编码
		userCode: string;
	}>,
): Promise<
	API.ResponseModel<
		API.PageModel<{
			// 用户ID: 后续调用接口用这个字段
			userId: number;
			// 用户编码：页面显示用这个字段
			userCode: string;
			// 用户昵称
			nickname: string;
			// 角色
			userRole: number;
			// 角色名称
			userRoleName: string;
		}>
	>
> {
	return request("/guild-manager/member-page", { data });
}

export async function setMemberRole({
	userId,
	status,
}: {
	userId: number;
	status: 0 | 1;
}) {
	return request(`/guild-manager/update-manager/${userId}/${status}`);
}

export async function getFindStat({ timeType }: { timeType: number }): Promise<
	API.ResponseModel<{
		// 流水
		turnover: number;
		// 直送流水
		directTurnover: number;
		// 背包流水
		packageTurnover: number;
		// 活跃房间数量
		activeRoomCount: number;
		// 上麦主播数量
		upMicMembers: number;
		// 获得收益的主播数量
		incomeMembers: number;
	}>
> {
	return request(`/guild/find-stat/${timeType}`);
}

export async function getTurnoverList(data: {
	startTime: string;
	endTime: string;
}): Promise<API.ResponseModel<{ time: string; value: number }[]>> {
	return request(`/guild/turnover-list`, { data });
}

export async function getMonthStat(): Promise<
	API.ResponseModel<{
		// 成员数量
		members: number;
		// 本月新成员数量
		thisMonthNewMembers: number;
		// 本月离会成员数量
		thisMonthLeaveMembers: number;
		// 活跃房间数量
		activeRoomCount: number;
		// 流水列表
		turnoverList: {
			// 日期
			time: string;
			// 值
			value: number;
		}[];
		//成员日排名
		memberDailyRankList: {
			// 用户编码
			userCode: string;
			// 用户昵称
			nickname: string;
			// 排名
			rank: number;
			// 值
			value: number;
		}[];
		// 成员周排名
		memberWeeklyRankList: {
			// 用户编码
			userCode: string;
			// 用户昵称
			nickname: string;
			// 排名
			rank: number;
			// 值
			value: number;
		}[];
		// 成员月排名
		memberMonthlyRankList: {
			// 用户编码
			userCode: string;
			// 用户昵称
			nickname: string;
			// 排名
			rank: number;
			// 值
			value: number;
		}[];
		// 房间日排名
		roomDailyRankList: {
			// 房间编码
			roomNo: string;
			// 房间名称
			roomName: string;
			rank: number;
			value: number;
		}[];
		roomWeeklyRankList: {
			// 房间编码
			roomNo: string;
			// 房间名称
			roomName: string;
			rank: number;
			value: number;
		}[];
		roomMonthlyRankList: {
			// 房间编码
			roomNo: string;
			// 房间名称
			roomName: string;
			rank: number;
			value: number;
		}[];
	}>
> {
	return request(`/guild/month-stat`);
}

export async function getStatByTimeRange(data: {
	startTime: string;
	endTime: string;
}): Promise<
	API.ResponseModel<{
		// 流水
		turnover: number;
		// 有效活跃数
		upMicMembers: number;
		// 今日活跃数
		activeMembers: number;
		// 有效收益人数
		incomeMembers: number;
	}>
> {
	return request(`/guild/stat-by-time-range`, { data });
}

export async function getRoomList(
	data: API.PageParams<{
		// 6-周 10-月
		timeType: number;
		statTime: string;
	}>,
): Promise<
	API.ResponseModel<
		API.PageModel<{
			// 房间ID：后续调用接口，用这个字段
			roomId: number;
			// 房间编码：页面显示用这个字段
			roomNo: string;
			// 房间名称
			roomName: string;
			// 房间图标
			roomIcon: string;
			// 房间类型
			roomCategoryName: string;
			// 最后开启时间
			lastOpenTimeStr: string;
			// 流水
			turnover: number;
			// 直送流水
			directTurnover: number;
			// 背包流水
			packageTurnover: number;
			// 新用户数量
			sendGiftNewUserCount: number;
		}>
	>
> {
	return request("/guild-room/stat-list", { data });
}

export async function getRoomRankList({
	roomId,
}: API.PageParams<{ roomId?: number }>): Promise<
	API.ResponseModel<
		API.PageModel<{
			// 1-排名
			rank: number;
			// 贡献榜用户昵称
			contributeUser: string;
			// 贡献榜单值
			contributeValue: number;
			// 收益榜用户昵称
			receiveUser: string;
			// 用户榜单值
			receiveValue: number;
		}>
	>
> {
	return request(`/room-user/rank-list/${roomId}`);
}

export async function getRoomLogList(
	data: API.PageParams<
		Partial<{
			// 房间ID
			roomId: number;
			// 1-开启房间 2-关闭房间 3-更改房间信息 4-抱上麦 5-抱下麦
			// 6-麦位上锁 7-麦位解锁 8-麦位禁言 9-取消麦位禁言 10-房间内踢人
			// 11-用户禁言 12-取消用户禁言 13-加入黑名单 15-取消黑名单
			// 16-房间上锁 17-取消房间上锁
			operateType: string;
			// 用户编码
			operatedUserCode: string;
			// 开始时间: yyyyMMddHHmmss
			startTime: string;
			// 结束时间: yyyyMMddHHmmss
			endTime: string;
			pageNum: number;
			pageSize: number;
		}>
	>,
): Promise<
	API.ResponseModel<
		API.PageModel<{
			// 操作者用户编码
			operateUserCode: string;
			// 操作者用户昵称
			operateNickname: string;
			// 被操作者用户编码
			operatedUserCode: string;
			// 被操作者用户昵称
			operatedNickname: string;
			// 操作类型
			operateTypeName: string;
			// 操作时间
			createTimeStr: string;
		}>
	>
> {
	return request(`/guild-room/operate-record-page`, { data });
}

export async function getRoomHistory({ roomId }: { roomId: number }): Promise<
	API.ResponseModel<{
		// 统计时间
		statTime: string;
		// 开启天数
		openedDays: number;
		// 流水
		turnover: number;
		// 直送流水
		directTurnover: number;
		// 背包流水
		packageTurnover: number;
		// 新用户数量
		sendGiftNewUserCount: number;
	}>
> {
	return request(`/guild-room/stat-history/${roomId}`);
}

export async function getRoomDetail(data: {
	roomId: number;
	// 6-周 10-月
	timeType: number;
	// 周的时候，格式为yyyyMMdd，月的时候格式为yyyyMM
	statTime: string;
}): Promise<
	API.ResponseModel<{
		// 统计时间
		// statTime: string;
		// 开启天数
		openedDays: number;
		// 流水
		turnover: number;
		// 直送流水
		directTurnover: number;
		// 背包流水
		packageTurnover: number;
		// 新用户数量
		sendGiftNewUserCount: number;
		turnoverList: { time: string; value: number }[];
	}>
> {
	return request(`/guild-room/stat-detail`, { data });
}

export async function getRoomDetailInfo({
	roomId,
}: {
	roomId: number;
}): Promise<
	API.ResponseModel<{
		roomId: number;
		roomNo: string;
		roomName: string;
		roomIcon: string;
	}>
> {
	return request(`/guild-room/simple/${roomId}`);
}

export async function exportMemberList(
	data: API.PageParams<{
		// 开始时间
		statStartTime: string;
		// 结束时间
		statEndTime: string;
		// 用户编码
		userCode: string;
		// 活跃时间start
		activeStartTime: string;
		// 活跃时间end
		activeEndTime: string;
		// 签约时间start
		joinStartTime: string;
		// 签约时间end
		joinEndTime: string;
	}>,
): Promise<API.ResponseModel> {
	return request("/guild-member/export", { data });
}
