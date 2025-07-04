"use client";
import { App } from "antd";

export const useRequestMessage = () => {
  const { message } = App.useApp();
  const checkMessage = (
    res: API.ResponseModel,
    options?: {
      isShowSuccess?: boolean;
      operationName?: string;
      successMessage?: string;
    }
  ) => {
    if (res.errors) {
      message.error(res.errors);
      return false;
    }
    if (options?.isShowSuccess) {
      message.success(options?.successMessage || `${options?.operationName || "操作"}成功`);
    }
    return true;
  };
  return { checkMessage };
};
