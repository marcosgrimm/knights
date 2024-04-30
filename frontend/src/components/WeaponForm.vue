<template>
  <div class="max-w-2xl space-y-10">
    <div class="sm:col-span-3">
      <label :for="`${index}_weapon_name`" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
      <div class="mt-2">
        <input type="text" :id="`${index}_weapon_name`" v-model="weapon.name"
               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
      </div>
    </div>

    <div class="sm:col-span-4">
      <label :for="`${index}_weapon_mod`"  class="block text-sm font-medium leading-6 text-gray-900">Mod</label>
      <div class="mt-2">
        <input :id="`${index}_weapon_mod`" :name="`${index}_weapon_mod`" type="text" v-model="weapon.mod"
               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
      </div>
    </div>

    <div class="sm:col-span-4">
      <AttributesSelectInput :id="`${index}_weapon_attributes`" :value="weapon.attr" @update:modelValue="weapon.attr = $event"></AttributesSelectInput>
    </div>
    <div class="sm:col-span-4">
      <label class="block text-sm font-medium leading-6 text-gray-900">Equipada</label>
      <div class="mt-2">
          <Switch v-model="enabled" @update:modelValue="newValue => weapon.equipped = newValue" :id="`${index}_weapon_equipped`" :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
            <span class="sr-only">Use setting</span>
            <span aria-hidden="true" :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
          </Switch>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'
import AttributesSelectInput from "./AttributesSelectInput.vue";

const props = defineProps({
  weapon: {
    type: Object,
    required: true
  },
  index: {
    required: true,
  }
})


const enabled = ref(false)
</script>