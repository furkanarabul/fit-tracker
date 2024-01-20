<template>
	<div class="max-w-screen-md mx-auto px-4 py-10">
		<div class="p-8 flex items-start bg-white shadow-sm">
			<form
				@submit.prevent="createWorkout"
				class="flex flex-col gap-y-5 w-full"
			>
				<h1 class="text-2xl text-gray-800">Create Workout</h1>
				<div class="flex flex-col">
					<label for="workout-name" class="mb-1 text-sm text-gray-500">
						Workout Name
					</label>
					<input
						v-model="workoutName"
						type="text"
						class="p-2 text-gray-500 focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
						id="workout-name"
						required
					/>
				</div>
				<div class="flex flex-col">
					<label for="workout-type" class="mb-1 text-sm text-gray-500">
						Workout Type
					</label>
					<select
						@change="workoutChange"
						v-model="workoutType"
						id="workout-type"
						class="p-2 text-gray-500 focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
						required
					>
						<option value="select-workout">Select Workout</option>
						<option value="strength">Strength Training</option>
						<option value="cardio">Cardio</option>
					</select>
				</div>
				<div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
					<div
						v-for="(item, index) in exercises"
						:key="index"
						class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
					>
						<div class="flex flex-col md:w-1/3">
							<label for="exercise-name" class="mb-1 text-sm text-gray-500">
								Exercise
							</label>
							<input
								v-model="item.exercise"
								type="text"
								required
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
							/>
						</div>
						<div class="flex flex-col flex-1">
							<label for="sets" class="mb-1 text-sm text-gray-500">
								Sets
							</label>
							<input
								v-model="item.sets"
								type="number"
								required
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
							/>
						</div>
						<div class="flex flex-col flex-1">
							<label for="reps" class="mb-1 text-sm text-gray-500">
								Reps
							</label>
							<input
								v-model="item.reps"
								type="number"
								required
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
							/>
						</div>
						<div class="flex flex-col flex-1">
							<label for="number" class="mb-1 text-sm text-gray-500">
								Weights (kg)
							</label>
							<input
								v-model="item.weight"
								type="number"
								required
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
							/>
						</div>
						<span class="absolute -left-7 top-0" v-tooltip="'Delete exercise'">
							<font-awesome-icon
								@click="deleteExercise(item.id)"
								class=" ml-2 text-gray-300 hover:text-red-500 cursor-pointer duration-300 hover:transition-all"
								icon="square-minus"
							/>
						</span>
					</div>
					<button
						@click="addExercise"
						type="button"
						class="group mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-purple hover:bg-transparent hover:text-at-light-purple"
					>
						<font-awesome-icon
							class="mr-2 text-white hover:border-at-light-purple group-hover:text-at-light-purple"
							icon="plus"
						/>
						Add Exercise
					</button>
				</div>
				<div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
					<div
						v-for="(item, index) in exercises"
						:key="index"
						class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
					>
						<div class="flex flex-col md:w-1/3">
							<label for="cardio-type" class="mb-1 text-sm text-gray-500">
								Type
							</label>
							<select
								v-model="item.cardioType"
								id="cardio-type"
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
							>
								<option value="#">Select Type</option>
								<option value="run">Runs</option>
								<option value="walk">Walk</option>
							</select>
						</div>
						<div class="flex flex-col flex-1">
							<label for="distance" class="mb-1 text-sm text-gray-500">
								Distance (km)
							</label>
							<input
								v-model="item.distance"
								type="number"
								required
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
							/>
						</div>
						<div class="flex flex-col flex-1">
							<label for="duration" class="mb-1 text-sm text-gray-500">
								Duration
							</label>
							<input
								v-model="item.duration"
								type="number"
								step="any"
								required
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
							/>
						</div>
						<div class="flex flex-col flex-1">
							<label for="pace" class="mb-1 text-sm text-gray-500">
								Pace
							</label>
							<input
								v-model="item.pace"
								type="number"
								required
								class="p-2 text-gray-500 w-full focus:border-at-light-purple focus:ring-at-light-purple rounded-sm"
							/>
						</div>
						<span class="absolute -left-7 top-0" v-tooltip="'Delete exercise'">
							<font-awesome-icon
								@click="deleteExercise(item.id)"
								class=" ml-2 text-gray-300 hover:text-red-500 cursor-pointer duration-300 hover:transition-all"
								icon="square-minus"
							/>
						</span>
					</div>
					<button
						@click="addExercise"
						type="button"
						class="group mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-purple hover:bg-transparent hover:text-at-light-purple"
					>
						<font-awesome-icon
							class="mr-2 text-white hover:border-at-light-purple group-hover:text-at-light-purple"
							icon="plus"
						/>
						Add Exercise
					</button>
				</div>
				<button
					type="submit"
					class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-purple duration-200 border-solid border-2 border-transparent hover:border-at-light-purple hover:bg-white hover:text-at-light-purple"
				>
					Save Workout
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from "../supabase/init";
import { toast } from "vue3-toastify";

export default {
	name: "create",
	setup() {
		const workoutName = ref("");
		const workoutType = ref("select-workout");
		const exercises = ref([]);
		const errorMsg = ref(null);

		const addExercise = () => {
			if (workoutType.value === "strength") {
				exercises.value.push({
					id: uid(),
					exercise: "",
					sets: "",
					reps: "",
					weight: ""
				});
			}
			if (workoutType.value === "cardio") {
				exercises.value.push({
					id: uid(),
					cardioType: "",
					distance: "",
					duration: "",
					pace: ""
				});
			}
		};
		const deleteExercise = id => {
			if (exercises.value.length > 1) {
				exercises.value = exercises.value.filter(
					exercise => exercise.id !== id
				);
				return;
			}
			toast("Error: Cannot remove, need to have at least one exercise", {
				type: "error",
				transition: "zoom",
				dangerouslyHTMLString: true
			});
		};

		const workoutChange = () => {
			exercises.value = [];
			addExercise();
		};
		const createWorkout = async () => {
			try {
				const { error } = await supabase.from("workouts").insert([
					{
						workoutName: workoutName.value,
						workoutType: workoutType.value,
						exercises: exercises.value
					}
				]);
				if (error) throw error;
				toast("Success: Workout Created", {
					type: "success",
					transition: "zoom",
					dangerouslyHTMLString: true
				});
				workoutName.value = null;
				workoutType.value = "select-workout";
				exercises.value = [];
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
			workoutName,
			workoutType,
			exercises,
			addExercise,
			workoutChange,
			deleteExercise,
			createWorkout
		};
	}
};
</script>
