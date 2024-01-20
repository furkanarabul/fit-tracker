<template>
	<div class="max-w-screen-sm mx-auto px-4 py-10">
		<form @submit.prevent="login" class="p-8 flex flex-col bg-white shadow-sm">
			<h1 class="text-3xl text-gray-800 mb-4">Login</h1>
			<div class="flex flex-col mb-2">
				<label for="email" class="mb-1 text-sm text-gray-500">Email</label>
				<input
					v-model="email"
					type="text"
					required
					class="p-2 text-gray-500 focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
					id="email"
				/>
			</div>
			<div class="flex flex-col mb-2">
				<label for="password" class="mb-1 text-sm text-gray-500"
					>Password</label
				>
				<input
					v-model="password"
					type="password"
					required
					class="p-2 text-gray-500 focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
					id="password"
				/>
			</div>
			<button
				type="submit"
				class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-purple hover:bg-white hover:text-at-light-purple"
			>
				Login
			</button>
			<router-link class="text-sm mt-6 text-center" :to="{ name: 'Register' }">
				Don't have an account?
				<span class="text-at-light-purple">Register</span>
			</router-link>
		</form>
	</div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

export default {
	name: "login",
	setup() {
		const router = useRouter();
		const email = ref(null);
		const password = ref(null);
		const errorMsg = ref(null);
		const login = async () => {
			try {
				const { error } = await supabase.auth.signIn({
					email: email.value,
					password: password.value
				});
				if (error) throw error;
				router.push({ name: "Home" });
			} catch (error) {
				errorMsg.value = `Error: ${error.message}`;
				toast(errorMsg.value, {
					type: "error",
					transition: "zoom",
					dangerouslyHTMLString: true
				});
			}
		};
		return { email, password, errorMsg, login };
	}
};
</script>
