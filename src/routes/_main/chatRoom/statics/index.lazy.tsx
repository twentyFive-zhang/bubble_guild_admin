import { createLazyFileRoute } from "@tanstack/react-router";
import Chart from "./-components/chart";
import Main from "./-components/main";

export const Route = createLazyFileRoute("/_main/chatRoom/statics/")({
	component: Page,
});

export default function Page() {
	return (
		<>
			<Main></Main>
			<Chart></Chart>
		</>
	);
}
