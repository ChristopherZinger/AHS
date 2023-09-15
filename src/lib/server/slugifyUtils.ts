import slugify from 'slugify';

export function slugifyEntity(name: string): string {
	return baseSlugify(name, {
		strict: true
	});
}

export function slugifyOffice(name: string): string {
	return baseSlugify(name);
}

export function slugifyCountry(name: string): string {
	return baseSlugify(name);
}

export function slugifyRegion(name: string): string {
	return baseSlugify(name);
}

export function slugifyCity(name: string): string {
	return baseSlugify(name);
}

function baseSlugify(
	name: string,
	options: {
		replacement?: string;
		remove?: RegExp;
		lower?: boolean;
		strict?: boolean;
		locale?: string;
		trim?: boolean;
	} = {}
): string {
	return slugify(name, { lower: true, ...options });
}
