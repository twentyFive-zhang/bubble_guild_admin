"use client";
import { Form, Input, Select } from "antd";

export function Search() {
  return (
    <>
      <Form.Item name="urlName" label="操作类型">
        <Select
          options={[
            "更新公会信息",
            "设为管理员",
            "移除管理员",
            "同意入会申请",
            "拒绝入会申请",
            "同意退会申请",
            "拒绝退会申请",
          ].map((label) => ({ value: label, label }))}
          placeholder="请选择操作类型"
          allowClear
          style={{ width: 200 }}></Select>
      </Form.Item>
      <Form.Item name="userCode" label="用户编码">
        <Input placeholder="请输入用户编码" allowClear></Input>
      </Form.Item>
    </>
  );
}
