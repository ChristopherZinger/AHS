<script context="module" lang="ts">
	import { RedFlagSectionName } from '$lib/utils/redFlagUtils';

	const flagToMsg: Record<RedFlagSectionName, string> = {
		[RedFlagSectionName.CAREER]: 'Kariera',
		[RedFlagSectionName.DISCRIMINATION]: 'Dyskryminacja',
		[RedFlagSectionName.MANAGEMENT_AND_BUISNESS]: 'Kierownictwo i Biznes',
		[RedFlagSectionName.SALARY]: 'Wynagrodzenie',
		[RedFlagSectionName.JOB_SATISFACTION]:
			'Projekty i satysfakcja zawodowa',
		[RedFlagSectionName.TOOLS]: 'Narzędzia',
		[RedFlagSectionName.TIME_MANAGEMENT_AND_WORKLOAD]:
			'Zarządzanie czasem i nakład pracy',
		[RedFlagSectionName.VIBE]: 'Atmosfera'
	};

	export function getRedFlagSectionNameLabel(
		flag: RedFlagSectionName
	): string {
		return flagToMsg[flag];
	}
</script>

<script lang="ts">
	export let flag: RedFlagSectionName;

	$: label = getRedFlagSectionNameLabel(flag);
</script>

{label}
