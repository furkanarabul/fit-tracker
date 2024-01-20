<template>
	<header class="bg-gray-800 text-white border-t-4 border-at-light-purple">
		<nav
			class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row"
		>
			<div class="flex items-center gap-x-4">
				<router-link :to="{ name: 'Home' }">
					<h1
						class="text-2xl font-extrabold transition transform hover:scale-105	motion-reduce:transition-none motion-reduce:hover:transform-none"
					>
						<span class="text-purple-400">Fit</span>Tracker
					</h1>
				</router-link>
			</div>
			<ul class="flex flex-1 justify-end gap-x-10">
				<router-link
					active-class="active"
					class="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700 rounded-md hover:rounded p-3 duration-300 hover:transition-all"
					:to="{ name: 'Home' }"
					>Home</router-link
				>
				<router-link
					active-class="active"
					v-if="user"
					class="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700 rounded-md hover:rounded p-3 duration-300 hover:transition-all"
					:to="{ name: 'Create' }"
					>Create</router-link
				>
				<router-link
					active-class="active"
					v-if="!user"
					class="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700 rounded-md hover:rounded p-3 duration-300 hover:transition-all"
					:to="{ name: 'Login' }"
					>Login
					<font-awesome-icon class="ml-2 text-gray-300" icon="sign-out" />
				</router-link>
				<li
					active-class="active"
					v-if="user"
					@click="logout"
					class="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700 rounded-md hover:rounded p-3 duration-300 hover:transition-all"
				>
					Logout
					<font-awesome-icon class="ml-2 text-gray-300" icon="sign-out" />
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';
import store from '../store/index';
import { computed } from 'vue';

export default {
	components: {},

	setup() {
		const user = computed(() => store.state.user);
		const router = useRouter();
		const logout = async () => {
			await supabase.auth.signOut();
			router.push({ name: 'Home' });
		};
		return { logout, user };
	}
};
</script>
