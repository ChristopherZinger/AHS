import type { OptionalObjectSchema, ObjectShape } from 'yup/lib/object';
import type ValidationError from 'yup/lib/ValidationError';

export const validate = async <T, R extends ObjectShape>(
	input: T,
	schema: OptionalObjectSchema<R>
) =>
	await schema.validate(input, {
		recursive: true,
		abortEarly: false
	});

export const parseValidationError = <
	T extends Record<string, string[]>,
	VE extends ValidationError
>(
	err: VE
) => {
	const errMsg: Partial<T> = {};
	const { inner } = err;

	inner.forEach((ve) => {
		if (ve.path) {
			const v = errMsg[ve.path] || [];
			errMsg[ve.path] = [...v, ve.message];
		}
	});

	return errMsg;
};
