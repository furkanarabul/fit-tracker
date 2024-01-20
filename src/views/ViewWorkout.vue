<template>
	<div class="max-w-screen-sm mx-auto px-4 py-10">
		<div v-if="dataLoaded">
			<div class="flex flex-col items-center p-8 shadow-sm bg-white relative">
				<div v-if="user" class="flex absolute left-2 top-3 gap-x-2">
					<div v-tooltip="'Edit workout'" class="h-7 w-7" @click="editMode">
						<font-awesome-icon
							class="ml-2 text-green-300 hover:text-green-500 cursor-pointer duration-300 hover:transition-all"
							icon="pen-to-square"
						/>
					</div>
					<div
						v-tooltip="'Delete workout'"
						@click="deleteWorkout"
						class="h-7 w-7"
					>
						<font-awesome-icon
							class="ml-2 text-red-300 hover:text-red-500 cursor-pointer duration-300 hover:transition-all"
							icon="trash-can"
						/>
					</div>
				</div>

				<font-awesome-icon
					class="ml-2 text-at-light-purple h-24 w-24"
					:icon="
						data.workoutType === 'strength'
							? 'dumbbell'
							: data.workoutType === 'cardio'
							? 'running'
							: ''
					"
				/>

				<span
					class="mt-6 py-1.5 px-5 text-xs text-white text-black rounded-md bg-at-light-purple"
				>
					{{ data.workoutType }}
				</span>

				<div class="w-full mt-6">
					<input
						v-if="edit"
						type="text"
						class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
						v-model="data.workoutName"
					/>
					<h1 v-else class="text-gray-500 text-2xl text-center">
						{{ data.workoutName }}
					</h1>
				</div>
				<p class="text-xs mt-4 bg-gray-100 p-2 rounded-md text-gray-400">
					<font-awesome-icon class="mr-2 text-gray-300" icon="calendar" />
					{{ formatDate(data.created_at) }}
				</p>
				<p class="text-xs mt-4 bg-gray-100 p-2 rounded-md text-gray-400">
					<font-awesome-icon class="mr-2 text-gray-300" icon="calendar" />
					Last updated at :
					{{ formatDate(data.updated_at) }}
				</p>
			</div>

			<!-- Exercises -->
			<div class="mt-10 p-8  flex flex-col item-center bg-white shadow-sm">
				<!-- Strength Training -->
				<div
					v-if="data.workoutType === 'strength'"
					class="flex flex-col gap-y-4 w-full"
				>
					<div
						class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row border p-3 rounded-sm border-gray-200 shadow-sm"
						v-for="(item, index) in data.exercises"
						:key="index"
					>
						<div class="flex flex-2 flex-col md:w-1/3">
							<label for="exercise-name" class="mb-1 text-sm text-gray-500">
								Exercise
							</label>
							<input
								id="exercise-name"
								v-if="edit"
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
								type="text"
								v-model="item.exercise"
							/>
							<p v-else>{{ item.exercise }}</p>
						</div>
						<div class="flex flex-1 flex-col">
							<label for="sets" class="mb-1 text-sm text-gray-500">
								Sets
							</label>
							<input
								v-if="edit"
								id="sets"
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
								type="number"
								v-model="item.sets"
							/>
							<p v-else>{{ item.sets }}</p>
						</div>
						<div class="flex flex-1 flex-col">
							<label for="reps" class="mb-1 text-sm text-gray-500">
								Reps
							</label>
							<input
								v-if="edit"
								id="reps"
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
								type="number"
								v-model="item.reps"
							/>
							<p v-else>{{ item.reps }}</p>
						</div>
						<div class="flex flex-1 flex-col">
							<label for="weight" class="mb-1 text-sm text-gray-500">
								Weight (kg)
							</label>
							<input
								v-if="edit"
								id="weight"
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
								type="number"
								v-model="item.weight"
							/>
							<p v-else>{{ item.weight }}</p>
						</div>
						<font-awesome-icon
							v-if="edit"
							@click="deleteExercise(item.id)"
							class="absolute w-auto -left-7 cursor-pointer  ml-2 text-gray-300 hover:text-red-500 duration-300 hover:transition-all"
							icon="square-minus"
						/>
					</div>
					<button
						v-if="edit"
						@click="addExercise"
						type="button"
						class="py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-purple hover:bg-white hover:text-at-light-purple"
					>
						Add Exercise
					</button>
				</div>

				<!-- Cardio -->
				<div v-else class="flex flex-col gap-y-4 w-full">
					<div
						class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row border p-3 rounded-sm border-gray-200 shadow-sm"
						v-for="(item, index) in data.exercises"
						:key="index"
					>
						<div class="flex flex-2 flex-col md:w-1/3">
							<label for="cardioType" class="mb-1 text-sm text-gray-500">
								Type
							</label>
							<select
								id="cardioType"
								v-if="edit"
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
								type="text"
								v-model="item.cardioType"
							>
								<option value="#">Select Type</option>
								<option value="run">Runs</option>
								<option value="walk">Walk</option>
							</select>
							<p v-else>{{ item.cardioType }}</p>
						</div>
						<div class="flex flex-1 flex-col">
							<label for="distance" class="mb-1 text-sm text-gray-500">
								Distance (km)
							</label>
							<input
								v-if="edit"
								id="distance"
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
								type="number"
								v-model="item.distance"
							/>
							<p v-else>{{ item.distance }}</p>
						</div>
						<div class="flex flex-1 flex-col">
							<label for="duration" class="mb-1 text-sm text-gray-500">
								Duration
							</label>
							<input
								v-if="edit"
								id="duration"
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
								type="number"
								step="any"
								v-model="item.duration"
							/>
							<p v-else>{{ item.duration }}</p>
						</div>
						<div class="flex flex-1 flex-col">
							<label for="pace" class="mb-1 text-sm text-gray-500">
								Pace
							</label>
							<input
								v-if="edit"
								id="pace"
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
								type="number"
								v-model="item.pace"
							/>
							<p v-else>{{ item.pace }}</p>
						</div>
						<font-awesome-icon
							@click="deleteExercise(item.id)"
							v-if="edit"
							class="absolute w-auto -left-7 cursor-pointer  ml-2 text-gray-300 hover:text-red-500 duration-300 hover:transition-all"
							icon="square-minus"
						/>
					</div>
					<button
						@click="addExercise"
						v-if="edit"
						type="button"
						class="py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-purple hover:bg-white hover:text-at-light-purple"
					>
						Add Exercise
					</button>
				</div>
			</div>

			<button
				v-if="edit"
				@click="update"
				type="button"
				class="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-purple hover:bg-white hover:text-at-light-purple"
			>
				Update Workout
			</button>
		</div>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import { useRoute, useRouter } from "vue-router";
