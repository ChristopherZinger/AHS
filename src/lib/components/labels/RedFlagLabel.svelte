<script context="module" lang="ts">
	const flagToMsg: Record<RedFlag, string> = {
		[RedFlag.ABLEISM]: 'dyskryminacja niepełnosprawnych',
		[RedFlag.ABUSE_MOBBING]: 'mobbing, nękanie',
		[RedFlag.AGISM]: 'agism - dyskryminacja ze względu na wiek',
		[RedFlag.BAD_WORKSPACE]: 'zła kondycja stanowiska pracy',
		[RedFlag.BORING_PROJECTS]: 'nudne projekty',
		[RedFlag.CANT_GET_MEANINGFUL_EXPERIENCE]:
			'brak zdobycia wartościowego doświadczenia',
		[RedFlag.CASUAL_OVERTIME]: 'nieregularne nadgodziny',
		[RedFlag.CHEAPEST_SOLUTIONS_AND_BASIC_DESIGN]:
			'promowanie najtańszych rozwiązań',
		[RedFlag.DENIED_TIME_OFF]: 'odmowa wakacji albo dni wolych',
		[RedFlag.FAVORITISM]: 'faworytowanie wybranych pracowników',
		[RedFlag.GETTING_RAISE_IS_IMPOSSIBLE]: 'brak podwyżek lub bonusów',
		[RedFlag.GLASS_CEILING]: 'szklany sufit, brak możliwości awansu',
		[RedFlag.HOMOPHOBIA]: 'Homofobia',
		[RedFlag.INTERNS_MAJORITY]: 'poleganie bezpłatnych stażystach',
		[RedFlag.MISSING_BASIC_MATERIALS]: 'brak materiałów biurowch',
		[RedFlag.MISSING_OR_STUDENTS_LICENSE]:
			'brakująca lub studencka licencja na oprogramowanie',
		[RedFlag.MONOTONOUS_TASKS]: 'monotonne obowiązki',
		[RedFlag.NARCISSISTIC_MANAGEMENT]: 'narcy',
		[RedFlag.NEPOTISM]: 'nepotyzm',
		[RedFlag.NO_ROOM_FOR_DEVELOPMENT]: 'brak możliwości rozwoju',
		[RedFlag.OFF_BRAND_OR_FREE_SOFTWARE]:
			'zamienniki oprogramowania ( Photopea, BlocksCad3d )',
		[RedFlag.OLD_HARDWARE_OUTDATED_SOFTWARE]: '',
		[RedFlag.OVERDUE_PAYOUT]: 'nie wypłacanie pensji na czas',
		[RedFlag.PAYSLIP_LOWER_THEN_AGREED]: 'pensija niższ niż co ustalono',
		[RedFlag.RACISM]: 'rasizm',
		[RedFlag.REQUIRED_PRIVATE_HARDWARE_OR_SOFTWARE]:
			'wymóg własnego sprzętu albo oprogramowania',
		[RedFlag.SEXISM]: 'seksizm',
		[RedFlag.STARVING_SALARY]: 'głodowa pensja',
		[RedFlag.STRESS_PRESSURE]: 'stres',
		[RedFlag.SYSTEMATIC_OVERTIME]: 'regularne nadgodziny',
		[RedFlag.TASK_DONT_MATCH_JOB_DESCRIPTION]:
			'obowiązki niepokrywające się z umową lub zawodem architekta',
		[RedFlag.TOO_LITTLE_RESPONSIBILITY]:
			'brak możliwości przejęcia odpowiedzialności za pracę',
		[RedFlag.TOO_MUCH_RESPONSIBILITY]:
			'odpowiedzialności wiecej niż dla danego stanowiska',
		[RedFlag.TOXIC_ATMOSPHERE]: 'toksyczna atmosfera',
		[RedFlag.TRANSPHOBIA]: 'transfobia',
		[RedFlag.UNPAID_EXPENSES]: 'niepokrywanie wydadków',
		[RedFlag.UNPAID_INTERNSHIP]: 'niepłatny staż',
		[RedFlag.UNPAID_OVERTIME]: 'niepłatne nadgodziny',
		[RedFlag.UNREALISTIC_DEADLINES]: 'nierealistyczne terminy',
		[RedFlag.WEEKEND_WORK]: 'wmóg pracy w weekendy lub święta',
		[RedFlag.XENOPHOBIA]: 'ksenofobia'
	};

	export function getRedFlagNameLabel(flag: RedFlag): string {
		return flagToMsg[flag];
	}
</script>

<script lang="ts">
	import { RedFlag } from '@prisma/client';
	export let flag: RedFlag;

	$: label = getRedFlagNameLabel(flag);
</script>

{label}
