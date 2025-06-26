import { Card, Flex, Tabs } from "antd";
import { ChartAreaAxes } from "./components/chart";

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
      <Tabs
        items={[
          { label: "本周总览", key: "1" },
          { label: "本月总览", key: "2" },
        ]}></Tabs>
      <Card className="text-center">
        <div className="text-lg ">聊天室房间总流水(钻石)</div>
        <div className="text-2xl font-bold mt-4">{data.turnover}</div>
      </Card>
      <div className="flex justify-between gap-3 mt-3 mb-5">
        <Card className="text-center">
          <div className="text-base ">本周房间直刷流水(钻石)</div>
          <div className="text-lg font-bold mt-4">{data.directTurnover}</div>
        </Card>
        <Card className="text-center">
          <div className="text-base ">本周房间背包流水(钻石)</div>
          <div className="text-lg font-bold mt-4">{data.packageTurnover}</div>
        </Card>
        <Card className="text-center">
          <div className="text-base ">本周有效开播房间(个)</div>
          <div className="text-lg font-bold mt-4">{data.activeRoomCount}</div>
        </Card>
        <Card className="text-center">
          <div className="text-base ">本周主播数(人)</div>
          <div className="text-lg font-bold mt-4">{data.upMicMembers}</div>
        </Card>
        <Card className="text-center">
          <div className="text-base ">本周有效主播(人)</div>
          <div className="text-lg font-bold mt-4">{data.incomeMembers}</div>
        </Card>
      </div>
      <ChartAreaAxes></ChartAreaAxes>
    </>
  );
}