import store from "../store/index";
import { uid } from "uid";
import { toast } from "vue3-toastify";
import { formatDate } from "../utils/dateUtils";

export default {
	name: "view-workout",
	methods: {
		formatDate
	},
	setup() {
		const data = ref(null);
		const dataLoaded = ref(null);
		const errorMsg = ref(null);
		const route = useRoute();
		const router = useRouter();
		const user = computed(() => store.state.user);

		const currentId = route.params.workoutId;

		const getData = async () => {
			try {
				const { data: workouts, error } = await supabase
					.from("workouts")
					.select("*")
					.eq("id", currentId);
				if (error) throw error;
				data.value = workouts[0];
				dataLoaded.value = true;
			} catch (error) {
				errorMsg.value = error.message;
				toast(errorMsg.value, {
					type: "error",
					transition: "zoom",
					dangerouslyHTMLString: true
				});
			}
		};

		getData();

		const deleteWorkout = async () => {
			try {
				const { error } = await supabase
					.from("workouts")
					.delete()
					.eq("id", currentId);
				if (error) throw error;
				toast("Success: Workout Removed", {
					type: "success",
					transition: "zoom",
					autoClose: 2000,
					dangerouslyHTMLString: true
				});
				setTimeout(() => {
					router.push({ name: "Home" });
				}, 2000);
			} catch (error) {
				errorMsg.value = `Error: ${error.message}`;
				toast(errorMsg.value, {
					type: "error",
					transition: "zoom",
					dangerouslyHTMLString: true
				});
			}
		};

		const edit = ref(null);

		const editMode = () => {
			edit.value = !edit.value;
		};

		const addExercise = () => {
			if (data.value.workoutType === "strength") {
				data.value.exercises.push({
					id: uid(),
					exercise: "",
					sets: "",
					reps: "",
					weight: ""
				});
				return;
			}
			data.value.exercises.push({
				id: uid(),
				cardioType: "",
				distance: "",
				duration: "",
				pace: ""
			});
		};

		const deleteExercise = id => {
			if (data.value.exercises.length > 1) {
				data.value.exercises = data.value.exercises.filter(
					exercise => exercise.id !== id
				);
				return;
			}
			errorMsg.value =
				"Error: Cannot remove, need to at least have one exercise";
			toast(errorMsg.value, {
				type: "error",
				transition: "zoom",
				dangerouslyHTMLString: true
			});
		};

		const update = async () => {
			try {
				const { error } = await supabase
					.from("workouts")
					.update({
						workoutName: data.value.workoutName,
						exercises: data.value.exercises
					})
					.eq("id", currentId);
				if (error) throw error;
				edit.value = false;
				toast("Success: Workout Updated", {
					type: "success",
					transition: "zoom",
					dangerouslyHTMLString: true
				});
			} catch (error) {
				errorMsg.value = `Error: ${error.message}`;
				toast(errorMsg.value, {
					type: "error",
					transition: "zoom",
					dangerouslyHTMLString: true
				});
			}
		};

		return {
			data,
			dataLoaded,
			edit,
			editMode,
			user,
			deleteWorkout,
			addExercise,
			deleteExercise,
			update
		};
	}
};
</script>
