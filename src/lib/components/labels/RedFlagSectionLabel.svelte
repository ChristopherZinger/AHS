<script context="module" lang="ts">
	import { RedFlagSectionName } from '$lib/utils/redFlagUtils';

	const flagToMsg: Record<RedFlagSectionName, string> = {
		[RedFlagSectionName.CAREER]: 'Kariera',
		[RedFlagSectionName.DISCRIMINATION]: 'Dyskryminacja',
		[RedFlagSectionName.MANAGEMENT]: 'Zarząd',
		[RedFlagSectionName.PAYROLL]: 'Wynagrodzenie',
		[RedFlagSectionName.PROJECTS]: 'Projekty',
		[RedFlagSectionName.TOOLS]: 'Nażędzia',
		[RedFlagSectionName.TIME_MANAGEMENT]: 'Czas'
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
