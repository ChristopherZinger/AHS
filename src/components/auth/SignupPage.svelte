<script lang="ts">
	import AuthBox from './AuthBox.svelte';
	import SignupForm from './SignupForm.svelte';
</script>

<div class="signup-page">
	<div class="lg:my-12 w-full lg:flex lg:justify-center">
		<AuthBox title="Signup">
			<SignupForm />
		</AuthBox>
	</div>
</div>
