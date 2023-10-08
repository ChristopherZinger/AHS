import { getIsEnum } from '$lib/utils/types-utils';

export type SurveyForm = {
	id: string;
	data: SurveyData;
	createdAt: Date;
	anonymousSessionId: string;
};

export enum SurveySexOption {
	MALE = 'Male',
	FEMALE = 'Female',
	NONBINARY = 'Nonbinary'
}
export let isSurveySexOptions = getIsEnum(SurveySexOption);

export enum SurveyAgeOption {
	'<20' = '<20',
	'20-24' = '20-24',
	'25-29' = '25-29',
	'30-34' = '30-34',
	'35-39' = '35-39',
	'40-49' = '40-49',
	'50-59' = '50-59',
	'60+' = '60+'
}
export let isSurveyAgeOptons = getIsEnum(SurveyAgeOption);

export enum SurveyEducation {
	HIGHSCHOOL = 'highshool',
	TECHNICAL_SCHOOL = 'technical_school',
	BACHELOR = 'bachelor',
	MASTER = 'master',
	PHD = 'phd',
	PROFESSOR = 'Professor'
}
export let isSurveyEducation = getIsEnum(SurveyEducation);

export enum SurveyNumYearsExperience {
	'0-1' = '0-1',
	'2-4' = '2-4',
	'5-9' = '5-9',
	'10-14' = '10-14',
	'15-24' = '16-24',
	'24+' = '24+y'
}

export function getNumYearsExperienceLabel(
	v: SurveyNumYearsExperience
): string {
	const labels: Record<SurveyNumYearsExperience, string> = {
		[SurveyNumYearsExperience['0-1']]: '0 - 1 rok',
		[SurveyNumYearsExperience['2-4']]: '2 - 4 lata',
		[SurveyNumYearsExperience['5-9']]: '5 - 9 lat',
		[SurveyNumYearsExperience['10-14']]: '10 - 14 lat',
		[SurveyNumYearsExperience['15-24']]: '15 - 24 lata',
		[SurveyNumYearsExperience['24+']]: 'ponad 24 lata'
	};

	return labels[v];
}

export let isSurveyNumOfExperience = getIsEnum(SurveyNumYearsExperience);

export enum OfficeSize {
	XS = '1-4',
	S = '5-9',
	M = '10-19',
	L = '20-49',
	XL = '50-99',
	XXL = 'over 100'
}

export type SurveyData = {
	office?: {
		officeName?: string;
		city?: string;
		numOfEmployees?: OfficeSize;
	};
	flags: Record<string, boolean>;
	story?: {
		title?: string;
		body?: string;
	};
	profile?: {
		age?: SurveyAgeOption;
		numYearsExperience?: SurveyNumYearsExperience;
		sex?: SurveySexOption;
		isLicensed?: boolean;
		education?: SurveyEducation;
	};
	currentStep: number;
};

export const EMPTY_SURVEY_BLUEPRINT: SurveyData = {
	flags: {},
	currentStep: 0
};
