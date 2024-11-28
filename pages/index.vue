<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Popular Food Courts</h1>
      <ViewSwitcher v-model="currentView" />
    </div>

    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
    >
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="currentView === 'map'" class="mb-8">
          <FoodCourtMap :food-courts="foodCourts" />
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="currentView === 'list'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FoodCourtCard
            v-for="foodCourt in foodCourts"
            :key="foodCourt._id"
            :food-court="foodCourt"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import ViewSwitcher from '../components/common/ViewSwitcher';
const currentView = ref('list')
const foodCourtsStore = useFoodCourtsStore()
foodCourtsStore.fetchFoodCourts();
const foodCourts = computed(() => foodCourtsStore.foodCourts)
</script>