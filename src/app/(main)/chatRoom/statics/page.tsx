import { Card, Flex, Tabs } from "antd";
import { ChartAreaAxes } from "./components/chart";
import Main from "./components/main";

const data = {
  // 流水
  turnover: 0,
  // 直送流水
  directTurnover: 0,
  // 背包流水
  packageTurnover: 0,
  // 活跃房间数量
  activeRoomCount: 0,
  // 上麦主播数量
  upMicMembers: 0,
  // 获得收益的主播数量
  incomeMembers: 0,
};

export default async function Page() {
  return (
    <>
      <Main></Main>
      <ChartAreaAxes></ChartAreaAxes>
    </>
  );
}
