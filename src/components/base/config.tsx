"use client";

import { App, ConfigProvider } from "antd";

import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";
import type { ReactNode } from "react";

dayjs.locale("zh-cn");

export default function ConfigWrapper({ children }: { children: ReactNode }) {
	return (
		<ConfigProvider locale={zhCN}>
			<App>{children}</App>
		</ConfigProvider>
	);
}
