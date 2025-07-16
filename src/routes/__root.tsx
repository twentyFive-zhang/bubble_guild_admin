import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import ConfigWrapper from "@/components/base/config";
import { NavigationProgress } from "@/components/base/navigate-progress";
import NotFound from "@/components/base/not-found";

export const Route = createRootRoute({
	component: () => (
		<>
			<NavigationProgress></NavigationProgress>
			<ConfigWrapper>
				<Outlet></Outlet>
			</ConfigWrapper>

			<TanStackRouterDevtools />
		</>
	),
	notFoundComponent: NotFound,
});
