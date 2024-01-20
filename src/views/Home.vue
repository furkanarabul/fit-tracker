<template>
	<div v-if="dataLoaded && user" class="container mt-10 px-4">
		<div v-if="data.length === 0" class="w-full flex flex-col items-center">
			<h1 class="text-2xl">Looks empty here...</h1>
			<router-link
				class="mt-6 py-2 px-6 rounded-sm text-sm text-white bg-at-light-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-purple hover:bg-white hover:text-at-light-purple"
				:to="{ name: 'Create' }"
				>Create Workout</router-link
			>
		</div>
		<div
			v-else
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cold-3 lg:grid-cols-4 gap-6"
		>
			<router-link
				class="group border-t-4 border-gray-300 hover:border-at-light-purple flex flex-col items-center bg-white p-8 shadow-sm cursor-pointer duration-300 transition-all"
				:to="{ name: 'View-Workout', params: { workoutId: workout.id } }"
				v-for="(workout, index) in data"
				:key="index"
			>
				<font-awesome-icon
					class="ml-2 text-gray-300 h-24 w-24 group-hover:text-at-light-purple group-hover:border-at-light-purple duration-300 transition-all"
					:icon="
						workout.workoutType === 'strength'
							? 'dumbbell'
							: workout.workoutType === 'cardio'
							? 'running'
							: ''
					"
				/>

				<p
					class="mt-6 py-2 px-4 text-xs text-white bg-at-light-purple rounded-md"
				>
					{{ workout.workoutType }}
				</p>

				<h1 class="mt-8 mb-2 text-center text-xl text-gray-800">
					{{ workout.workoutName }}
				</h1>
				<p class="text-xs mt-4 bg-gray-100 p-2 rounded-md text-gray-400">
					<font-awesome-icon class="mr-2 text-gray-300" icon="calendar" />
					{{ formatDate(workout.created_at) }}
				</p>
			</router-link>
		</div>
	</div>
	<div v-else>
		<p class="text-3xl flex flex-col items-center mt-16 p-10 text-gray-600">
			Login to keep track of your exercises
		</p>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import store from "../store/index";
import { formatDate } from "../utils/dateUtils";

export default {
	name: "Home",
	components: {},
	methods: {
		formatDate
	},
	setup() {
		const data = ref([]);
		const dataLoaded = ref(null);
		const user = computed(() => store.state.user);

		const getData = async () => {
			try {
				const { data: workouts, error } = await supabase
					.from("workouts")
					.select("*");
				if (error) throw error;
				data.value = workouts;
				dataLoaded.value = true;
			} catch (error) {
				console.warn(error.message);
			}
		};

		getData();
		return {
			dataLoaded,
			data,
			user
		};
	}
};
</script>
