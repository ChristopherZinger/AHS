import { AppRedFlag } from './dbEnums';

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
			AppRedFlag.TOXIC_ATMOSPHERE,
			AppRedFlag.FAVORITISM,
			AppRedFlag.ABUSE_MOBBING,
			AppRedFlag.STRESS_PRESSURE,
			AppRedFlag.INCOMPETENT_TEAM
		]
	},
	{
		section: RedFlagSectionName.JOB_SATISFACTION,
		flags: [
			AppRedFlag.BORING_PROJECTS,
			AppRedFlag.INSIGNIFICANT_MONOTONOUS_TASKS,
			AppRedFlag.TASKS_DONT_MATCH_JOB_DESCRIPTION,
			AppRedFlag.CHEAPEST_SOLUTIONS_AND_BASIC_DESIGN,
			AppRedFlag.NO_VARIETY_IN_RESPONSIBILITIES
		]
	},
	{
		section: RedFlagSectionName.CAREER,
		flags: [
			AppRedFlag.CANT_GET_MEANINGFUL_EXPERIENCE,
			AppRedFlag.GLASS_CEILING,
			AppRedFlag.LACK_OF_MENTORING,
			AppRedFlag.NO_PERSONAL_DEVELOPMENT_PLAN_OR_EDUCATION_BUDGET,
			AppRedFlag.NOT_POSSIBLE_TO_INFLUENCE_COMPANY_STRATEGY
		]
	},
	{
		section: RedFlagSectionName.MANAGEMENT_AND_BUISNESS,
		flags: [
			AppRedFlag.MICROMANAGEMENT,
			AppRedFlag.INCOMPETENT_MANAGEMENT,
			AppRedFlag.INABILITY_TO_GET_PROFITABLE_ASSIGNMENTS,
			AppRedFlag.FINANCIAL_PROBLEMS,
			AppRedFlag.OVERLY_RELYING_ON_INTERNS_OR_FREE_LABOUR,
			AppRedFlag.ILLEGAL_OR_IMMORAL
		]
	},
	{
		section: RedFlagSectionName.TIME_MANAGEMENT_AND_WORKLOAD,
		flags: [
			AppRedFlag.UNREALISTIC_DEADLINES,
			AppRedFlag.SYSTEMATIC_OVERTIME,
			AppRedFlag.WORK_ON_WEEKEND_AND_HOLIDAYS,
			AppRedFlag.DENIED_TIME_OFF,
			AppRedFlag.OVERWHELMING_RESPONSIBILITY
		]
	},
	{
		section: RedFlagSectionName.SALARY,
		flags: [
			AppRedFlag.UNPAID_INTERNSHIP,
			AppRedFlag.UNPAID_OVERTIME,
			AppRedFlag.STARVING_SALARY,
			AppRedFlag.UNEQUAL_SALARIES,
			AppRedFlag.CHANGES_IN_EMPLOYMENT_CONDITIONS,
			AppRedFlag.DELAYED_PAYSLIPS,
			AppRedFlag.PAYCHECK_LOWER_THEN_AGREED,
			AppRedFlag.NO_SALARY_INCREASES_OR_BONUSES,
			AppRedFlag.UNPAID_OR_DEDUCTED_EXPENSES,
			AppRedFlag.TRASH_CONTRACTS
		]
	},
	{
		section: RedFlagSectionName.TOOLS,
		flags: [
			AppRedFlag.MISSING_OR_STUDENTS_LICENSE,
			AppRedFlag.REQUIRED_PRIVATE_HARDWARE_OR_SOFTWARE,
			AppRedFlag.OFFBRAND_OR_FREE_SOFTWARE,
			AppRedFlag.OLD_HARDWARE_OUTDATED_SOFTWARE,
			AppRedFlag.BAD_WORKSTATION_BAD_OFFICE,
			AppRedFlag.MISSING_BASIC_OFFICE_SUPPLIES
		]
	},
	{
		section: RedFlagSectionName.DISCRIMINATION,
		flags: [
			AppRedFlag.RACISM,
			AppRedFlag.HOMOPHOBIA,
			AppRedFlag.ABLEISM,
			AppRedFlag.XENOPHOBIA,
			AppRedFlag.TRANSPHOBIA,
			AppRedFlag.NEPOTISM,
			AppRedFlag.SEXISM,
			AppRedFlag.AGISM
		]
	}
];
