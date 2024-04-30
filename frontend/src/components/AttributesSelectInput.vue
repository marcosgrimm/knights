<template>
  <div>
    <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">Atributo Chave</label>
    <select :id="id" :name="id" @change="emit('update:modelValue', $event.target.value)" v-model="value" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      <option v-for="(attribute ,key) in Attributes" :value="attribute">{{ attribute.charAt(0).toUpperCase() + attribute.slice(1).toLowerCase() }}</option>
    </select>
  </div>
</template>
<script setup>
import {Attributes} from './../enums/attributes';
import {ref} from "vue";
const value = ref('');

const props = defineProps({
  id: {
    type: String,
    default: 'attribute',
    required: true
  },
  attribute: {
    type: Object,
    required: false
  }
})

const emit = defineEmits(['update:modelValue'])


</script>