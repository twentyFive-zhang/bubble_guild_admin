"use client";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Form, Tabs, Input, Button, Flex, DatePicker } from "antd";
import { useState } from "react";
import { getJoinPage, applyJoin } from "@/app/actions";

export default function Page() {
  return (
    <>
      <Flex vertical gap={16}>
        <Form layout="inline">
          <Form.Item name="signDate" label="日期选择">
            <DatePicker.RangePicker></DatePicker.RangePicker>
          </Form.Item>
          <Form.Item name="userCode" label="用户ID">
            <Input placeholder="请输入用户ID" allowClear></Input>
          </Form.Item>
          <Form.Item>
            <Flex gap={8}>
              <Button type="primary">批量解约</Button>
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
              userCode: "55037848",
              nickname: "素娥羽衣舞",
              joinTimeStr: "2025-06-18 19:30:10",
              reasonContent: "种族歧视",
              violationsTimes: 0,
              punishName: "警告",
            },
            {
              userCode: "55037848",
              nickname: "素娥羽衣舞",
              joinTimeStr: "2025-06-18 19:30:10",
              reasonContent: "黄色内容",
              violationsTimes: 0,
              punishName: "警告",
            },
            {
              userCode: "55037159",
              nickname: "丁知",
              joinTimeStr: "2025-06-18 19:29:26",
              reasonContent: "恶意退款",
              violationsTimes: 1,
              punishName: "封禁",
            },
            {
              userCode: "55037761",
              nickname: "仲孙翡翠",
              joinTimeStr: "2025-06-18 19:28:50",
              reasonContent: "恶意退款",
              violationsTimes: 1,
              punishName: "禁言",
            },
            {
              userCode: "55037761",
              nickname: "仲孙翡翠",
              joinTimeStr: "2025-06-18 19:28:50",
              reasonContent: "恶意退款",
              violationsTimes: 1,
              punishName: "警告",
            },
          ]}
          columns={[
            { title: "用户ID", dataIndex: "id" },
            { title: "用户编码", dataIndex: "userCode" },
            { title: "用户昵称", dataIndex: "nickname" },
            { title: "签约时间", dataIndex: "joinTimeStr" },
            { title: "违规原因", dataIndex: "reasonContent" },
            { title: "违规日期", dataIndex: "joinTimeStr1" },
            { title: "违规次数", dataIndex: "violationsTimes" },
            { title: "处罚措施", dataIndex: "punishName" },
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
