"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, FormInstance, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import Timer from "antd/es/statistic/Timer";
import { useState } from "react";
import { login, getVerifyCode } from "@/app/actions";

function CountDownButton({ form }: { form: FormInstance }) {
  const [deadline, setDeadLine] = useState<number>(0);

  const sendCode = () => {
    form.validateFields(["phone"]).then((values) => {
      getVerifyCode(values);
      setDeadLine(Date.now() + 60 * 1000);
    });
  };
  if (!deadline)
    return (
      <Button type="primary" key="getCode" onClick={sendCode}>
        获取验证码
      </Button>
    );
  return (
    <Button disabled type="primary" key="countCode">
      <Timer
        type="countdown"
        value={deadline}
        onFinish={() => {
          setDeadLine(0);
        }}
        format="ss秒后重新获取"
        valueStyle={{ fontSize: "14px", color: "rgba(0,0,0,0.25)" }}></Timer>
    </Button>
  );
}

export default function LoginForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      form={form}
      onFinish={(values) => {
        setLoading(true);
        login(values)
          .then((res) => {
            console.log({ res });
          })
          .finally(() => {
            setLoading(false);
          });
      }}>
      <FormItem name="phone" rules={[{ required: true, message: "Please input your phone!" }]}>
        <Input prefix={<UserOutlined />} placeholder="Phone" />
      </FormItem>
      <Flex justify="space-between" gap={16}>
        <FormItem
          name="verifyCode"
          rules={[{ required: true, message: "Please input your verifyCode!" }]}>
          <Input prefix={<LockOutlined />} placeholder="VerifyCode" />
        </FormItem>
        <CountDownButton form={form}></CountDownButton>
      </Flex>

      <FormItem>
        <Button block type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </FormItem>
    </Form>
  );
}
