"use client";
import { App } from "antd";

import { useLogout } from "./logout";

export const useRequestMessage = () => {
	const { message } = App.useApp();
	const toLogout = useLogout();
	const checkMessage = <T>(
		res: API.ResponseModel<T>,
		options?: {
			isShowSuccess?: boolean;
			operationName?: string;
			successMessage?: string;
		},
	) => {
		if (res.errors) {
			message.error(res.errors);
			if (res.code === 401) {
				toLogout();
			}
			return false;
		}
		if (options?.isShowSuccess) {
			message.success(
				options?.successMessage || `${options?.operationName || "操作"}成功`,
			);
		}
		return true;
	};
	return { checkMessage };
};
