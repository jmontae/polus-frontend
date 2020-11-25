<script>
export default {
   name: 'Info',
   props: [ 'data', 'catalog' ]
}
</script>

<template>
   <div id='ticket_details'>
      <div class="container min-w-full">
         <div id="ticket_requestor" class="pb-4">
            <h4 class="font-bold pb-2">Requestor</h4>
            <div class="border border-gray-600 px-4 py-2 bg-gray-300">{{ data.requestor.name }}</div>
         </div>
         <div id="ticket_owner" class="pb-4">
            <h4 class="font-bold pb-2">Owner</h4>
            <div class="border border-gray-600 px-4 py-2 bg-gray-300"> 
               <select v-model='data.owner.name'>
                  <option v-for='(member, key) in data.teamMembers' :key='key' v-bind:value='member.name'>
                     {{ member.name }}
                  </option>
               </select>
            </div>
         </div>
         <div v-if="data.classification != null" id="ticket_classification" class="pb-4">
            <h4 class="font-bold pb-2">Classification</h4>
            <div id='ticket_classification_service' class="border border-gray-600 px-4 py-2 bg-gray-300 mb-2">{{ data.classification.service }}</div>
            <div id='ticket_classification_category' class="border border-gray-600 px-4 py-2 bg-gray-300 mb-2">{{ data.classification.category }}</div>
            <div id='ticket_classification_subcategory' class="border border-gray-600 px-4 py-2 bg-gray-300 mb-2">{{ data.classification.subcategory }}</div>
         </div>
         <div v-if="data.priority != null" id="ticket_priority" class="pb-4">
            <h4 class="font-bold pb-2">Priority</h4>
            <div class="border border-gray-600 px-4 py-2 bg-gray-300">{{ data.priority }}</div>
         </div>
      </div>
   </div>
</template>