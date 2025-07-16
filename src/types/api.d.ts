declare namespace API {
	type PageParams<T = unknown> = {
		pageSize: number;
		pageNum: number;
	} & Partial<T>;
	type PageIndexModel = {
		pageNum: number;
		pageSize: number;
		total: number;
	};

	type PageModel<T = unknown> = {
		list: T[];
	} & PageIndexModel;
	// type PageResModel<T = unknown> = {
	// 	index: PageIndexModel;
	// 	res: T[];
	// };

	type ResponseModel<T = string> = {
		data: T;
		code: number;
		message: string;
		errors?: string;
	};
}
