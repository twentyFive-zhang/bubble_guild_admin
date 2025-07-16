import { createLazyFileRoute } from "@tanstack/react-router";
import Main from "./-components/main";

export const Route = createLazyFileRoute("/_main/chatRoom/roomInfo/")({
	component: Page,
});

export default function Page() {
	return (
		<div>
			<Main></Main>
		</div>
	);
}
