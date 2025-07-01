"use client";
import { getMemberPage, removeMember } from "@/app/actions";
import CommonTable, { PopoverButton } from "@/components/common/table";
import { DatePicker, Form, Input, Tabs } from "antd";
import { useState } from "react";

export function Search() {
  return (
    <>
      <Form.Item name="date" label="筛选时间">
        <DatePicker.RangePicker></DatePicker.RangePicker>
      </Form.Item>
      <Form.Item name="activeDate" label="活跃时间">
        <DatePicker.RangePicker></DatePicker.RangePicker>
      </Form.Item>
      <Form.Item name="signDate" label="签约时间">
        <DatePicker.RangePicker></DatePicker.RangePicker>
      </Form.Item>
      <Form.Item name="userCode" label="用户ID">
        <Input placeholder="请输入用户ID" allowClear></Input>
      </Form.Item>
    </>
  );
}

export default function Main() {
  const [activeKey, setActiveKey] = useState<string>("1");
  return (
    <div>
      <CommonTable
        renderHeader={() => (
          <Tabs
            type="editable-card"
            activeKey={activeKey}
            onChange={(e) => {
              setActiveKey(e);
            }}
            items={[
              { label: "全部用户", key: "1", closable: false },
              { label: "今日活跃", key: "2", closable: false },
              { label: "新签约", key: "3", closable: false },
            ]}
            onEdit={() => {}}></Tabs>
        )}
        hideRowSelection
        rowKey={"id"}
        request={getMemberPage}
        renderColumns={({ onSearch }) => [
          { title: "用户ID", dataIndex: "id" },
          { title: "用户编码", dataIndex: "userCode" },
          { title: "用户昵称", dataIndex: "nickname" },
          { title: "最近活跃", dataIndex: "activeTimeStr" },
          { title: "产生流水(钻石)", dataIndex: "turnover" },
          { title: "签约时间", dataIndex: "joinTimeStr" },
          {
            title: "操作",
            dataIndex: "operation",
            render: (_v, record) => (
              <PopoverButton
                title="解约"
                ajax={async () => {
                  await removeMember({ userId: record.id });
                  onSearch();
                }}></PopoverButton>
            ),
          },
        ]}
        formChildren={<Search></Search>}
        // renderFormRight={({ selectedRows, onSearch }) => (
        //   <PopoverButton
        //     title="批量通过"
        //     props={{ type: "primary" }}
        //     ajax={async () => {
        //       await applyJoin({ idList: selectedRows.map((item) => item.id), pass: 1 });
        //       onSearch();
        //     }}></PopoverButton>
        // )}
      ></CommonTable>
    </div>
  );
}
