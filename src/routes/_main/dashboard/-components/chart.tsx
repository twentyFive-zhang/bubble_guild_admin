"use client";

import type { ReactNode } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An area chart with axes";

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

export function ChartAreaAxes({
	list,
	description,
	title,
	hideDescription,
	action,
}: {
	list?: { time: string; value: number }[];
	description?: string;
	title?: string;
	hideDescription?: boolean;
	action?: ReactNode;
}) {
	return (
		<Card className="border-none shadow-none">
			<CardHeader>
				<CardTitle>
					{title || "工会流水"}
					{!hideDescription && (
						<span className="text-xs  font-normal">
							({description || "近七日"})
						</span>
					)}
				</CardTitle>
				{action && <CardAction>{action}</CardAction>}
			</CardHeader>
			<CardContent>
				<ChartContainer className="h-60 w-full" config={chartConfig}>
					<AreaChart accessibilityLayer data={list}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="time" tickLine={false} axisLine={false} />
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickCount={3}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									formatter={(value) => `总流水：${value}`}
								/>
							}
						/>
						<Area
							dataKey="value"
							type="natural"
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
