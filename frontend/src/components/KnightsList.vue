<template>
  <div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Knights</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the knights including their name, age, weapons, key attribute, attack and experience.</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <router-link to="/knights/create" 
                         class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                         >
              Criar Knight
            </router-link>
        </div>
      </div>
    </div>
    <div class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <table class="w-full text-left">
          <thead class="bg-white">
          <tr>
            <th scope="col" class="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
              Nome
            </th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
              Idade
            </th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
              Armas
            </th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
              Atributo
            </th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
              Ataque
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Exp</th>
            <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Ações</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="knight in knights" :key="knight._id">
            <td class="relative py-4 pr-3 text-sm font-medium text-gray-900 capitalize">
              {{ knight.name }}
              <div class="absolute bottom-0 right-full h-px w-screen bg-gray-100"/>
              <div class="absolute bottom-0 left-0 h-px w-screen bg-gray-100"/>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{
                calculateKnightAge(knight.birthday)
              }}
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
              <ul role="list" class="divide-y divide-white/5">
                <li v-for="weapon in knight.weapons" :key="weapon._id"
                    class="relative flex items-center space-x-4 py-4">
                  <div class="min-w-0 flex-auto">
                    <div class="flex items-center gap-x-3">
                      <div alt="Equipped"
                           :class=" [weapon.equipped? 'text-green-400 bg-green-400/10' : null, 'flex-none rounded-full p-1']">
                        <div class="h-2 w-2 rounded-full bg-current"/>
                      </div>
                      <h2 class="min-w-0 text-sm font-semibold leading-6">
                        <span class="flex gap-x-2">
                          <span class="truncate">{{ weapon.name }}</span>
                          <span class="absolute inset-0"/>
                        </span>
                      </h2>
                    </div>
                    <div class="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                      <p class="truncate">Mod: {{ weapon.mod }}</p>
                      <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-gray-300">
                        <circle cx="1" cy="1" r="1"/>
                      </svg>
                      <p class="whitespace-nowrap capitalize"> {{ weapon.attr }}</p>
                    </div>
                  </div>
                </li>
              </ul>

            </td>
            <td class="px-3 py-4 text-sm text-gray-500 capitalize">{{ knight.keyAttribute }}</td>
            <td class="px-3 py-4 text-sm text-gray-500">{{ calculateAttack(knight) }}</td>
            <td class="px-3 py-4 text-sm text-gray-500">{{ calculateExperience(knight) }}</td>
            <td class="relative py-4 pl-3 text-center text-sm font-medium">
              <button v-if="!knight.hero_at" type="button"
                      @click="promoteToHero(knight)"
                      class="mx-1 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Promover A Herói
                
              </button>
              
              <router-link :key="knight._id" :to="`/knights/${knight._id}`"
                           class="mx-1 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Editar
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import ATTRIBUTE_MODIFIERS from "../enums/attribute-mods.js";
import axios from 'axios'
import router from "../router.js";

const apiUrl = import.meta.env.VITE_KNIGHTS_CHALLANGE_API_URL;

const props = defineProps({
  showHeroes: {
    type: Boolean,
    required: false,
    default: false,

  },
})

const knights = ref([]);
const fetchKnights = async () => {
  try {
    const filter = router.currentRoute?.value?.query?.filter
    
    const response = await fetch(apiUrl + `/knights` + (filter ? '?filter=heroes': ''),{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    knights.value = await response.json()
    // console.log(data)
  } catch (error) {
    console.error(error)
  }
}
const calculateKnightAge = (birthday) => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

const calculateAttack = (knight) => {
  let attack = 10;

  // Assuming that the `mod` of the `keyAttribute` is accessible as `knight.keyAttribute.mod`
  attack += getKeyAttributeMod(knight);

  if (!knight.weapons) {
    return attack;
  }
  for (let weapon of knight.weapons) {
    if (weapon.equipped) {
      attack += weapon.mod;
    }
  }

  return attack;
}

const getKeyAttributeMod = (knight) => {
  if (!knight.attributes) {
    return 0;
  }

  const keyAttributeValue = knight.attributes[knight.keyAttribute]
  if (!keyAttributeValue) {
    return 0;
  }

  return ATTRIBUTE_MODIFIERS[keyAttributeValue] || 0;
}

const calculateExperience = (knight) => {
  if (calculateKnightAge(knight.birthday) - 7 <= 0) {
    return 0;
  }
  
  return Math.floor((calculateKnightAge(knight.birthday) - 7) * Math.pow(22, 1.45));
};

const  promoteToHero = async (knight) => {
  await axios.delete(apiUrl + `/knights/${knight._id}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error)
    })
}


onMounted(() => {
  fetchKnights()
})
</script>
