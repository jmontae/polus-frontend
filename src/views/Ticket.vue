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
         teamMembers: [],
         teams: [],
         tenants: [],
         subscribers: '',
         loading: true,
         email_thread: email_thread
      }
   },
   computed: {
      services: function() {
         return this.$catalog[this.ticket.type].getChildren( this.ticket.type ) || null
      },
      categories: function() {
         return this.$catalog[this.ticket.type].getChildren( this.ticket.classification.service ) || null
      },
      subcategories: function() {
         return this.$catalog[this.ticket.type].getChildren( this.ticket.classification.category ) || null
      }
      
   },
   beforeCreate: async function() {
      let id = this.$route.params.id
      //get the catalog

      //get the ticket data  
      this.ticket = await fetch(`${this.$serverURL}/s/ui/tickets/${id}`)
      .then( response => response.json() )
      //get the team members
      this.teamMembers = await fetch(`${this.$serverURL}/s/ui/users?team=${this.ticket.team}`)
         .then( response => response.json() )
      //get the tenant's teams
      this.teams = await fetch(`${this.$serverURL}/s/cherwell/teams/${this.ticket.tenant}`)
         .then( response => response.json() )
      this.tenants = await fetch( `${this.$serverURL}/s/ui/tenants` )
            .then( response => response.json() )

      if( this.ticket.subscribers ) {
         this.ticket.subscribers.forEach( sub => {
            this.subscribers += `${sub.email}; `
         })
      }
      
         
      this.loading = false
   },
   methods: {
      save: function() {
         fetch( `${this.$serverURL}/s/ui/tickets/save`, { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.ticket) })
				.then( result => {
					if( !result.ok ) {
						
						console.log( result );
					} else {
						return result.json()
					}
				}).then( result => {
					
					console.log( result );
				})
      },
      updateOwner: function() {
         this.teamMembers.forEach( member => {
            if( member.name === this.ticket.owner.name ) {
               this.ticket.owner.email = member.email
            }
         })
      },
      updateTeamMembers: async function() {
         this.teamMembers = await fetch(`${this.$serverURL}/s/ui/users?team=${this.ticket.team}`)
         .then( response => response.json() )
      },
      updateTeams: async function() {
         this.teams = await fetch(`${this.$serverURL}/s/cherwell/teams/${this.ticket.tenant}`)
         .then( response => response.json() )
      },
      updateSubscribers: function() {
         let emails = this.subscribers.split('; '),
         subs = []
         console.log( emails )
         emails.forEach( email => {
            let found = false
            this.ticket.subscribers.forEach( sub => {
               if( sub.email == email ) {
                  subs.push( sub )
                  found = true
               }
            })

            if( !found ) {
               subs.push( { name: 'new', email: email } )
            }
         })
         this.ticket.subscribers = subs
      }
   } 
}
   
</script>

<template>
   <div v-if="loading" id='loading'>
   loading . . .
   </div>
   <div v-else id='ticket' class="p-10">
      <div id='heading' class="pb-8 divide-y">
         <h1 id="ticket_number" class="text-4xl font-bold">{{ ticket.tenant + ticket.id }}</h1>
         <div id='ticket_status' class='border p-2 my-4 bg-blue-700 text-white rounded-lg'>{{ ticket.status }}</div>
         <h2 id='ticket_subject' class="text-2xl py-4">{{ ticket.subject }}</h2>
      </div>
      <div class="md:grid grid-cols-4 gap-3">
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
                        <select v-model='ticket.owner.name' @change="updateOwner()">
                           <option v-for='(member, key) in teamMembers' :key='key' v-bind:value='member.name'>
                              {{ member.name }}
                           </option>
                        </select>
                     </div>
                  </div>
                  <div id="ticket_tenant" class="pb-4">
                     <h4 class="font-bold pb-2">Tenant</h4>
                     <div class="border border-gray-600 px-4 py-2 bg-gray-300"> 
                        <select v-model='ticket.tenant' @change='updateTeams()'>
                           <option v-for='(tenant, key) in tenants' :key='key' v-bind:value='tenant'>
                              {{ tenant }}
                           </option>
                        </select>
                     </div>
                  </div>
                  <div id="ticket_team" class="pb-4">
                     <h4 class="font-bold pb-2">Owned by Team</h4>
                     <div class="border border-gray-600 px-4 py-2 bg-gray-300"> 
                        <select v-model='ticket.team' @change='updateTeamMembers()'>
                           <option v-for='(team, key) in teams' :key='key' v-bind:value='team.teamName'>
                              {{ team.teamName }}
                           </option>
                        </select>
                     </div>
                  </div>
                  <div v-if="ticket.classification != null" id="ticket_classification" class="pb-4">
                     <h4 class="font-bold pb-2">Classification</h4>
                     <div id='ticket_classification_service' class="border border-gray-600 px-4 py-2 bg-gray-300 mb-2">
                        <select v-model="ticket.classification.service" 
                        @change='{{ 
                           ticket.classification.category = ""; 
                           ticket.classification.subcategory = ""
                           }}'>
                              <option v-for='(service, key) in services' :key='key' v-bind:value='service.value'>
                                 {{ service.value }}
                              </option>
                           </select>   
                     </div>
                     <div id='ticket_classification_category' class="border border-gray-600 px-4 py-2 bg-gray-300 mb-2">
                        <select v-model="ticket.classification.category" 
                        @change='{{ 
                           ticket.classification.subcategory = "" 
                           }}'>
                              <option v-for='(cat, key) in categories' :key='key' v-bind:value='cat.value'>
                                 {{ cat.value }}
                              </option>
                           </select>
                     </div>
                     <div id='ticket_classification_subcategory' class="border border-gray-600 px-4 py-2 bg-gray-300 mb-2">
                           <select v-model="ticket.classification.subcategory">
                              <option v-for='(subcat, key) in subcategories' :key='key' v-bind:value='subcat.value'>
                                 {{ subcat.value }}
                              </option>
                           </select>
                     </div>
                  </div>
                  <div v-if="ticket.priority != null" id="ticket_priority" class="pb-4">
                     <h4 class="font-bold pb-2">Priority</h4>
                     <div class="border border-gray-600 px-4 py-2 bg-gray-300">{{ ticket.priority }}</div>
                  </div>
               </div>
            </div>
         </div>
         <div id="ticket_right" class="ticket_right col-span-3 md:px-24 divide-y">
               <div id='ticket_subscribers' class='py-4'>
                  <div id="title" class='font-bold pb-10 pr-5'>Subscribers</div>
                  <textarea id='subscribers' class="w-full p-2" v-model='subscribers' @change="updateSubscribers()"></textarea>
               </div>
               <div id="ticket_description" class="pt-3 pb-10"> 
                  <div id='title' class='font-bold pb-10 pr-5'>Description</div>{{ ticket.description.text }}
               </div>
               <!-- <h3 id='ticket_created_date' class="text-xl font-italic">{{ ticket.dated }}</h3> -->
           
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

   #title {
      display: inline-block;
      padding-bottom: 20px;
      padding-right: 10px;
      width: 125px;
   }
   
   #ticket_status {
      display: inline-block;
   }

   select {
      width: 100%;
   }
</style>