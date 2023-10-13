<script context="module" lang="ts">
	const flagToMsg: Record<AppRedFlag, string> = {
		// -----------------------------------------------------------------------------------
		// Money
		[APP_RED_FLAG.UNPAID_INTERNSHIP]: 'bezpłatny staż',
		[APP_RED_FLAG.UNPAID_OVERTIME]: 'bezpłatne nadgodziny',
		[APP_RED_FLAG.STARVING_SALARY]: 'wyjątkowo niskie wynagrodzenie',
		[APP_RED_FLAG.UNEQUAL_SALARIES]:
			'dyskryminacja finansowa - wynagrodzenie uwarunkowane płcią, pochodzeniem etc.',
		[APP_RED_FLAG.CHANGES_IN_EMPLOYMENT_CONDITIONS]:
			'wymuszona zmiana warunków np. wynagrodzenie albo stanowisko',
		[APP_RED_FLAG.DELAYED_PAYSLIPS]: 'opóźnione wypłaty',
		[APP_RED_FLAG.PAYCHECK_LOWER_THEN_AGREED]:
			'wypłacanie niepełnej lub niżej niż ustalono pensji.',
		[APP_RED_FLAG.NO_SALARY_INCREASES_OR_BONUSES]:
			'brak podwyżek, bonusów lub premii',
		[APP_RED_FLAG.UNPAID_OR_DEDUCTED_EXPENSES]:
			'potrącanie lub niezwracanie kosztów związanych z pracą',
		[APP_RED_FLAG.TRASH_CONTRACTS]:
			'umowy śmieciowe lub oferowanie pracy na czarno',

		// -----------------------------------------------------------------------------------
		// Projects - Job satisfaction
		[APP_RED_FLAG.BORING_PROJECTS]: 'nudne, nie inspirujące projekty',
		[APP_RED_FLAG.INSIGNIFICANT_MONOTONOUS_TASKS]:
			'redukcja obowiązków do kilku monotonnych, nie istotnych zadań',
		[APP_RED_FLAG.TASKS_DONT_MATCH_JOB_DESCRIPTION]:
			'obarczanie obowiązkami nie związanymi z zawodem architekta',
		[APP_RED_FLAG.CHEAPEST_SOLUTIONS_AND_BASIC_DESIGN]:
			'nastawienie na tanie, powtarzalne lub niskiej jakości rozwiązania projektowe',
		[APP_RED_FLAG.NO_VARIETY_IN_RESPONSIBILITIES]:
			'brak różnorodności w obowiązkach, typach projektów lub etapach projektowych',

		// -----------------------------------------------------------------------------------
		// Career
		[APP_RED_FLAG.CANT_GET_MEANINGFUL_EXPERIENCE]:
			'brak możliwości zdobycia wartościowego doświadczenia np. ze względu na zakres obowiązków lub typ wykonywanych przez firmę projektów',
		[APP_RED_FLAG.GLASS_CEILING]:
			'brak możliwości awansu na wyższe stanowisko',
		[APP_RED_FLAG.LACK_OF_MENTORING]:
			'brak mentoringu lub okazji nauki od bardziej doświadczonych architektów',
		[APP_RED_FLAG.NO_PERSONAL_DEVELOPMENT_PLAN_OR_EDUCATION_BUDGET]:
			'brak inwestycji w szkolenia dla pracowników',
		[APP_RED_FLAG.NOT_POSSIBLE_TO_INFLUENCE_COMPANY_STRATEGY]:
			'brak wpływu na strategię czy działania firmy',

		// -----------------------------------------------------------------------------------
		// TOOLS
		[APP_RED_FLAG.MISSING_OR_STUDENTS_LICENSE]:
			'używanie pirackiego oprogramowania lub studenckich licencji',
		[APP_RED_FLAG.REQUIRED_PRIVATE_HARDWARE_OR_SOFTWARE]:
			'wymaganie prywatnego komputera, oprogramowania lub innego sprzętu',
		[APP_RED_FLAG.OFFBRAND_OR_FREE_SOFTWARE]:
			'używanie darmowych zamienników oprogramowania ( Photopea, BlocksCad3d )',
		[APP_RED_FLAG.OLD_HARDWARE_OUTDATED_SOFTWARE]:
			'brakujące lub przestarzałe narzędzia pracy np. komputery, monitory, plotery etc',
		[APP_RED_FLAG.BAD_WORKSTATION_BAD_OFFICE]:
			'złe warunki biurowe: temperatura, oświetlenie, hałas, ergonomia, bezpieczeństwo lub higiena',
		[APP_RED_FLAG.MISSING_BASIC_OFFICE_SUPPLIES]:
			'brak materiałów biurowych, materiałów do rysowania lub budowania modeli',

		// -----------------------------------------------------------------------------------
		// MANAGEMENT & BUISNESS
		[APP_RED_FLAG.MICROMANAGEMENT]: 'mikrozarządzanie (micromanagement)',
		[APP_RED_FLAG.INCOMPETENT_MANAGEMENT]:
			' niekompetentne zarządzanie/szefostwo',
		[APP_RED_FLAG.INABILITY_TO_GET_PROFITABLE_ASSIGNMENTS]:
			'nieudolność w znajdowaniu dobrych, zyskownych zleceń lub klientów',
		[APP_RED_FLAG.FINANCIAL_PROBLEMS]: 'problemy finansowe firmy',
		[APP_RED_FLAG.OVERLY_RELYING_ON_INTERNS_OR_FREE_LABOUR]:
			'nadmierne poleganie na bezpłatnych stażystach',
		[APP_RED_FLAG.ILLEGAL_OR_IMMORAL]:
			'nielegalne lub niemoralne praktyki zawodowe lub biznesowe.',

		// -----------------------------------------------------------------------------------
		// General vibe check
		[APP_RED_FLAG.TOXIC_ATMOSPHERE]:
			'toksyczna atmosfera lub konflikty w zespole',
		[APP_RED_FLAG.FAVORITISM]: 'faworyzowanie wybranych pracowników',
		[APP_RED_FLAG.ABUSE_MOBBING]: 'mobbing, nękanie',
		[APP_RED_FLAG.STRESS_PRESSURE]: 'wysoki poziom stresu',
		[APP_RED_FLAG.INCOMPETENT_TEAM]: 'kompetentny zespół',

		// -----------------------------------------------------------------------------------
		// TIME and WORKLOAD
		[APP_RED_FLAG.UNREALISTIC_DEADLINES]: 'nierealistyczne terminy',
		[APP_RED_FLAG.SYSTEMATIC_OVERTIME]: 'regularne nadgodziny',
		[APP_RED_FLAG.WORK_ON_WEEKEND_AND_HOLIDAYS]:
			'przypadki wymagania pracy w weekendy lub święta',
		[APP_RED_FLAG.DENIED_TIME_OFF]: 'odmowa wakacji albo dni wolnych',
		[APP_RED_FLAG.OVERWHELMING_RESPONSIBILITY]:
			'obciążanie pracowników nadmierną odpowiedzialnością i konsekwencjami',

		// -----------------------------------------------------------------------------------
		// DISCRIMINATION
		[APP_RED_FLAG.ABLEISM]: 'dyskryminacja niepełnosprawnych (ableizm)',
		[APP_RED_FLAG.AGISM]: 'dyskryminacja ze względu na wiek (ageizm)',
		[APP_RED_FLAG.HOMOPHOBIA]: 'homofobia',
		[APP_RED_FLAG.NEPOTISM]: 'nepotyzm',
		[APP_RED_FLAG.RACISM]: 'rasizm',
		[APP_RED_FLAG.SEXISM]: 'seksizm',
		[APP_RED_FLAG.TRANSPHOBIA]: 'transfobia',
		[APP_RED_FLAG.XENOPHOBIA]: 'ksenofobia'
	};

	export function getRedFlagNameLabel(flag: AppRedFlag): string {
		return flagToMsg[flag];
	}
</script>

<script lang="ts">
	import { type AppRedFlag, APP_RED_FLAG } from '$lib/utils/dbEnums';
	export let flag: AppRedFlag;

	$: label = getRedFlagNameLabel(flag);
</script>

{label}
