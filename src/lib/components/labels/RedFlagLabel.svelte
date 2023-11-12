<script context="module" lang="ts">
	const flagToMsg: Record<AppRedFlag, string> = {
		// -----------------------------------------------------------------------------------
		// Money
		[AppRedFlag.UNPAID_INTERNSHIP]: 'bezpłatny staż',
		[AppRedFlag.UNPAID_OVERTIME]: 'bezpłatne nadgodziny',
		[AppRedFlag.STARVING_SALARY]: 'wyjątkowo niskie wynagrodzenie',
		[AppRedFlag.UNEQUAL_SALARIES]:
			'dyskryminacja finansowa - wynagrodzenie uwarunkowane płcią, pochodzeniem etc.',
		[AppRedFlag.CHANGES_IN_EMPLOYMENT_CONDITIONS]:
			'wymuszona zmiana warunków np. wynagrodzenie albo stanowisko',
		[AppRedFlag.DELAYED_PAYSLIPS]: 'opóźnione wypłaty',
		[AppRedFlag.PAYCHECK_LOWER_THEN_AGREED]:
			'wypłacanie niepełnej lub niżej niż ustalono pensji.',
		[AppRedFlag.NO_SALARY_INCREASES_OR_BONUSES]:
			'brak podwyżek, bonusów lub premii',
		[AppRedFlag.UNPAID_OR_DEDUCTED_EXPENSES]:
			'potrącanie lub niezwracanie kosztów związanych z pracą',
		[AppRedFlag.TRASH_CONTRACTS]:
			'umowy śmieciowe lub oferowanie pracy na czarno',

		// -----------------------------------------------------------------------------------
		// Projects - Job satisfaction
		[AppRedFlag.BORING_PROJECTS]: 'nudne, nie inspirujące projekty',
		[AppRedFlag.INSIGNIFICANT_MONOTONOUS_TASKS]:
			'redukcja obowiązków do kilku monotonnych, nie istotnych zadań',
		[AppRedFlag.TASKS_DONT_MATCH_JOB_DESCRIPTION]:
			'obarczanie obowiązkami nie związanymi z zawodem architekta',
		[AppRedFlag.CHEAPEST_SOLUTIONS_AND_BASIC_DESIGN]:
			'nastawienie na tanie, powtarzalne lub niskiej jakości rozwiązania projektowe',
		[AppRedFlag.NO_VARIETY_IN_RESPONSIBILITIES]:
			'brak różnorodności w obowiązkach, typach projektów lub etapach projektowych',

		// -----------------------------------------------------------------------------------
		// Career
		[AppRedFlag.CANT_GET_MEANINGFUL_EXPERIENCE]:
			'brak możliwości zdobycia wartościowego doświadczenia np. ze względu na zakres obowiązków lub typ wykonywanych przez firmę projektów',
		[AppRedFlag.GLASS_CEILING]:
			'brak możliwości awansu na wyższe stanowisko',
		[AppRedFlag.LACK_OF_MENTORING]:
			'brak mentoringu lub okazji nauki od bardziej doświadczonych architektów',
		[AppRedFlag.NO_PERSONAL_DEVELOPMENT_PLAN_OR_EDUCATION_BUDGET]:
			'brak inwestycji w szkolenia dla pracowników',
		[AppRedFlag.NOT_POSSIBLE_TO_INFLUENCE_COMPANY_STRATEGY]:
			'brak wpływu na strategię czy działania firmy',

		// -----------------------------------------------------------------------------------
		// TOOLS
		[AppRedFlag.MISSING_OR_STUDENTS_LICENSE]:
			'używanie pirackiego oprogramowania lub studenckich licencji',
		[AppRedFlag.REQUIRED_PRIVATE_HARDWARE_OR_SOFTWARE]:
			'wymaganie prywatnego komputera, oprogramowania lub innego sprzętu',
		[AppRedFlag.OFFBRAND_OR_FREE_SOFTWARE]:
			'używanie darmowych zamienników oprogramowania ( Photopea, BlocksCad3d )',
		[AppRedFlag.OLD_HARDWARE_OUTDATED_SOFTWARE]:
			'brakujące lub przestarzałe narzędzia pracy np. komputery, monitory, plotery etc',
		[AppRedFlag.BAD_WORKSTATION_BAD_OFFICE]:
			'złe warunki biurowe: temperatura, oświetlenie, hałas, ergonomia, bezpieczeństwo lub higiena',
		[AppRedFlag.MISSING_BASIC_OFFICE_SUPPLIES]:
			'brak materiałów biurowych, materiałów do rysowania lub budowania modeli',

		// -----------------------------------------------------------------------------------
		// MANAGEMENT & BUISNESS
		[AppRedFlag.MICROMANAGEMENT]: 'mikrozarządzanie (micromanagement)',
		[AppRedFlag.INCOMPETENT_MANAGEMENT]:
			' niekompetentne zarządzanie/szefostwo',
		[AppRedFlag.INABILITY_TO_GET_PROFITABLE_ASSIGNMENTS]:
			'nieudolność w znajdowaniu dobrych, zyskownych zleceń lub klientów',
		[AppRedFlag.FINANCIAL_PROBLEMS]: 'problemy finansowe firmy',
		[AppRedFlag.OVERLY_RELYING_ON_INTERNS_OR_FREE_LABOUR]:
			'nadmierne poleganie na bezpłatnych stażystach',
		[AppRedFlag.ILLEGAL_OR_IMMORAL]:
			'nielegalne lub niemoralne praktyki zawodowe lub biznesowe.',

		// -----------------------------------------------------------------------------------
		// General vibe check
		[AppRedFlag.TOXIC_ATMOSPHERE]:
			'toksyczna atmosfera lub konflikty w zespole',
		[AppRedFlag.FAVORITISM]: 'faworyzowanie wybranych pracowników',
		[AppRedFlag.ABUSE_MOBBING]: 'mobbing, nękanie',
		[AppRedFlag.STRESS_PRESSURE]: 'wysoki poziom stresu',
		[AppRedFlag.INCOMPETENT_TEAM]: 'kompetentny zespół',

		// -----------------------------------------------------------------------------------
		// TIME and WORKLOAD
		[AppRedFlag.UNREALISTIC_DEADLINES]: 'nierealistyczne terminy',
		[AppRedFlag.SYSTEMATIC_OVERTIME]: 'regularne nadgodziny',
		[AppRedFlag.WORK_ON_WEEKEND_AND_HOLIDAYS]:
			'przypadki wymagania pracy w weekendy lub święta',
		[AppRedFlag.DENIED_TIME_OFF]: 'odmowa wakacji albo dni wolnych',
		[AppRedFlag.OVERWHELMING_RESPONSIBILITY]:
			'obciążanie pracowników nadmierną odpowiedzialnością i konsekwencjami',

		// -----------------------------------------------------------------------------------
		// DISCRIMINATION
		[AppRedFlag.ABLEISM]: 'dyskryminacja niepełnosprawnych (ableizm)',
		[AppRedFlag.AGISM]: 'dyskryminacja ze względu na wiek (ageizm)',
		[AppRedFlag.HOMOPHOBIA]: 'homofobia',
		[AppRedFlag.NEPOTISM]: 'nepotyzm',
		[AppRedFlag.RACISM]: 'rasizm',
		[AppRedFlag.SEXISM]: 'seksizm',
		[AppRedFlag.TRANSPHOBIA]: 'transfobia',
		[AppRedFlag.XENOPHOBIA]: 'ksenofobia'
	};

	export function getRedFlagNameLabel(flag: AppRedFlag): string {
		return flagToMsg[flag];
	}
</script>

<script lang="ts">
	import { AppRedFlag } from '$lib/utils/dbEnums';
	export let flag: AppRedFlag;

	$: label = getRedFlagNameLabel(flag);
</script>

{label}
