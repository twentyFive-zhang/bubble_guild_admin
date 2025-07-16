import axios, { type AxiosRequestConfig } from "axios";

const instance = axios.create({
	timeout: 1000 * 60,
	baseURL: `${import.meta.env.VITE_REQUEST_URL}/guild-admin`,
});

instance.interceptors.request.use((config) => {
	console.log({ config });
	config.headers.Token = localStorage.getItem("token") || "";
	// console.log({ config });
	return config;
});

instance.interceptors.response.use(
	(response) => {
		if (response.data?.code === 200) {
			return Promise.resolve(response.data);
		}
		if (response.data?.code === 401) {
			// redirect({ to: "/login" });
			return Promise.resolve({
				...response.data,
				errors: "登录过期，即将重新登录",
			});
		}
		return Promise.resolve({
			...response.data,
			errors: response?.data?.msg || "后台出错啦～",
		});
	},
	(error) => {
		if (error.response?.data) {
			// error.message = error.response?.data?.msg || "后台出错啦～";
			return Promise.resolve({
				errors: error.response?.data?.msg || "后台出错啦～",
			});
		}
		return Promise.resolve({
			errors: "后台出错啦～",
		});
	},
);

type IRequest = <T = unknown>(
	url: string,
	opts?: AxiosRequestConfig,
) => Promise<API.ResponseModel<T>>; // getResponse 默认是 false， 因此不提供该参数时，只返回 data

const request: IRequest = (
	url: string,
	opts: AxiosRequestConfig = { method: "POST" },
) => {
	return new Promise((resolve, reject) => {
		console.log({ opts });
		instance({
			method: "POST",
			...opts,
			url,
		})
			.then((response) => {
				// @ts-ignore
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export default request;
