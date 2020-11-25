<script>
import Editor from "../components/ticket/Editor.vue"
import Reader from "../components/ticket/Reader.vue"
import { email_thread } from '../components/ticket/.email.js'

export default {
   name: 'TicketView',
   components: { Editor, Reader },
   data: () => {
      return {
         ticket: {},
         catalog: {},
         teamMembers: [],
         loading: true,
         email_thread: email_thread
      }
   },
   beforeCreate: async function() {
      let id = this.$route.params.id
      //get the ticket data  
      this.ticket = await fetch(`${this.$serverURL}/s/ui/tickets/${id}`)
      .then( response => response.json() )
      
      this.teamMembers = await fetch(`${this.$serverURL}/s/ui/users?team=${this.ticket.team}`)
         .then( response => response.json() )
         
      this.loading = false
      //get the team members
   },
   methods: {
      save: function() {
         fetch( `${this.$serverURL}/s/ui/tickets/save`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.ticket) })
				.then( result => {
					if( !result.ok ) {
						
						console.log( result );
					} else {
						return result.json()
					}
				}).then( result => {
					
					console.log( result );
				})
      }
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
            <div id='ticket_details'>
               <div class="container min-w-full">
                  <div id="ticket_requestor" class="pb-4">
                     <h4 class="font-bold pb-2">Requestor</h4>
                     <div class="border border-gray-600 px-4 py-2 bg-gray-300">{{ ticket.requestor.name }}</div>
                  </div>
                  <div id="ticket_owner" class="pb-4">
                     <h4 class="font-bold pb-2">Owner</h4>
                     <div class="border border-gray-600 px-4 py-2 bg-gray-300"> 
                        <select v-model='ticket.owner.name'>
                           <option v-for='(member, key) in teamMembers' :key='key' v-bind:value='member.name'>
                              {{ member.name }}
                           </option>
                        </select>
                     </div>
                  </div>
                  <div v-if="ticket.classification != null" id="ticket_classification" class="pb-4">
                     <h4 class="font-bold pb-2">Classification</h4>
                     <div id='ticket_classification_service' class="border border-gray-600 px-4 py-2 bg-gray-300 mb-2">{{ ticket.classification.service }}</div>
                     <div id='ticket_classification_category' class="border border-gray-600 px-4 py-2 bg-gray-300 mb-2">{{ ticket.classification.category }}</div>
                     <div id='ticket_classification_subcategory' class="border border-gray-600 px-4 py-2 bg-gray-300 mb-2">{{ ticket.classification.subcategory }}</div>
                  </div>
                  <div v-if="ticket.priority != null" id="ticket_priority" class="pb-4">
                     <h4 class="font-bold pb-2">Priority</h4>
                     <div class="border border-gray-600 px-4 py-2 bg-gray-300">{{ ticket.priority }}</div>
                  </div>
               </div>
            </div>
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
      <div class="submit">
         <button class="submit_button" type="button" @click="save()">Save</button>
      </div>
   </div>
</template>
<style scoped>
.ticket_left, .ticket_right {
   margin-top: 10px;
}

.submit {
		background-color: white;
		position: fixed;
		width: 100vw;
		bottom: 0;
		left: 0;
		border-top: solid 1px gray;
		z-index: 98;
	}

	.submit > * {
		display: inline-block;
	}

	.submit_button {
		margin: 10px 0px 10px 15px;
		padding: 15px 20px;
		text-transform: uppercase;
		background-color: #67e67a;
		text-decoration: none;
		border: none;

	}
</style>