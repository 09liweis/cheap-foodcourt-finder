<template>
  <form @submit.prevent="handleSubmit">
    <BaseInput
      id="name"
      label="Food Court Name"
      v-model="formData.name"
      placeholder="Enter food court name"
    />
    <BaseInput
      id="address"
      label="Address"
      v-model="formData.address"
      placeholder="Enter address"
    />
    <BaseInput
      id="image"
      label="Image URL"
      v-model="formData.image"
      placeholder="Enter image URL"
    />
    <BaseInput
      id="rating"
      label="Rating"
      type="number"
      v-model="formData.rating"
      placeholder="Enter rating (0-5)"
    />
    <BaseInput
      id="restaurantCount"
      label="Number of Restaurants"
      type="number"
      v-model="formData.restaurantCount"
      placeholder="Enter number of restaurants"
    />
    
    <div class="mt-6 flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
      >
        Save Food Court
      </button>
    </div>
  </form>
</template>

<script setup>
const formData = ref({
  name: '',
  address: '',
  image: '',
  rating: '',
  restaurantCount: ''
})

const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = () => {
  emit('submit', { ...formData.value })
}
</script>