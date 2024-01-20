<template>
	<div class="max-w-screen-sm mx-auto px-4 py-10">
		<form
			@submit.prevent="register"
			class="p-8 flex flex-col bg-white shadow-sm"
		>
			<h1 class="text-3xl text-gray-800 mb-4">Register</h1>
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
			<div class="flex flex-col mb-2">
				<label for="confirmPassword" class="mb-1 text-sm text-gray-500"
					>Confirm Password</label
				>
				<input
					v-model="confirmPassword"
					type="password"
					required
					class="p-2 text-gray-500 focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
					id="confirmPassword"
				/>
			</div>
			<button
				type="submit"
				class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-purple hover:bg-white hover:text-at-light-purple"
			>
				Register
			</button>
			<router-link class="text-sm mt-6 text-center" :to="{ name: 'Login' }">
				Already have an account? <span class="text-at-light-purple">Login</span>
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
	name: "register",
	setup() {
		const router = useRouter();
		const email = ref(null);
		const password = ref(null);
		const confirmPassword = ref(null);
		const errorMsg = ref(null);
		const register = async () => {
			if (password.value === confirmPassword.value) {
				try {
					const { error } = await supabase.auth.signUp({
						email: email.value,
						password: password.value
					});
					if (error) throw error;
					router.push({ name: "Login" });
				} catch (error) {
					errorMsg.value = error.message;
					toast(errorMsg.value, {
						type: "error",
						transition: "zoom",
						dangerouslyHTMLString: true
					});
				}
				return;
			} else {
				errorMsg.value = "Passwords do not match";
				toast(errorMsg.value, {
					type: "error",
					transition: "zoom",
					dangerouslyHTMLString: true
				});
			}
		};

		return { email, password, confirmPassword, register };
	}
};
</script>
