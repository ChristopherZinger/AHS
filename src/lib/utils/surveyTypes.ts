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
	'20-26' = '20-26',
	'27-30' = '27-30',
	'30-34' = '30-34',
	'35-39' = '35-39',
	'40-49' = '40-49',
	'50-59' = '50-59',
	'60+' = '60+'
}
export let isSurveyAgeOptons = getIsEnum(SurveyAgeOption);

export enum SurveyEducation {
	HIGHSCHOOL = 'highshool',
	BACHELOR = 'bachelor',
	MASTER = 'master',
	PHD = 'phd',
	PROFESSOR = 'Professor'
}
export let isSurveyEducation = getIsEnum(SurveyEducation);

export enum SurveyNumYearsExperience {
	'0-1' = '0-1',
	'2-5' = '2-5',
	'6-9' = '6-9',
	'10-15' = '10-15',
	'16-25' = '16-25',
	'26+' = '25+y'
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
