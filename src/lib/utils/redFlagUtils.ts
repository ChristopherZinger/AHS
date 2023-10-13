import { APP_RED_FLAG, type AppRedFlag } from './dbEnums';

export enum RedFlagSectionName {
	SALARY = 'salary',
	JOB_SATISFACTION = 'job_satisfaction',
	CAREER = 'career',
	TOOLS = 'tools',
	MANAGEMENT_AND_BUISNESS = 'management_and_buisness',
	TIME_MANAGEMENT_AND_WORKLOAD = 'time_management_and_workload',
	VIBE = 'vibe',
	DISCRIMINATION = 'discrimination'
}

export const redFlagSectionsInOrder: {
	section: RedFlagSectionName;
	flags: AppRedFlag[];
}[] = [
	{
		section: RedFlagSectionName.VIBE,
		flags: [
			APP_RED_FLAG.TOXIC_ATMOSPHERE,
			APP_RED_FLAG.FAVORITISM,
			APP_RED_FLAG.ABUSE_MOBBING,
			APP_RED_FLAG.STRESS_PRESSURE,
			APP_RED_FLAG.INCOMPETENT_TEAM
		]
	},
	{
		section: RedFlagSectionName.JOB_SATISFACTION,
		flags: [
			APP_RED_FLAG.BORING_PROJECTS,
			APP_RED_FLAG.INSIGNIFICANT_MONOTONOUS_TASKS,
			APP_RED_FLAG.TASKS_DONT_MATCH_JOB_DESCRIPTION,
			APP_RED_FLAG.CHEAPEST_SOLUTIONS_AND_BASIC_DESIGN,
			APP_RED_FLAG.NO_VARIETY_IN_RESPONSIBILITIES
		]
	},
	{
		section: RedFlagSectionName.CAREER,
		flags: [
			APP_RED_FLAG.CANT_GET_MEANINGFUL_EXPERIENCE,
			APP_RED_FLAG.GLASS_CEILING,
			APP_RED_FLAG.LACK_OF_MENTORING,
			APP_RED_FLAG.NO_PERSONAL_DEVELOPMENT_PLAN_OR_EDUCATION_BUDGET,
			APP_RED_FLAG.NOT_POSSIBLE_TO_INFLUENCE_COMPANY_STRATEGY
		]
	},
	{
		section: RedFlagSectionName.MANAGEMENT_AND_BUISNESS,
		flags: [
			APP_RED_FLAG.MICROMANAGEMENT,
			APP_RED_FLAG.INCOMPETENT_MANAGEMENT,
			APP_RED_FLAG.INABILITY_TO_GET_PROFITABLE_ASSIGNMENTS,
			APP_RED_FLAG.FINANCIAL_PROBLEMS,
			APP_RED_FLAG.OVERLY_RELYING_ON_INTERNS_OR_FREE_LABOUR,
			APP_RED_FLAG.ILLEGAL_OR_IMMORAL
		]
	},
	{
		section: RedFlagSectionName.TIME_MANAGEMENT_AND_WORKLOAD,
		flags: [
			APP_RED_FLAG.UNREALISTIC_DEADLINES,
			APP_RED_FLAG.SYSTEMATIC_OVERTIME,
			APP_RED_FLAG.WORK_ON_WEEKEND_AND_HOLIDAYS,
			APP_RED_FLAG.DENIED_TIME_OFF,
			APP_RED_FLAG.OVERWHELMING_RESPONSIBILITY
		]
	},
	{
		section: RedFlagSectionName.SALARY,
		flags: [
			APP_RED_FLAG.UNPAID_INTERNSHIP,
			APP_RED_FLAG.UNPAID_OVERTIME,
			APP_RED_FLAG.STARVING_SALARY,
			APP_RED_FLAG.UNEQUAL_SALARIES,
			APP_RED_FLAG.CHANGES_IN_EMPLOYMENT_CONDITIONS,
			APP_RED_FLAG.DELAYED_PAYSLIPS,
			APP_RED_FLAG.PAYCHECK_LOWER_THEN_AGREED,
			APP_RED_FLAG.NO_SALARY_INCREASES_OR_BONUSES,
			APP_RED_FLAG.UNPAID_OR_DEDUCTED_EXPENSES,
			APP_RED_FLAG.TRASH_CONTRACTS
		]
	},
	{
		section: RedFlagSectionName.TOOLS,
		flags: [
			APP_RED_FLAG.MISSING_OR_STUDENTS_LICENSE,
			APP_RED_FLAG.REQUIRED_PRIVATE_HARDWARE_OR_SOFTWARE,
			APP_RED_FLAG.OFFBRAND_OR_FREE_SOFTWARE,
			APP_RED_FLAG.OLD_HARDWARE_OUTDATED_SOFTWARE,
			APP_RED_FLAG.BAD_WORKSTATION_BAD_OFFICE,
			APP_RED_FLAG.MISSING_BASIC_OFFICE_SUPPLIES
		]
	},
	{
		section: RedFlagSectionName.DISCRIMINATION,
		flags: [
			APP_RED_FLAG.RACISM,
			APP_RED_FLAG.HOMOPHOBIA,
			APP_RED_FLAG.ABLEISM,
			APP_RED_FLAG.XENOPHOBIA,
			APP_RED_FLAG.TRANSPHOBIA,
			APP_RED_FLAG.NEPOTISM,
			APP_RED_FLAG.SEXISM,
			APP_RED_FLAG.AGISM
		]
	}
];
