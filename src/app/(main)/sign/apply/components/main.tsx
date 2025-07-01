"use client";
import { getJoinPage, applyJoin } from "@/app/actions";
import CommonTable, { PopoverButton } from "@/components/common/table";
import { Flex, Form, Input, Tabs } from "antd";
import { useState } from "react";

export function Search() {
  return (
    <>
      <Form.Item name="type" noStyle>
        <div></div>
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
        initialValues={{ type: "1" }}
        renderHeader={({ onSearch, form }) => (
          <Tabs
            activeKey={activeKey}
            onChange={(e) => {
              form.setFieldsValue({ type: e });
              setActiveKey(e);
              onSearch({ pageNum: 1 });
            }}
            items={[
              { label: "全部用户", key: "1" },
              { label: "历史记录", key: "2" },
            ]}></Tabs>
        )}
        hideRowSelection={activeKey === "2"}
        rowKey={"id"}
        request={getJoinPage}
        renderColumns={({ onSearch }) => [
          { title: "用户ID", dataIndex: "id" },
          { title: "用户编码", dataIndex: "userCode" },
          { title: "用户昵称", dataIndex: "nickname" },
          { title: "申请时间", dataIndex: "applyTimeStr" },
          {
            title: "操作",
            dataIndex: "operation",
            render: (_v, record) => (
              <Flex gap={8}>
                <PopoverButton
                  title="同意"
                  ajax={async () => {
                    await applyJoin({
                      idList: [record.id],
                      pass: 1,
                    });
                    onSearch();
                  }}></PopoverButton>

                <PopoverButton
                  title="拒绝"
                  ajax={async () => {
                    await applyJoin({
                      idList: [record.id],
                      pass: 0,
                    });
                    onSearch();
                  }}></PopoverButton>
              </Flex>
            ),
          },
        ]}
        formChildren={<Search></Search>}
        renderFormRight={({ selectedRows, onSearch }) =>
          activeKey === "1" && (
            <PopoverButton
              title="批量通过"
              props={{ type: "primary", disabled: !selectedRows.length }}
              ajax={async () => {
                await applyJoin({ idList: selectedRows.map((item) => item.id), pass: 1 });
                onSearch();
              }}></PopoverButton>
          )
        }></CommonTable>
    </div>
  );
}
