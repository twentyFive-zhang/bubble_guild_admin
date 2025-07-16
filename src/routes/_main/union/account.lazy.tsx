import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/_main/union/account")({
	component: RouteComponent,
});

function RouteComponent() {
	useEffect(() => {
		console.log("account");
	}, []);
	return <div>Hello "/_main/union/acount"!</div>;
}
