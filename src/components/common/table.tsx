"use client";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import {
	Button,
	type ButtonProps,
	Flex,
	Form,
	type FormInstance,
	Popconfirm,
	Table,
} from "antd";
import type { AnyObject } from "antd/es/_util/type";
import type { ColumnsType } from "antd/es/table/interface";
import { type Key, type ReactNode, useEffect, useState } from "react";
import { useRequestMessage } from "@/hooks";

export function CommonButton() {
	return <Button></Button>;
}

export function PopoverButton({
	title,
	ajax,
	props,
}: {
	props?: ButtonProps;
	title: string;
	ajax: () => Promise<void>;
}) {
	const [loading, setLoading] = useState<boolean>(false);
	const onConfirm = async () => {
		setLoading(true);
		await ajax();
		setLoading(false);
	};
	return (
		<Popconfirm title={title} okButtonProps={{ loading }} onConfirm={onConfirm}>
			<Button type="link" {...props}>
				{title}
			</Button>
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
	renderFormRight,
	renderHeader,
	initialValues,
	sortParams,
	hidePagination,
	isHideFormButton,
}: {
	columns?: ColumnsType<D>;
	formChildren?: ReactNode;
	isHideForm?: boolean;
	rowKey: keyof D;
	hideRowSelection?: boolean;
	request: (
		params: API.PageParams<P>,
	) => Promise<API.ResponseModel<API.PageModel<D>>>;
	renderColumns?: (props: { onSearch: () => Promise<void> }) => ColumnsType<D>;
	renderFormRight?: (props: {
		onSearch: () => Promise<void>;
		selectedRows: D[];
	}) => ReactNode;
	renderHeader?: (props: {
		form: FormInstance<Partial<P>>;
		onSearch: (params?: {
			pageNum?: number;
			pageSize?: number;
		}) => Promise<void>;
	}) => ReactNode;
	initialValues?: Partial<P>;
	hidePagination?: boolean;
	isHideFormButton?: boolean;
	sortParams?: (params: API.PageParams<P>) => API.PageParams<P>;
}) {
	const [form] = Form.useForm<Partial<P>>();
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
	const { checkMessage } = useRequestMessage();
	const onSearch = async (params?: { pageNum?: number; pageSize?: number }) => {
		setLoading(true);
		const searchValues = form.getFieldsValue();

		const res = await request(
			sortParams?.({ ...searchValues, ...pageParams, ...params }) || {
				...searchValues,
				...pageParams,
				...params,
			},
		);
		if (!checkMessage(res)) {
			setLoading(false);
			return;
		}
		const { list, total } = hidePagination
			? {
					list: res.data as unknown as D[],
					total: (res.data as unknown as D[])?.length,
				}
			: res.data;

		setTotal(total);
		setDataSource(list);
		setSelectedRows([]);
		if (params) setPageParams((pre) => ({ ...pre, ...params }));
		// setPageParams(rest);
		setLoading(false);
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		onSearch();
	}, []);
	console.log({ dataSource });
	return (
		<>
			{renderHeader?.({ onSearch, form })}
			<Flex vertical gap={16}>
				<Form layout="inline" form={form} initialValues={initialValues || {}}>
					{!isHideForm && (
						<Flex gap={16} wrap>
							{formChildren}
							{!isHideFormButton && (
								<Form.Item>
									<Flex gap={8}>
										<Button
											type="primary"
											loading={loading}
											icon={<SearchOutlined></SearchOutlined>}
											onClick={() => onSearch({ pageNum: 1 })}
										>
											查询
										</Button>
										<Button
											icon={<ReloadOutlined />}
											loading={loading}
											onClick={() => {
												form.resetFields();
												onSearch({ pageNum: 1 });
											}}
										>
											重置
										</Button>
										{renderFormRight?.({ onSearch, selectedRows })}
									</Flex>
								</Form.Item>
							)}
						</Flex>
					)}
				</Form>

				<Table<D>
					dataSource={dataSource}
					bordered
					rowKey={rowKey}
					loading={loading}
					columns={renderColumns?.({ onSearch }) || columns || []}
					pagination={
						hidePagination
							? false
							: {
									showSizeChanger: true,
									showQuickJumper: true,
									pageSize: pageParams.pageSize,
									current: pageParams.pageNum,
									total,
									showTotal: (total) => `共 ${total} 条`,
									onChange(page, pageSize) {
										onSearch({ pageNum: page, pageSize });
									},
								}
					}
					{...(hideRowSelection
						? {}
						: {
								rowSelection: {
									selectedRowKeys: selectedRows.map(
										(item) => item[rowKey],
									) as Key[],
									onChange(_selectedRowKeys, selectedRowList) {
										setSelectedRows(selectedRowList);
									},
								},
							})}
				></Table>
			</Flex>
		</>
	);
}
