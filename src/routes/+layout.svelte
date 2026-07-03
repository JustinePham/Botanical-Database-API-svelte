<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

	<link rel="icon" href={favicon} />

{@render children()}
