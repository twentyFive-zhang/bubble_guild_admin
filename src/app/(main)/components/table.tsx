"use client";

import { Form, Table, TableColumnsType } from "antd";

export const CommonTable = ({ columns }: { columns: TableColumnsType }) => {
  return <Table bordered></Table>;
};

export const CommonForm = () => {
  return <Form></Form>;
};
