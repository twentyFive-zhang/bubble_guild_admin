import { useNavigate } from "@tanstack/react-router";
import { useResetAtom } from "jotai/utils";
import { logout } from "@/services";
import { tokenAtom, userAtom } from "@/store";

export const useLogout = () => {
	const resetToken = useResetAtom(tokenAtom);
	const resetUser = useResetAtom(userAtom);
	const navigate = useNavigate();

	const toLogout = () => {
		logout();
		resetToken();
		resetUser();
		navigate({ to: "/login" });
	};
	return toLogout;
};
