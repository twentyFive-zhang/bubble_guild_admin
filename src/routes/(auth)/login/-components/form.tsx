"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { Button, Flex, Form, type FormInstance, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import Timer from "antd/es/statistic/Timer";
import { useSetAtom } from "jotai/react";
import { useState } from "react";
import { useRequestMessage } from "@/hooks";
import { getVerifyCode, login } from "@/services";
import { tokenAtom, userAtom } from "@/store";

function CountDownButton({ form }: { form: FormInstance }) {
	const [deadline, setDeadLine] = useState<number>(0);
	const { checkMessage } = useRequestMessage();

	const sendCode = () => {
		form.validateFields(["phone"]).then((values) => {
			getVerifyCode(values).then((res) => {
				checkMessage(res, {
					isShowSuccess: true,
					successMessage: "短信已发送，请注意查收",
				});
			});
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
				valueStyle={{ fontSize: "14px", color: "rgba(0,0,0,0.25)" }}
			></Timer>
		</Button>
	);
}

export default function LoginForm() {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);
	const { checkMessage } = useRequestMessage();
	const setToken = useSetAtom(tokenAtom);
	const setUser = useSetAtom(userAtom);
	const navigate = useNavigate();
	return (
		<Form
			size="large"
			name="login"
			initialValues={{ remember: true }}
			form={form}
			onFinish={(values) => {
				setLoading(true);
				login(values)
					.then((res) => {
						// console.log(res);
						if (checkMessage(res)) {
							setToken(res.data.token);
							setUser(res.data);
							navigate({ href: "/dashboard", replace: true });
						}
					})
					.finally(() => {
						setLoading(false);
					});
			}}
		>
			<FormItem
				name="phone"
				rules={[{ required: true, message: "Please input your phone!" }]}
			>
				<Input prefix={<UserOutlined />} placeholder="Phone" />
			</FormItem>
			<Flex justify="space-between" gap={16}>
				<FormItem
					name="verifyCode"
					rules={[{ required: true, message: "Please input your verifyCode!" }]}
				>
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
