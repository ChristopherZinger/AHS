<script lang="ts">
	import AuthBox from './AuthBox.svelte';
	import LoginForm from './LoginForm.svelte';
</script>

<div class="login-page">
	<div class="lg:my-12 w-full lg:flex lg:justify-center">
		<AuthBox title="Login">
			<LoginForm />
		</AuthBox>
	</div>
</div>
