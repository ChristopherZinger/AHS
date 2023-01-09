import z from 'zod';
import type { Office, OfficesByCountry } from './types';

export const officeSchema = z.object({
	author: z.string().min(1),
	city: z.string().min(1),
	url: z.string().min(1),
	cityUUID: z.string().uuid()
});

const officesInCountrySchema = z.array(z.record(z.array(officeSchema)));

export function parseOffice(office: unknown): Office {
	return officeSchema.parse(office);
}

export function parseOffices(offices: unknown): Office[] {
	return z.array(officeSchema).parse(offices);
}

export function parseOfficesByCountries(data: unknown): OfficesByCountry {
	return officesInCountrySchema.parse(data);
}
