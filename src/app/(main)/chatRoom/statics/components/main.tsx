"use client";

import { getFindStat } from "@/app/actions";
import { Tabs, Card } from "antd";
import { useEffect, useState } from "react";

export default function Main() {
  const [data, setData] = useState<
    Partial<{
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
  >({});
  const getData = async (timeType?: string) => {
    const res = await getFindStat({ timeType: Number(timeType || 6) });

    setData(res.data || {});
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Tabs
        items={[
          { label: "本周总览", key: "6" },
          { label: "本月总览", key: "10" },
        ]}
        onChange={(e) => {
          getData(e);
        }}></Tabs>
      <Card className="text-center">
        <div className="text-lg ">聊天室房间总流水(钻石)</div>
        <div className="text-2xl font-bold mt-4">{data?.turnover}</div>
      </Card>
      <div className="flex justify-between gap-3 mt-3 mb-5">
        <Card className="text-center">
          <div className="text-base ">本周房间直刷流水(钻石)</div>
          <div className="text-lg font-bold mt-4">{data?.directTurnover}</div>
        </Card>
        <Card className="text-center">
          <div className="text-base ">本周房间背包流水(钻石)</div>
          <div className="text-lg font-bold mt-4">{data?.packageTurnover}</div>
        </Card>
        <Card className="text-center">
          <div className="text-base ">本周有效开播房间(个)</div>
          <div className="text-lg font-bold mt-4">{data?.activeRoomCount}</div>
        </Card>
        <Card className="text-center">
          <div className="text-base ">本周主播数(人)</div>
          <div className="text-lg font-bold mt-4">{data?.upMicMembers}</div>
        </Card>
        <Card className="text-center">
          <div className="text-base ">本周有效主播(人)</div>
          <div className="text-lg font-bold mt-4">{data?.incomeMembers}</div>
        </Card>
      </div>
    </>
  );
}
