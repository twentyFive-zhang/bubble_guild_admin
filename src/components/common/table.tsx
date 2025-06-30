"use client";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Popconfirm, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType, GetRowKey } from "antd/es/table/interface";
import { Key, ReactNode, useEffect, useState } from "react";

export function CommonButton() {
  return <Button></Button>;
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

export default function CommonTable<D = AnyObject, P = unknown>({
  formChildren,
  isHideForm,
  rowKey,
  hideRowSelection,
  request,
  columns,
  renderColumns,
}: {
  columns?: ColumnsType<D>;
  formChildren?: ReactNode;
  isHideForm?: boolean;
  rowKey: keyof D;
  hideRowSelection?: boolean;
  request: (params: API.PageParams<P>) => Promise<API.ResponseModel<API.PageModel<D>>>;
  renderColumns?: (props: { onSearch: () => Promise<void> }) => ColumnsType<D>;
}) {
  const [form] = Form.useForm<P>();
  const [dataSource, setDataSource] = useState<D[]>([]);
  const [pageParams, setPageParams] = useState<{
    pageNum: number;
    pageSize: number;
    // total: number;
  }>({
    pageNum: 1,
    // total: 0,
    pageSize: 10,
  });
  const [total, setTotal] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<D[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const onSearch = async (params?: { pageNum?: number; pageSize?: number }) => {
    setLoading(true);
    const searchValues = form.getFieldsValue();

    const res = await request({ ...searchValues, ...pageParams, ...params });
    if (!res?.data) {
      setLoading(false);
      return;
    }
    const { list, total } = res.data;
    console.log(res.data);
    setTotal(total);
    setDataSource(list);
    if (params) setPageParams((pre) => ({ ...pre, ...params }));
    // setPageParams(rest);
    setLoading(false);
  };
  useEffect(() => {
    onSearch();
  }, []);
  return (
    <Flex vertical gap={16}>
      {!isHideForm && (
        <Form layout="inline" form={form}>
          {formChildren}
          <Form.Item>
            <Flex gap={8}>
              {/* <Button type="primary">批量通过</Button> */}
              <Button
                type="primary"
                loading={loading}
                icon={<SearchOutlined></SearchOutlined>}
                onClick={() => onSearch({ pageNum: 1 })}>
                查询
              </Button>
              <Button
                icon={<ReloadOutlined />}
                loading={loading}
                onClick={() => {
                  form.resetFields();
                  onSearch({ pageNum: 1 });
                }}>
                重置
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      )}
      <Table<D>
        dataSource={dataSource}
        bordered
        rowKey={rowKey}
        loading={loading}
        columns={renderColumns?.({ onSearch }) || columns || []}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageParams.pageSize,
          current: pageParams.pageNum,
          total,
          showTotal: (total) => `共 ${total} 条`,
          onChange(page, pageSize) {
            onSearch({ pageNum: page, pageSize });
          },
        }}
        {...(hideRowSelection
          ? {}
          : {
              rowSelection: {
                selectedRowKeys: selectedRows.map((item) => item[rowKey]) as Key[],
                onChange(selectedRowKeys, selectedRowList, info) {
                  setSelectedRows(selectedRowList);
                },
              },
            })}></Table>
    </Flex>
  );
}
