"use client";

import { useRequest } from "ahooks";
import { DatePicker, Flex, Segmented } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useRequestMessage } from "@/hooks";
import { ChartAreaAxes } from "@/routes/_main/dashboard/-components/chart";
import { getTurnoverList } from "@/services";

export default function Chart() {
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
	const { checkMessage } = useRequestMessage();
	const { data, run } = useRequest(getTurnoverList, {
		defaultParams: [getTimeData(getDate("week"))],
		onSuccess: (res) => {
			checkMessage(res);
		},
	});

	return (
		<ChartAreaAxes
			list={data?.data}
			hideDescription
			title="聊天室流水"
			action={
				<Flex gap={8}>
					<Segmented
						options={[
							{ label: "本周", value: "week" },
							{ label: "本月", value: "month" },
							{ label: "近30日", value: "late" },
						]}
						onChange={(e: "week" | "month" | "late") => {
							run(getTimeData(getDate(e)));
						}}
					></Segmented>
					<DatePicker.RangePicker
						onChange={(e) => {
							run(getTimeData(e as Dayjs[]));
						}}
					></DatePicker.RangePicker>
				</Flex>
			}
		></ChartAreaAxes>
	);
	// return (
	// 	<Card>
	// 		<CardHeader>
	// 			<CardTitle>聊天室流水</CardTitle>
	// 			<CardAction>
	// 				<Flex gap={8}>
	// 					<Segmented
	// 						options={[
	// 							{ label: "本周", value: "week" },
	// 							{ label: "本月", value: "month" },
	// 							{ label: "近30日", value: "late" },
	// 						]}
	// 						onChange={(e: "week" | "month" | "late") => {
	// 							run(getTimeData(getDate(e)));
	// 						}}
	// 					></Segmented>
	// 					<DatePicker.RangePicker
	// 						onChange={(e) => {
	// 							run(getTimeData(e as Dayjs[]));
	// 						}}
	// 					></DatePicker.RangePicker>
	// 				</Flex>
	// 			</CardAction>
	// 		</CardHeader>
	// 		<CardContent>
	// 			<ChartContainer className="h-80 w-full" config={chartConfig}>
	// 				<AreaChart accessibilityLayer data={data?.data || []}>
	// 					<CartesianGrid vertical={false} />
	// 					<XAxis dataKey="time" tickLine={false} axisLine={false} />
	// 					<YAxis
	// 						tickLine={false}
	// 						axisLine={false}
	// 						tickMargin={8}
	// 						tickCount={3}
	// 					/>
	// 					<ChartTooltip
	// 						cursor={false}
	// 						content={
	// 							<ChartTooltipContent
	// 								formatter={(value) => `总流水：${value}`}
	// 							/>
	// 						}
	// 					/>
	// 					<Area
	// 						dataKey="value"
	// 						type="monotoneX"
	// 						fill="var(--color-desktop)"
	// 						fillOpacity={0.4}
	// 						stroke="var(--color-desktop)"
	// 						stackId="a"
	// 					/>
	// 				</AreaChart>
	// 			</ChartContainer>
	// 		</CardContent>
	// 	</Card>
	// );
}
