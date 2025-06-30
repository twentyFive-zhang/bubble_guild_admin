"use client";
import { getMemberListPage, setMemberRole } from "@/app/actions";
import CommonTable from "@/components/common/table";
import { Button, Form, Input, Popconfirm, Select } from "antd";
import { useState } from "react";

export function Search() {
  return (
    <>
      <Form.Item name="guildUserRole" label="身份类型">
        <Select
          options={[
            { label: "工会管理员", value: 2 },
            { label: "普通成员", value: 10 },
          ]}
          placeholder="请选择身份类型"
          allowClear
          style={{ width: 200 }}></Select>
      </Form.Item>
      <Form.Item name="userCode" label="用户ID">
        <Input placeholder="请输入用户ID" allowClear></Input>
      </Form.Item>
    </>
  );
}

export function PopoverButton({ title, ajax }: { title: string; ajax: () => Promise<void> }) {
  const [loading, setLoading] = useState<boolean>(false);
  const onConfirm = async () => {
    setLoading(true);
    await ajax();
    setLoading(false);
  };
  return (
    <Popconfirm title={title} okButtonProps={{ loading }} onConfirm={onConfirm}>
      <Button type="link">{title}</Button>
    </Popconfirm>
  );
}

export default function Main() {
  return (
    <div>
      <CommonTable
        hideRowSelection
        rowKey={"userId"}
        request={getMemberListPage}
        columns={[
          { dataIndex: "userCode", title: "用户ID" },
          { dataIndex: "nickname", title: "用户昵称" },
          { dataIndex: "userRoleName", title: "工会身份" },
          {
            dataIndex: "operation",
            title: "操作",
            render: (_v, record) => (
              <PopoverButton
                ajax={() =>
                  setMemberRole({ userId: record.userId, status: record.userRole === 2 ? 0 : 1 })
                }
                title={`${record.userRole === 2 ? "解除" : "设为"}管理员`}></PopoverButton>
            ),
          },
        ]}
        renderColumns={({ onSearch }) => [
          { dataIndex: "userCode", title: "用户ID" },
          { dataIndex: "nickname", title: "用户昵称" },
          { dataIndex: "userRoleName", title: "工会身份" },
          {
            dataIndex: "operation",
            title: "操作",
            render: (_v, record) => (
              <PopoverButton
                ajax={async () => {
                  await setMemberRole({
                    userId: record.userId,
                    status: record.userRole === 2 ? 0 : 1,
                  });
                  onSearch();
                }}
                title={`${record.userRole === 2 ? "解除" : "设为"}管理员`}></PopoverButton>
            ),
          },
        ]}
        formChildren={<Search></Search>}></CommonTable>
    </div>
  );
}
