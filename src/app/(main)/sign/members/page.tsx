"use client";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Form, Tabs, Input, Button, Flex, DatePicker } from "antd";
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
          { label: "今日活跃", key: "2" },
          { label: "新签约", key: "3" },
        ]}></Tabs>
      <Flex vertical gap={16}>
        <Form layout="inline">
          <Flex gap={16} wrap>
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
            <Form.Item>
              <Flex gap={8}>
                <Button type="primary" icon={<SearchOutlined></SearchOutlined>}>
                  查询
                </Button>
                <Button icon={<ReloadOutlined />}>重置</Button>
              </Flex>
            </Form.Item>
          </Flex>
        </Form>
        <Table
          bordered
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange(page, pageSize) {},
          }}
          rowKey={"userId"}
          dataSource={[
            {
              userId: 1,
              // 用户编码
              userCode: "55037344",
              // 昵称
              nickname: "云若雨",
              // 最后活跃时间
              activeTimeStr: "2025-06-13 15:09:21",
              // 流水
              turnover: 0,
              // 签约时间
              joinTimeStr: "1970-01-01 08:00:00",
            },
          ]}
          columns={[
            { title: "用户ID", dataIndex: "userId" },
            { title: "用户编码", dataIndex: "userCode" },
            { title: "用户昵称", dataIndex: "nickname" },
            { title: "最近活跃", dataIndex: "activeTimeStr" },
            { title: "产生流水(钻石)", dataIndex: "turnover" },
            { title: "签约时间", dataIndex: "joinTimeStr" },
            {
              title: "操作",
              dataIndex: "operation",
              render: () => (
                <Flex gap={8}>
                  <Button type="link">解约</Button>
                </Flex>
              ),
            },
          ]}></Table>
      </Flex>
    </>
  );
}
