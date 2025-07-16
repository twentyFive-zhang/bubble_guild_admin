import { createFileRoute } from "@tanstack/react-router";
import Main from "./-components/index";

export const Route = createFileRoute("/(auth)/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Main></Main>;
}
