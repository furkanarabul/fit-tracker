<template>

	<div
		v-if="appReady"
		class="min-h-full font-Rubik box-border bg-gray-100 min-h-screen"
	>

		<Navigation />

		<router-view />

		<Analytics />

	</div>

</template>

<script>
 import Navigation from "./components/Navigation.vue"; import { ref } from "vue";
import { supabase } from "./supabase/init"; import store from "./store/index"; import
{ Analytics } from '@vercel/analytics/react'; export default { components: { Navigation
}, setup() { const appReady = ref(null); const user = supabase.auth.user(); if (!user)
{ appReady.value = true; } supabase.auth.onAuthStateChange((_, session) => { store.methods.setUser(session);
appReady.value = true; }); return { appReady, Analytics }; } };
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');
</style>

