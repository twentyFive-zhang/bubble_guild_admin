import { useNavigate } from "@tanstack/react-router";
import { Button, Result } from "antd";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<Result
				status="404"
				title="404"
				subTitle="对不起，您访问的页面不存在"
				extra={
					<Button
						type="primary"
						onClick={() => {
							navigate({ to: "/dashboard", replace: true });
						}}
					>
						返回首页
					</Button>
				}
			/>
		</div>
	);
}
