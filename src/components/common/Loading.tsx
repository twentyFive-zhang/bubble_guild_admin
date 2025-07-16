import { Spin } from "antd";
import { type ReactNode, Suspense } from "react";

export function Loading({ children }: { children?: ReactNode }) {
	return <Suspense fallback={<Spin spinning></Spin>}>{children}</Suspense>;
}
