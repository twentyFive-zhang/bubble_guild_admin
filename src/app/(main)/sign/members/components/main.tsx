"use client";
import { exportMemberList, getMemberPage, removeMember } from "@/app/actions";
import CommonTable, { PopoverButton } from "@/components/common/table";
import { useRequestMessage } from "@/hooks";
import { PageParams } from "@/types";
import { EditOutlined } from "@ant-design/icons";
import { useDebounceEffect, useRequest } from "ahooks";
import { Button, DatePicker, Form, Input, Modal, Tabs } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

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
      <Form.Item name="userCode" label="用户编码">
        <Input placeholder="请输入用户编码" allowClear></Input>
      </Form.Item>
    </>
  );
}
const baseData = [
  {
    name: "全部用户",
    disabled: true,
    key: "1",
  },
  {
    name: "今日活跃",
    disabled: true,
    key: "2",
    activeDate: [dayjs().format("YYYYMMDD"), dayjs().format("YYYYMMDD")],
  },
  {
    name: "新签约",
    disabled: true,
    key: "3",
    signDate: [dayjs().subtract(7, "day").format("YYYYMMDD"), dayjs().format("YYYYMMDD")],
  },
];
const getTabsData = () => {
  if (!globalThis?.localStorage?.getItem?.("membersTab")) {
    globalThis?.localStorage?.setItem?.("membersTab", JSON.stringify(baseData));
  }
  let membersData: ({ name: string; key: string } & Partial<{
    userCode: string;
    disabled: boolean;
    activeDate: Dayjs[];
    signDate: Dayjs[];
    date: Dayjs[];
  }>)[] = JSON.parse(globalThis?.localStorage?.getItem?.("membersTab") || "[]");

  return membersData.map((item) => ({
    ...item,
    activeDate: item.activeDate?.map((d) => dayjs(d)),
    signDate: item.signDate?.map((d) => dayjs(d)),
    date: item.date?.map((d) => dayjs(d)),
  }));
};

