import { home, getMemberPage } from "@/app/actions";
import { Avatar, Card, Col, Flex, Radio, Row, Tabs, Segmented, Table, Divider } from "antd";
import { ApplyCard, RankList } from "./components";
import Link from "next/link";
import { ChartAreaAxes } from "./components/chart";

const data = {
  // 公会ID
  guildId: 3,
  // 公会编码：页面上显示这个字段
  guildCode: "9365238",
  // 公会名称
  guildName: "测试三号公会",
  // 公会图标
  guildIcon:
    "https://dimengbubble-test.oss-cn-shenzhen.aliyuncs.com/5da513ba89fe451da4172d29681725c3.jpg",
  // 申请加入公会用户数量
  applyJoinUsers: 0,
  // 申请退出公会用户数量
  applyLeaveUsers: 0,
  // 今日流水
  todayTurnover: 0,
  // 本周流水
  thisWeekTurnover: 0,
  // 本月流水
  thisMonthTurnover: 0,
  // 成员数量
  members: 1,
  // 今日上线成员数量
  todayActiveUsers: 0,
  // 今日获得收益成员数量
  todayIncomeUsers: 0,
  // 今日获得收益成员数量相较昨日增长百分比
  todayIncomeUserIncrease: "0%",
  // 近7日流水
  lastSevenDaysTurnoverList: [
    {
      // 时间
      time: "20250611",
      // 流水
      value: 0,
    },
    {
      time: "20250612",
      value: 0,
    },
    {
      time: "20250613",
      value: 0,
    },
    {
      time: "20250614",
      value: 0,
    },
    {
      time: "20250615",
      value: 0,
    },
    {
      time: "20250616",
      value: 0,
    },
    {
      time: "20250617",
      value: 0,
    },
  ],
  // 今日用户流水排名
  todayUserTurnoverRankList: [
    {
      rank: 1,
      userCode: "778844556",
      nickname: "念你如初",
      value: 789,
    },
  ],
  // 今日房间流水排名
  todayRoomTurnoverRankList: [
    {
      rank: 1,
      roomNo: "556677",
      roomName: "念你如初新厅开业",
      value: 7000,
    },
  ],
};

export default async function Page() {
  // await home();
  // await getMemberPage({
  //   pageNum: 1,
  //   pageSize: 10,
  //   // 开始时间
  //   // statStartTime: "20250610",
  //   // // 结束时间
  //   // statEndTime: "20250617",
  //   // // 用户编码
  //   // // @ts-ignore
  //   // userCode: null,
  //   // // 活跃时间start
  //   // activeStartTime: "20250610",
  //   // // 活跃时间end
  //   // activeEndTime: "20250617",
  //   // // 签约时间start
  //   // joinStartTime: "20250610",
  //   // // 签约时间end
  //   // joinEndTime: "20250617",
  // });
  return (
    <div className="flex flex-col gap-4">
      <Row gutter={16}>
        <Col span={10}>
          <Card title="工会信息" variant="borderless">
            <Flex gap={16}>
              <Avatar src={data.guildIcon} shape="square" size={120}></Avatar>
              <div className="text-base leading-9">
                工会昵称: {data.guildName}
                <br />
                工会ID: {data.guildId}
                <br />
                入驻时间: {"补充"}
              </div>
            </Flex>
          </Card>
        </Col>
        <Col span={14}>
          <Card title="待办事项" variant="borderless" className="h-full">
            <ApplyCard></ApplyCard>
          </Card>
        </Col>
      </Row>
      <Card title="内容数据">
        <div className="grid grid-cols-3">
          <div className="text-center border-r border-solid ">
            <div className="text-base ">今日实时流水(钻石)</div>
            <div className="text-lg font-bold mt-4">{data.todayTurnover}</div>
          </div>
          <div className="text-center border-r border-solid ">
            <div className="text-base ">本周实时流水(钻石)</div>
            <div className="text-lg font-bold mt-4">{data.thisWeekTurnover}</div>
          </div>
          <div className="text-center">
            <div className="text-base ">本月实时流水(钻石)</div>
            <div className="text-lg font-bold mt-4">{data.thisMonthTurnover}</div>
          </div>
        </div>
      </Card>
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <div className="grid grid-cols-4">
              <div className="text-center border-r border-solid ">
                <div className="text-base ">工会成员(人)</div>
                <div className="text-lg font-bold mt-4">{data.members}</div>
              </div>
              <div className="text-center border-r border-solid ">
                <div className="text-base ">今日上线(人)</div>
                <div className="text-lg font-bold mt-4">{data.todayActiveUsers}</div>
              </div>
              <div className="text-center border-r border-solid">
                <div className="text-base ">今日收益(钻石)</div>
                <div className="text-lg font-bold mt-4">{data.todayIncomeUsers}</div>
              </div>
              <div className="text-center">
                <div className="text-base ">较昨日新增</div>
                <div className="text-lg font-bold mt-4">{data.todayIncomeUserIncrease}</div>
              </div>
            </div>
            <Divider></Divider>
            <ChartAreaAxes></ChartAreaAxes>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="今日流水排名" className="h-full">
            <RankList></RankList>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
