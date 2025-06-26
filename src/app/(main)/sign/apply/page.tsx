"use client";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Form, Tabs, Input, Button, Flex } from "antd";
import { useState } from "react";
import { getJoinPage, applyJoin } from "@/app/actions";

export default function Page() {
  const [activeKey, setActiveKey] = useState<string>("1");

  return (
    <>
      <Tabs
        activeKey={activeKey}
        onChange={(e) => {
          setActiveKey(e);
        }}
        items={[
          { label: "全部用户", key: "1" },
          { label: "历史记录", key: "2" },
        ]}></Tabs>
      <Flex vertical gap={16}>
        <Form layout="inline">
          <Form.Item name="userCode" label="用户ID">
            <Input placeholder="请输入用户ID" allowClear></Input>
          </Form.Item>
          <Form.Item>
            <Flex gap={8}>
              <Button type="primary">批量通过</Button>
              <Button type="primary" icon={<SearchOutlined></SearchOutlined>}>
                查询
              </Button>
              <Button icon={<ReloadOutlined />}>重置</Button>
            </Flex>
          </Form.Item>
        </Form>
        <Table
          bordered
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange(page, pageSize) {},
          }}
          rowKey={"id"}
          dataSource={[
            {
              // 提交审核的时候用这个字段
              id: 1,
              // 用户编码
              userCode: "55037344",
              // 昵称
              nickname: "云若雨",
              // 申请时间
              applyTimeStr: "2025-06-13 15:09:21",
              // 审核状态：1-待审核 其他的都是已处理，其他的具体状态见下面的auditStatusName
              auditStatus: 4,
              // 审核状态名称
              auditStatusName: "已拒绝",
            },
          ]}
          columns={[
            { title: "用户ID", dataIndex: "id" },
            { title: "用户编码", dataIndex: "userCode" },
            { title: "用户昵称", dataIndex: "nickname" },
            { title: "申请时间", dataIndex: "applyTimeStr" },
            ...(activeKey === "history"
              ? [{ title: "审核状态", dataIndex: "auditStatusName" }]
              : [
                  {
                    title: "操作",
                    dataIndex: "operation",
                    render: () => (
                      <Flex gap={8}>
                        <Button type="link">同意</Button>
                        <Button type="link">拒绝</Button>
                      </Flex>
                    ),
                  },
                ]),
          ]}></Table>
      </Flex>
    </>
  );
}