export default function Main() {
  const { checkMessage } = useRequestMessage();
  const [activeKey, setActiveKey] = useState<string>("1");
  const { run, loading } = useRequest(exportMemberList, {
    manual: true,
    onSuccess: (res) => {
      if (checkMessage(res)) {
        window.open(res.data, "_blank");
      }
    },
  });
  const [modalForm] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("新增视图");
  const [type, setType] = useState<string>("add");
  const [items, setItems] = useState<
    ({ name: string; key: string } & Partial<{
      userCode: string;
      disabled: boolean;
      activeDate: Dayjs[];
      signDate: Dayjs[];
      date: Dayjs[];
    }>)[]
  >(
    [
      {
        name: "全部用户",
        disabled: true,
        key: "1",
      },
      {
        name: "今日活跃",
        disabled: true,
        key: "2",
        activeDate: [dayjs().format("YYYYMMDD"), dayjs().format("YYYYMMDD")],
      },
      {
        name: "新签约",
        disabled: true,
        key: "3",
        signDate: [dayjs().subtract(7, "day").format("YYYYMMDD"), dayjs().format("YYYYMMDD")],
      },
    ].map((item) => ({
      ...item,
      activeDate: item.activeDate?.map((d) => dayjs(d)),
      signDate: item.signDate?.map((d) => dayjs(d)),
      // date: item.date?.map((d) => dayjs(d)),
    }))
  );
  useEffect(() => {
    const tabItems = getTabsData();
    setItems(tabItems);
  }, []);

  const onShowModal = (
    actionType: "add" | "edit" | "remove",
    key: string,
    values?: Record<string, unknown>
  ) => {
    if (actionType === "remove") {
      setItems((pre) => pre.filter((item) => item.key !== key));
      return;
    }
    setType(actionType);
    if (actionType === "add") {
      setTitle("新增视图");
      modalForm.setFieldsValue({ ...values, key });
      setOpen(true);
      return;
    }

    setTitle("编辑视图");
    setOpen(true);
    modalForm.setFieldsValue({ ...values, key });
  };

  useDebounceEffect(() => {
    // console.log(items);
    globalThis.localStorage.setItem(
      "membersTab",
      JSON.stringify(
        items.map((item) => ({
          ...item,
          activeDate: item.activeDate?.map((d) => dayjs(d).format("YYYYMMDD")),
          signDate: item.signDate?.map((d) => dayjs(d).format("YYYYMMDD")),
          date: item.date?.map((d) => dayjs(d).format("YYYYMMDD")),
        }))
      )
    );
  }, [items]);
  return (
    <div>
      <CommonTable
        renderHeader={({ form, onSearch }) => (
          <>
            <Modal
              open={open}
              title={title}
              onCancel={() => {
                modalForm.resetFields();
                setOpen(false);
              }}
              onOk={() => {
                modalForm.validateFields().then((res) => {
                  if (type === "add") setItems((pre) => [...pre, res]);
                  setItems((pre) =>
                    pre.map((item) => (item.key === res.key ? { ...item, ...res } : item))
                  );
                  form.resetFields();
                  const { name: _name, key: _key, disabled: _disabled, ...rest } = res;
                  form.setFieldsValue(rest);
                  onSearch({ ...rest, pageNum: 1 });
                  setActiveKey(res.key);

                  setOpen(false);
                });
              }}>
              <Form form={modalForm} layout="vertical">
                <Form.Item name="key" noStyle>
                  <div></div>
                </Form.Item>
                <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                  <Input placeholder="请输入名称"></Input>
                </Form.Item>
                <Search></Search>
              </Form>
            </Modal>
            <Tabs
              type="editable-card"
              activeKey={activeKey}
              onChange={(e) => {
                form.resetFields();
                const {
                  name: _name,
                  key: _key,
                  disabled: _disabled,
                  ...rest
                } = items.find((item) => item.key === e)!;
                form.setFieldsValue(rest);
                onSearch({ ...rest, pageNum: 1 });
                setActiveKey(e);
              }}
              items={items?.map((item) => ({
                label: item.name,
                key: item.key,
                closable: !item.disabled,
                icon: !item.disabled && (
                  <EditOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowModal(
                        "edit",
                        item.key,
                        items.find((i) => i.key === item.key)
                      );
                    }}></EditOutlined>
                ),
              }))}
              onEdit={(e, action) => {
                if (action === "add") {
                  // setType(String(items!.length + 1));
                  // setTitle("新增视图");
                  // modalForm.setFieldsValue(form.getFieldsValue());
                  // setOpen(true);
                  onShowModal("add", String(items!.length + 1), form.getFieldsValue());
                  return;
                }
                onShowModal("remove", e as string);
                // setItems((pre) => pre.filter((item) => item.key !== e));
              }}
              tabBarExtraContent={
                <Button
                  type="primary"
                  loading={loading}
                  onClick={() => {
                    const { date, signDate, activeDate, ...rest } =
                      form.getFieldsValue() as PageParams<{
                        // 开始时间
                        statStartTime: string;
                        // 结束时间
                        statEndTime: string;
                        // 用户编码
                        userCode: string;
                        // 活跃时间start
                        activeStartTime: string;
                        // 活跃时间end
                        activeEndTime: string;
                        // 签约时间start
                        joinStartTime: string;
                        // 签约时间end
                        joinEndTime: string;
                        date: Dayjs[];
                        signDate: Dayjs[];
                        activeDate: Dayjs[];
                      }>;
                    run({
                      ...rest,
                      statStartTime: date?.[0]?.format("YYYYMMDD"),
                      statEndTime: date?.[1]?.format("YYYYMMDD"),
                      joinStartTime: signDate?.[0]?.format("YYYYMMDD"),
                      joinEndTime: signDate?.[1]?.format("YYYYMMDD"),
                      activeStartTime: activeDate?.[0]?.format("YYYYMMDD"),
                      activeEndTime: activeDate?.[1]?.format("YYYYMMDD"),
                      pageNum: 1,
                      pageSize: 100000,
                    });
                  }}>
                  下载
                </Button>
              }></Tabs>
          </>
        )}
        sortParams={(params) => {
          const { date, signDate, activeDate, ...rest } = params as typeof params &
            Partial<{
              date: Dayjs[];
              signDate: Dayjs[];
              activeDate: Dayjs[];
            }>;
          return {
            ...rest,
            statStartTime: date?.[0]?.format("YYYYMMDD"),
            statEndTime: date?.[1]?.format("YYYYMMDD"),
            joinStartTime: signDate?.[0]?.format("YYYYMMDD"),
            joinEndTime: signDate?.[1]?.format("YYYYMMDD"),
            activeStartTime: activeDate?.[0]?.format("YYYYMMDD"),
            activeEndTime: activeDate?.[1]?.format("YYYYMMDD"),
          };
        }}
        hideRowSelection
        rowKey={"userId"}
        request={getMemberPage}
        renderColumns={({ onSearch }) => [
          { title: "用户ID", dataIndex: "userId" },
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
                  const res = await removeMember({ userId: record.userId });
                  // onSearch();
                  if (checkMessage(res, { isShowSuccess: true, operationName: "解约" })) {
                    onSearch();
                  }
                }}></PopoverButton>
            ),
          },
        ]}
        formChildren={<Search></Search>}></CommonTable>
    </div>
  );
}
