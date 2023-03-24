import { RedFlag } from '@prisma/client';

export const redFlagToLabel: Record<RedFlag, string> = {
	[RedFlag.UNPAID_INTERNSHIP]: 'Unpaid internship',
	[RedFlag.UNPAID_OVERTIME]: 'Unpaid overtime',
	[RedFlag.STARVING_SALARY]: 'Starving salary',
	[RedFlag.OVERDUE_PAYOUT]: 'Overdue salary',
	[RedFlag.PAYSLIP_LOWER_THEN_AGREED]: 'Payslip lower then agreed',
	[RedFlag.GETTING_RAISE_IS_IMPOSSIBLE]: 'Getting raise is impossible',
	[RedFlag.UNPAID_EXPENSES]: 'Unpaid Expenses',

	[RedFlag.BORING_PROJECTS]: 'Boring projects',
	[RedFlag.UNREALISTIC_DEADLINES]: 'Unrealistic Deadlines',
	[RedFlag.TASK_DONT_MATCH_JOB_DESCRIPTION]:
		"Job doesn't match description",
	[RedFlag.MONOTONOUS_TASKS]: 'Monotonous Tasks',
	[RedFlag.CHEAPEST_SOLUTIONS_AND_BASIC_DESIGN]: 'Cheapest solutions',

	[RedFlag.TOO_MUCH_RESPONSIBILITY]: 'Too much responsibility',
	[RedFlag.TOO_LITTLE_RESPONSIBILITY]: 'Too little responsibility',
	[RedFlag.NO_ROOM_FOR_DEVELOPMENT]: 'No room for developement',
	[RedFlag.CANT_GET_MEANINGFUL_EXPERIENCE]:
		"Can't get meaningful experience",
	[RedFlag.GLASS_CEILING]: 'glass ceiling',

	[RedFlag.MISSING_OR_STUDENTS_LICENSE]: 'Missing or student license',
	[RedFlag.REQUIRED_PRIVATE_HARDWARE_OR_SOFTWARE]:
		'Private software or hardware required',
	[RedFlag.OFF_BRAND_OR_FREE_SOFTWARE]: 'Off brand or free software',
	[RedFlag.OLD_HARDWARE_OUTDATED_SOFTWARE]:
		'Old hardware or outdated software',
	[RedFlag.BAD_WORKSPACE]: 'Bad workspace',
	[RedFlag.MISSING_BASIC_MATERIALS]:
		'Missing basic design materials and equipement',

	[RedFlag.ABUSE_MOBBING]: 'Abuse or mobbing',
	[RedFlag.TOXIC_ATMOSPHERE]: 'Toxic atmosphere',
	[RedFlag.STRESS_PRESSURE]:
		'Stressfull atmosphere, unsustainable pressure',
	[RedFlag.FAVORITISM]: 'Favoritism or ass kissing mentality',
	[RedFlag.INTERNS_MAJORITY]: 'Interns make up majority of workforce',
	[RedFlag.NARCISSISTIC_MANAGEMENT]:
		'Delusional, egocentric, narcissistic boss',

	[RedFlag.CASUAL_OVERTIME]: 'Casual overtime (less then 5h/week)',
	[RedFlag.SYSTEMATIC_OVERTIME]: 'Systematic overtime (over 5h/week)',
	[RedFlag.WEEKEND_WORK]: 'Work on weekends and public hollidays',
	[RedFlag.DENIED_TIME_OFF]: 'Denied time off',

	[RedFlag.RACISM]: 'Racism',
	[RedFlag.HOMOPHOBIA]: 'Homophobia',
	[RedFlag.ABLEISM]: 'Ableism',
	[RedFlag.XENOPHOBIA]: 'Xenophobia',
	[RedFlag.TRANSPHOBIA]: 'Transphobia',
	[RedFlag.NEPOTISM]: 'Nepotism',
	[RedFlag.SEXISM]: 'Sexism',
	[RedFlag.AGISM]: 'Agism'
};

export const redFlagSectionsInOrder: {
	label: string;
	flags: RedFlag[];
}[] = [
	{
		label: 'Payment',
		flags: [
			RedFlag.UNPAID_INTERNSHIP,
			RedFlag.UNPAID_OVERTIME,
			RedFlag.STARVING_SALARY,
			RedFlag.OVERDUE_PAYOUT,
			RedFlag.PAYSLIP_LOWER_THEN_AGREED,
			RedFlag.GETTING_RAISE_IS_IMPOSSIBLE,
			RedFlag.UNPAID_EXPENSES
		]
	},
	{
		label: 'Projects',
		flags: [
			RedFlag.BORING_PROJECTS,
			RedFlag.UNREALISTIC_DEADLINES,
			RedFlag.TASK_DONT_MATCH_JOB_DESCRIPTION,
			RedFlag.MONOTONOUS_TASKS,
			RedFlag.CHEAPEST_SOLUTIONS_AND_BASIC_DESIGN
		]
	},
	{
		label: 'Career',
		flags: [
			RedFlag.TOO_MUCH_RESPONSIBILITY,
			RedFlag.TOO_LITTLE_RESPONSIBILITY,
			RedFlag.NO_ROOM_FOR_DEVELOPMENT,
			RedFlag.CANT_GET_MEANINGFUL_EXPERIENCE,
			RedFlag.GLASS_CEILING
		]
	},
	{
		label: 'Tools',
		flags: [
			RedFlag.MISSING_OR_STUDENTS_LICENSE,
			RedFlag.REQUIRED_PRIVATE_HARDWARE_OR_SOFTWARE,
			RedFlag.OFF_BRAND_OR_FREE_SOFTWARE,
			RedFlag.OLD_HARDWARE_OUTDATED_SOFTWARE,
			RedFlag.BAD_WORKSPACE,
			RedFlag.MISSING_BASIC_MATERIALS
		]
	},
	{
		label: 'Management and Team',
		flags: [
			RedFlag.ABUSE_MOBBING,
			RedFlag.TOXIC_ATMOSPHERE,
			RedFlag.STRESS_PRESSURE,
			RedFlag.FAVORITISM,
			RedFlag.INTERNS_MAJORITY,
			RedFlag.NARCISSISTIC_MANAGEMENT
		]
	},
	{
		label: 'Time management',
		flags: [
			RedFlag.CASUAL_OVERTIME,
			RedFlag.SYSTEMATIC_OVERTIME,
			RedFlag.WEEKEND_WORK,
			RedFlag.DENIED_TIME_OFF
		]
	},
	{
		label: '~isms',
		flags: [
			RedFlag.RACISM,
			RedFlag.HOMOPHOBIA,
			RedFlag.ABLEISM,
			RedFlag.XENOPHOBIA,
			RedFlag.TRANSPHOBIA,
			RedFlag.NEPOTISM,
			RedFlag.SEXISM,
			RedFlag.AGISM
		]
	}
];
