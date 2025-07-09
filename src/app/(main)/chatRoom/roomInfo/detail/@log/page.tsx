"use client";
import { getRoomLogList } from "@/app/actions";
import CommonTable from "@/components/common/table";
import { DatePicker, Form, Input, Select } from "antd";
import { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";

export default function Rank() {
  const searchParams = useSearchParams();
  return (
    <CommonTable
      hideRowSelection
      rowKey="createTimeStr"
      request={getRoomLogList}
      sortParams={(params) => {
        const { date, ...rest } = params as typeof params & { date?: Dayjs[] };
        return {
          ...rest,
          roomId: Number(searchParams.get("roomId")!),
          startTime: date?.[0]?.format("YYYYMMDD000000"),
          endTime: date?.[1]?.format("YYYYMMDD235959"),
        };
      }}
      columns={[
        { title: "被操作用户ID", dataIndex: "operatedUserCode" },
        { title: "被操作用户昵称", dataIndex: "operatedNickname" },
        { title: "操作者ID", dataIndex: "operateUserCode" },
        { title: "操作者昵称", dataIndex: "operateNickname" },
        { title: "操作类型", dataIndex: "operateTypeName" },
        { title: "操作时间", dataIndex: "createTimeStr" },
      ]}
      formChildren={
        <>
          <Form.Item name="operateType" label="筛选类型">
            <Select
              style={{ width: 200 }}
              allowClear
              placeholder="请选择筛选类型"
              options={[
                {
                  label: "开启房间",
                  value: "1",
                },
                {
                  label: "关闭房间",
                  value: "2",
                },
                {
                  label: "更改房间信息",
                  value: "3",
                },
                {
                  label: "抱上麦",
                  value: "4",
                },
                {
                  label: "抱下麦",
                  value: "5",
                },
                {
                  label: "麦位上锁",
                  value: "6",
                },
                {
                  label: "麦位解锁",
                  value: "7",
                },
                {
                  label: "麦位禁言",
                  value: "8",
                },
                {
                  label: "取消麦位禁言",
                  value: "9",
                },
                {
                  label: "房间内踢人",
                  value: "10",
                },
                {
                  label: "用户禁言",
                  value: "11",
                },
                {
                  label: "取消用户禁言",
                  value: "12",
                },
                {
                  label: "加入黑名单",
                  value: "13",
                },
                {
                  label: "取消黑名单",
                  value: "15",
                },
                {
                  label: "房间上锁",
                  value: "16",
                },
                {
                  label: "取消房间上锁",
                  value: "17",
                },
              ]}></Select>
          </Form.Item>
          <Form.Item name="operatedUserCode" label="用户编码">
            <Input placeholder="请输入用户编码" allowClear></Input>
          </Form.Item>
          <Form.Item name="date" label="时间选择">
            <DatePicker.RangePicker allowClear></DatePicker.RangePicker>
          </Form.Item>
        </>
      }></CommonTable>
  );
}
