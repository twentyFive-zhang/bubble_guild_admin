import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_main/room/license")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_main/room/license"!</div>;
}
