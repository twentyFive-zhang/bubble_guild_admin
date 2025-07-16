import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/")({
	component: () => {
		return <Navigate to="/dashboard"></Navigate>;
	},
	beforeLoad: () => {
		if (!localStorage.getItem("token")) {
			redirect({ to: "/login", throw: true });
		}
	},
});
