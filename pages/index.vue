<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Popular Food Courts</h1>
      <div class="flex items-center gap-4">
        <button
          v-if="curUser?.isAdmin"
          @click="showAddFoodCourt = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add New Food Court
        </button>
        <ViewSwitcher v-model="currentView" />
      </div>
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
          <template v-if="isLoading">
            <FoodCourtSkeleton v-for="n in 6" :key="n" />
          </template>
          <template v-else>
            <FoodCourtCard
              v-for="foodCourt in foodCourts"
              :key="foodCourt._id"
              :food-court="foodCourt"
            />
          </template>
        </div>
      </Transition>
    </div>

    <!-- Add Food Court Modal -->
    <div
      v-if="showAddFoodCourt"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showAddFoodCourt = false"
    >
      <div
        v-motion
        :initial="{ scale: 0.9, opacity: 0 }"
        :enter="{ scale: 1, opacity: 1 }"
        class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4"
        @click.stop
      >
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add New Food Court</h2>
          <AddressAutocomplete />
        </div>
        <div class="flex justify-end">
          <button
            @click="showAddFoodCourt = false"
            class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ViewSwitcher from '../components/common/ViewSwitcher';
import AddressAutocomplete from '../components/search/AddressAutocomplete.vue';
import FoodCourtSkeleton from '../components/FoodCourtSkeleton.vue';
import { useUserStore } from '../stores/user';
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const currentView = ref('list');
const showAddFoodCourt = ref(false);
const foodCourtsStore = useFoodCourtsStore();
const userStore = useUserStore();

// Initialize view from URL query string or localStorage
onMounted(() => {
  const viewParam = route.query.view;
  if (viewParam === 'list' || viewParam === 'map') {
    currentView.value = viewParam;
  } else {
    // If no URL parameter, try to get from localStorage
    const savedView = localStorage.getItem('preferredView');
    if (savedView === 'list' || savedView === 'map') {
      currentView.value = savedView;
      // Update URL to match localStorage preference
      router.replace({ query: { ...route.query, view: savedView } });
    }
  }
});

// Update URL and localStorage when view changes
watch(currentView, (newView) => {
  router.replace({ query: { ...route.query, view: newView } });
  localStorage.setItem('preferredView', newView);
});

foodCourtsStore.fetchFoodCourts();
const foodCourts = computed(() => foodCourtsStore.foodCourts);
const curUser = computed(() => userStore.curUser);
const isLoading = computed(() => foodCourtsStore.isLoading);
</script>