"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatePicker, Flex, Segmented } from "antd";
import { getTurnoverList } from "@/app/actions";
import { useRequest } from "ahooks";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";

export const description = "An area chart with axes";

const chartData = [
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
    value: 20000,
  },
  {
    time: "20250618",
    value: 0,
  },
  {
    time: "20250619",
    value: 0,
  },
  {
    time: "20250620",
    value: 32,
  },
  {
    time: "20250621",
    value: 0,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaAxes() {
  const getDate = (key: "week" | "month" | "late") => {
    switch (key) {
      case "week":
        return [dayjs().startOf("week"), dayjs()];
      case "month":
        return [dayjs().startOf("month"), dayjs()];
      case "late":
        return [dayjs().subtract(30, "day"), dayjs()];
    }
  };
  const getTimeData = ([d1, d2]: Dayjs[]) => ({
    startTime: d1.format("YYYYMMDD"),
    endTime: d2.format("YYYYMMDD"),
  });
  const { run, data } = useRequest(getTurnoverList, {
    // defaultParams: getTimeData(getDate("week")),
    manual: true,
  });
  useEffect(() => {
    run(getTimeData(getDate("week")));
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>聊天室流水</CardTitle>
        <CardAction>
          <Flex gap={8}>
            <Segmented
              options={[
                { label: "本周", value: "week" },
                { label: "本月", value: "month" },
                { label: "近30日", value: "late" },
              ]}
              onChange={(e: "week" | "month" | "late") => {
                run(getTimeData(getDate(e)));
              }}></Segmented>
            <DatePicker.RangePicker
              onChange={(e) => {
                run(getTimeData(e as Dayjs[]));
              }}></DatePicker.RangePicker>
          </Flex>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-80 w-full" config={chartConfig}>
          <AreaChart accessibilityLayer data={data?.data || []}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent formatter={(value) => `总流水：${value}`} />}
            />
            <Area
              dataKey="value"
              type="monotoneX"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
