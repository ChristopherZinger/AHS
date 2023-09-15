export const getIsEnum =
	<E extends Record<string, unknown>>(
		e: E
	): ((v: unknown) => v is E[keyof E]) =>
	(v): v is E[keyof E] =>
		Object.values(e).includes(v as E[keyof E]);
