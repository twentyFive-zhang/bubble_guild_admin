"use server";

import { PageParams } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function request(url: string, body?: Record<string, unknown>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log(token);
  let redirectPath = "";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/guild-admin${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: token as unknown as string,
      },
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify(body || {}),
    });
    const resData = await res.json();
    console.log(resData);
    // GET(resData);
    if (resData.code === 401) {
      redirectPath = "/sign-in";
      // return resData;
    }
    if (resData.code === 200) {
      if (url === "/login") {
        cookieStore.set("token", resData.data.token);
        // redirectPath = "/";
      }
      if (url === "logout") {
        cookieStore.delete("token");
      }
      if (typeof resData.data?.pageNum === "number") {
        return {
          code: resData.code,
          message: resData.message,
          data: {
            list: resData.data?.list || [],
            pageNum: resData.data?.pageNum,
            pageSize: resData.data?.pageSize,
            total: resData.data?.total,
          },
        };
      }
      return resData;
    }

    return resData;
  } catch (e) {
    console.log(e);
    return {};
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}

export async function getVerifyCode(data: { phone: string }) {
  return request("/send-verify-code", data);
}

export async function login(data: { phone: string; verifyCode: string }) {
  return request("/login", data);
}

export async function logout() {
  return request("/logout");
}

export async function home() {
  return request("/home");
}

export async function getMemberPage(
  data: PageParams<{
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
  }>
) {
  return request("/guild-member/page", data);
}

export async function getJoinPage(
  data: PageParams<{
    // 1-未处理 2-已处理
    type: string;
    // 用户编码
    userCode: string;
  }>
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
  return request("/guild-member/join-page", data);
}

export async function getPunishPage(
  data: PageParams<{
    // 开始时间：yyyyMMddHHmmss 例如202510618121212
    punishTimeStart: string;
    // 结束时间：yyyyMMddHHmmss 例如202510618121212
    punishTimeEnd: string;
    userCode: string;
  }>
): Promise<
  API.ResponseModel<
    API.PageModel<{
      id: number;
      userCode: string;
      nickname: string;
      joinTimeStr: string;
      reasonContent: string;
      violationsTimes: number;
      punishName: string;
    }>
  >
> {
  return request("/guild-member/punish-page", data);
}

export async function applyJoin(data: {
  // ID列表：记得取之前列表里的ID字段，不要用userCode字段
  idList: number[];
  // 1-通过 0-拒绝
  pass: 1 | 0;
}) {
  return request("/guild-member/audit-join-apply", data);
}

export async function removeMember({ userId }: { userId: number }) {
  return request(`/guild-member/remove/${userId}`);
}

export async function applyLeave(data: {
  // ID列表：记得取之前列表里的ID字段，不要用userCode字段
  idList: number[];
  // 1-通过 0-拒绝
  pass: 1 | 0;
}) {
  return request("/guild-member/audit-leave-apply", data);
}

export async function getLeavePage(
  data: PageParams<{
    // 1-未处理 2-已处理
    type: string;
    // 用户编码
    userCode: string;
  }>
) {
  return request("/guild-member/leave-page", data);
}

export async function getLogPage(
  data: PageParams<{
    // 操作类型
    urlName: string;
    // 用户编码
    userCode: string;
  }>
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
  return request("/log/page", data);
}

export async function getMemberListPage(
  data: PageParams<{
    // 角色: 2-管理 10-普通成员
    guildUserRole: string;
    // 用户编码
    userCode: string;
  }>
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
  return request("/guild-manager/member-page", data);
}

export async function setMemberRole({ userId, status }: { userId: number; status: 0 | 1 }) {
  return request(`/guild-manager/update-manager/${userId}/${status}`);
}

export async function getFindStat({ timeType }: { timeType: number }) {
  return request(`/guild/find-stat/${timeType}`);
}

export async function getTurnoverList(data: {
  startTime: string;
  endTime: string;
}): Promise<API.ResponseModel<{ time: string; value: string }[]>> {
  return request(`/guild/turnover-list`, data);
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

export async function getStatByTimeRange(data: { startTime: string; endTime: string }): Promise<
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
  return request(`/guild/stat-by-time-range`, data);
}
