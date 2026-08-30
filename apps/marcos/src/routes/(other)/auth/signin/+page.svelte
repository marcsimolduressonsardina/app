<script lang="ts">
	import { authClient } from '@/client/auth-client';
	import { onMount } from 'svelte';
	import Loading from '@/components/generic/Loading.svelte';
	import Box from '@/components/generic/Box.svelte';
	import { IconType } from '@/components/generic/icon/icon.enum';

	onMount(() => {
		authClient.signIn.social({
			provider: 'auth0',
			callbackURL: '/'
		});
	});
</script>

<div class="flex min-h-screen w-full items-center justify-center">
	<div class="w-full px-3 md:w-1/2 md:px-0 lg:w-1/3">
		<Box title="Iniciando sesión..." icon={IconType.SECURITY}>
			<Loading text="" />
		</Box>
	</div>
</div>
