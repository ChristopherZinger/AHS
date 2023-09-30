import type { ServerErrorName } from '$lib/utils/appError';

export class AppServerError extends Error {
	public code: number;
	public info: Record<string, unknown> | undefined;
	public message: string;

	constructor(
		httpResponseCode: number,
		msg: ServerErrorName,
		info?: Record<string, unknown> | undefined
	) {
		super(msg);
		this.name = 'AppServerError';
		this.code = httpResponseCode;
		this.message = msg;
		this.info = info;
	}
}
