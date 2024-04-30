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
                  <input type="text" name="name" id="name" autocomplete="given-name" v-model="form.name" required 
                         class="block w-full  required:border-red-500 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="nickname" class="block text-sm font-medium leading-6 text-gray-900">Apelido</label>
                <div class="mt-2">
                  <input id="nickname" name="nickname" type="text" autocomplete="nickname" v-model="form.nickname"
                         class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div class="sm:col-span-4">
                <AttributesSelectInput @update:modelValue="form.keyAttribute = $event"></AttributesSelectInput>
              </div>

              <div class="col-span-4">
                <label for="birthday" class="block text-sm font-medium leading-6 text-gray-900">Data de
                  nascimento</label>
                <div class="mt-2">
                  <input type="date" name="birthday" id="birthday" v-model="form.birthday"
                         class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>


            </div>
          </div>

        </div>
      </div>

      <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div class="px-4 sm:px-0">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Attributes</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Each character has six ability scores that represent his
            character's most basic attributes. They are his raw talent and prowess. These scores, and the modifiers they
            create, affect nearly every aspect of a character's skills and abilities.</p>
        </div>

        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div class="px-4 py-6 sm:p-8">
            <div class="max-w-2xl space-y-10">
              <fieldset>
                <div class="mt-6 space-y-6">
                  <div class="relative flex gap-x-3">
                    <div class="mt-2">
                      <input type="text" name="strength" id="strength" v-model="form.attributes.strength"
                             class="block w-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div class="text-sm leading-6">
                      <label for="strength" class="font-medium text-gray-900">Strength</label>
                      <p class="text-gray-500">Physical power and carrying capacity.</p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="mt-2">
                      <input type="text" name="constitution" id="constitution"  v-model="form.attributes.constitution"
                             class="block w-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div class="text-sm leading-6">
                      <label for="constitution" class="font-medium text-gray-900">Constitution</label>
                      <p class="text-gray-500">Endurance, stamina and healthiness.</p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="mt-2">
                      <input type="text" name="dexterity" id="dexterity" v-model="form.attributes.dexterity"
                             class="block w-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div class="text-sm leading-6">
                      <label for="dexterity" class="font-medium text-gray-900">Dexterity</label>
                      <p class="text-gray-500">Agility, balance, coordination and reflexes.</p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="mt-2">
                      <input type="text" name="intelligence" id="intelligence" v-model="form.attributes.intelligence"
                             class="block w-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div class="text-sm leading-6">
                      <label for="intelligence" class="font-medium text-gray-900">Intelligence</label>
                      <p class="text-gray-500">Deductive reasoning, cognition, knowledge, memory, logic and
                        rationality.</p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="mt-2">
                      <input type="text" name="wisdom" id="wisdom" v-model="form.attributes.wisdom"
                             class="block w-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div class="text-sm leading-6">
                      <label for="wisdom" class="font-medium text-gray-900">Wisdom</label>
                      <p class="text-gray-500">Self-awareness, common sense, restraint, perception and insight.</p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="mt-2">
                      <input type="text" name="charisma" id="charisma" v-model="form.attributes.charisma"
                             class="block w-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div class="text-sm leading-6">
                      <label for="charisma" class="font-medium text-gray-900">Charisma</label>
                      <p class="text-gray-500">Force of personality, persuasiveness, leadership and successful
                        planning.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <template  v-for="(weapon, index) in form.weapons" :key="index">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div class="sm:flex sm:items-center" v-if="index===0">
              <div class="px-4 sm:px-0" >
                <h2 class="text-base font-semibold leading-7 text-gray-900">Armas</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">Any object used in fighting that will be used by a knight.</p>
              </div>
              <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button"
                        class="mx-1 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        @click="addWeapon()">
                  Nova Arma

                </button>
              </div>
            </div>
          </div>
          <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div class="px-4 py-6 sm:p-8">
              <WeaponForm :index="index" :weapon="form.weapons[index]"/>
            </div>
          </div>
        </template>
          
      </div>
      <div class="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8 ">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit"
                @click.prevent="createKnight"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WeaponForm from './WeaponForm.vue';
import AttributesSelectInput from "./AttributesSelectInput.vue";
import { XCircleIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
import router from "../router.js";

const apiUrl = import.meta.env.VITE_KNIGHTS_CHALLANGE_API_URL;

const form = ref({
  name: null,
  nickname: null,
  birthday: null,
  weapons: [
    {
      name:  null,
      mod:  null,
      attr:  null,
      equipped: true,
    }
  ],
  attributes: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  keyAttribute: null,
})

const addWeapon = () => {
  form.value.weapons.push({
    name: null,
    mod: null,
    attr: null,
    equipped: null,
  });
};


const knights = ref([]);
const errors = ref([]);
const createKnight = async () => {
  try {
    
    form.value.weapons.forEach(weapon => {
      weapon.mod = parseInt(weapon.mod)
    })
    
    //transform all form.attributes to int
    for (const key in form.value.attributes) {
      form.value.attributes[key] = parseInt(form.value.attributes[key])
    }
    
    
    //transform birthday to ISO 8601 string
    form.value.birthday = new Date(form.value.birthday).toISOString()
    
    await axios.post(`${apiUrl}/knights`, form.value).then(response => {
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