<script>
import Info from "../components/Info.vue"
import Editor from "../components/ticket/Editor.vue"
import Reader from "../components/ticket/Reader.vue"
import { email_thread } from '../components/ticket/.email.js'

export default {
   name: 'TicketView',
   components: { Info, Editor, Reader },
   data: () => {
      return {
         ticket: {},
         loading: true,
         email_thread: email_thread
      }
   },
   created: function() {
      let id = this.$route.params.id
      
      fetch(`${this.$serverURL}/s/ui/tickets/${id}`)
      .then( response => response.json() )
      .then( ticket => {
         this.ticket = ticket
         this.loading = false
      })
   }
}
</script>

<template>
   <div v-if="loading" id='loading'>
   loading . . .
   </div>
   <div v-else id='ticket' class='container p-12 mx-auto'>
      <div class="grid grid-cols-4 gap-3">
         <div id='ticket_left' class="ticket_left col-span-1 p-6">
            <Info :data='{ 
               owner: ticket.owner, 
               requestor: ticket.requestor, 
               classification: ticket.classification, 
               priority: ticket.priority, 
               team: ticket.team }' />
         </div>
         <div id="ticket_right" class="ticket_right col-span-3 px-12">
            <div id='heading' class="pb-8">
               <h1 id="ticket_number" class="text-4xl font-bold">{{ ticket.tenant + ticket.id }}</h1>
               <h2 id='ticket_subject' class="text-2xl">{{ ticket.subject }}</h2>
               <p id="ticket_description" class="pt-3 pb-10"> {{ ticket.description.text }}</p>
               <!-- <h3 id='ticket_created_date' class="text-xl font-italic">{{ ticket.dated }}</h3> -->
            </div>
            <Editor />
            <div v-if='ticket.email'>
               <Reader :data='ticket.email.html || ticket.email.text' />
            </div>
         </div>
      </div>
   </div>
</template>
<style scoped>
.ticket_left, .ticket_right {
   margin-top: 10px;
}
</style>