<template>
  <div class="space-y-10 divide-y divide-gray-900/10">
    <form>
      <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">


        <div class="px-4 sm:px-0 col-span-3" v-if="errors.length">
          <div class="rounded-md bg-red-50 p-4" >
            <div class="flex">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">There were {{ errors.length }} errors with your submission</h3>
                <div class="mt-2 text-sm text-red-700">
                  <ul role="list" class="list-disc space-y-1 pl-5">
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 sm:px-0">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Knight</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            A man, usually of noble birth, who after an apprenticeship as page and squire was raised to honorable
            military rank and bound to chivalrous conduct.
          </p>
        </div>

        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div class="px-4 py-6 sm:p-8">
            <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
                <div class="mt-2">
                  <input type="text" name="name" id="name" autocomplete="given-name" :disabled="true" v-model="knight.name" readonly disabled required
                         class="block w-full disabled required:border-red-500 bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="nickname" class="block text-sm font-medium leading-6 text-gray-900">Apelido</label>
                <div class="mt-2">
                  <input id="nickname" name="nickname" type="text" autocomplete="nickname" v-model="form.nickname"
                         class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8 ">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit"
                @click.prevent="updateKnight"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { XCircleIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
import router from "../router.js";

const apiUrl = import.meta.env.VITE_KNIGHTS_CHALLANGE_API_URL;
const id = router.currentRoute.value?.params?.id

const form = ref({
  nickname: null,
})


const knight = ref({});
const errors = ref([]);
onMounted(() => {
  getKnight();
})
const getKnight = async () => {
  try {
    
    await axios.get(`${apiUrl}/knights/${id}`).then(response => {
      knight.value = response.data
      form.value.nickname = knight.value.nickname

    }).catch(error => {
      console.log('errors', error.response.data);
      errors.value = error.response.data.message
    })
  } catch (error) {
    console.error(error)
  }
}
const updateKnight = async () => {
  try {
    await axios.patch(`${apiUrl}/knights/${id}`, form.value).then(response => {
      // redirect to knights list
      router.push('/knights')
    }).catch(error => {
      console.log('errors', error.response.data);
      errors.value = error.response.data.message
    })

    
  } catch (error) {
    console.error(error)
  }
}

const validateForm = () => {
  return form.value.name && form.value.nickname && form.value.birthday && form.value.attributes.strength && form.value.attributes.dexterity && form.value.attributes.constitution && form.value.attributes.intelligence && form.value.attributes.wisdom && form.value.attributes.charisma
}


const enabled = ref(false)
</script>