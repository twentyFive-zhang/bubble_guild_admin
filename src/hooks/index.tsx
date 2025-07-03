"use client";
import { App } from "antd";

export const useRequestMessage = () => {
  const { message } = App.useApp();
  const checkMessage = (res: API.ResponseModel) => {
    if (res.errors) {
      message.error(res.errors);
      return false;
    }
    return true;
  };
  return { checkMessage };
};
