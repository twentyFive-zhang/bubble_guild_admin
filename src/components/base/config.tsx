"use client";

import { App, ConfigProvider } from "antd";

import zhCN from "antd/locale/zh_CN";
import { ReactNode } from "react";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

export default function ConfigWrapper({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider locale={zhCN}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
