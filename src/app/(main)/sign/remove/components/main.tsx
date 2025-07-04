"use client";
import { getLeavePage, applyLeave } from "@/app/actions";
import CommonTable, { PopoverButton } from "@/components/common/table";
import { Flex, Form, Input, Tabs } from "antd";
import { useState } from "react";
import { useRequestMessage } from "@/hooks";

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
  const { checkMessage } = useRequestMessage();
  const [activeKey, setActiveKey] = useState<string>("1");
  return (
    <div>
      <CommonTable
        hideRowSelection={activeKey === "2"}
        rowKey={"id"}
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
        request={getLeavePage}
        renderColumns={({ onSearch }) =>
          activeKey === "1"
            ? [
                { title: "用户ID", dataIndex: "id" },
                { title: "用户编码", dataIndex: "userCode" },
                { title: "用户昵称", dataIndex: "nickname" },
                { title: "签约时间", dataIndex: "applyTimeStr" },
                { title: "产生流水(钻石)", dataIndex: "turnover" },
                {
                  title: "操作",
                  dataIndex: "operation",
                  render: (_v, record) => (
                    <Flex gap={8}>
                      <PopoverButton
                        title="同意"
                        ajax={async () => {
                          const res = await applyLeave({
                            idList: [record.id],
                            pass: 1,
                          });
                          // onSearch();
                          if (checkMessage(res, { isShowSuccess: true, operationName: "拒绝" })) {
                            onSearch();
                          }
                        }}></PopoverButton>

                      <PopoverButton
                        title="拒绝"
                        ajax={async () => {
                          const res = await applyLeave({
                            idList: [record.id],
                            pass: 0,
                          });
                          // onSearch();

                          if (checkMessage(res, { isShowSuccess: true, operationName: "拒绝" })) {
                            onSearch();
                          }
                        }}></PopoverButton>
                    </Flex>
                  ),
                },
              ]
            : [
                { title: "用户ID", dataIndex: "id" },
                { title: "用户编码", dataIndex: "userCode" },
                { title: "用户昵称", dataIndex: "nickname" },
                { title: "签约时间", dataIndex: "applyTimeStr" },
                { title: "产生流水(钻石)", dataIndex: "money" },
                { title: "审核状态", dataIndex: "auditStatusName" },
              ]
        }
        formChildren={<Search></Search>}
        renderFormRight={({ selectedRows, onSearch }) =>
          activeKey === "1" && (
            <PopoverButton
              title="批量通过"
              props={{ type: "primary", disabled: !selectedRows.length }}
              ajax={async () => {
                const res = await applyLeave({
                  idList: selectedRows.map((item) => item.id),
                  pass: 1,
                });
                // onSearch();

                if (checkMessage(res, { isShowSuccess: true, operationName: "拒绝" })) {
                  onSearch();
                }
              }}></PopoverButton>
          )
        }></CommonTable>
    </div>
  );
}
