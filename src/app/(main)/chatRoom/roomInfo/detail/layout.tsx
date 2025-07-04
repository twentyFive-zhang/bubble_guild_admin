import { Divider, Tabs } from "antd";
import { ReactNode } from "react";

export default function Layout({
  week,
  history,
  month,
  log,
  rank,
  info,
}: {
  children: ReactNode;
  week: ReactNode;
  month: ReactNode;
  history: ReactNode;
  log: ReactNode;
  rank: ReactNode;
  info: ReactNode;
}) {
  return (
    <>
      {info}
      <Divider></Divider>
      <Tabs
        items={[
          { label: "本周总览", key: "week", children: week },
          { label: "本月总览", key: "month", children: month },
          { label: "历史总览", key: "history", children: history },
          { label: "房间操作日志", key: "log", children: log },
          { label: "房间榜单", key: "rank", children: rank },
        ]}></Tabs>
    </>
  );
}
