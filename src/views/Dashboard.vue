<script>
import TicketsPane from "../components/dashboard/TicketsPane.vue"
// import ItemsPane from "../components/dashboard/ItemsPane.vue"
import TasksPane from "../components/dashboard/TasksPane.vue"

export default {
   name: 'Dashboard',
   components: {  TicketsPane, TasksPane },
   data: () => {
      return {
         tickets: [],
         tickets_filtered: [],
         tasks: [],
         tasks_filtered: [],
         views: {},
         loading: true
      }
   },
   beforeCreate: async function() {
      let body = { "tenant": 'ATEC' },
      dashboard = await fetch(`${this.$serverURL}/s/ui/dashboards/default`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(body)
      }).then( response => 
         response.json() 
         )
   
      this.tickets = this.tickets_filtered = dashboard.data.tickets,
      this.tasks = this.tasks_filtered = dashboard.data.tasks,
      this.views = dashboard.views

      this.loading = false
      //get the service catalogs
      
      
   },
   computed: {
      newItems: function() {
         let count = null
         this.tickets.forEach( ticket => {
            if( ticket.status == 'New' )
            {
               count ++
            }
         })
         return count
      }
   },
   methods: {
      NewItems: function() {
         this.tickets_filtered = this.tickets.filter( ticket => ticket.status == "New" )
         this.tasks_filtered = this.tasks.filter( task => task.status == "New" )

      },
      MyItems: function() {
         this.tickets_filtered = this.tickets.filter( ticket => ticket.owner.name == this.$user.name )
         this.tasks_filtered = this.tasks.filter( task => task.owner.name == this.$user.name )
      },
      TeamItems: function() {

         this.tickets_filtered = this.tickets.filter( ticket => ticket.team == this.$user.team )
         this.tasks_filtered = this.tasks.filter( task => task.team == this.$user.team )
      }
   }
}
</script>

<template>
   <div v-if="loading" id='loading'>
   loading . . .
   </div>
   <div v-else class='dashboard md:grid grid-cols-4 gap-3 p-5'>
      <div class='dash_left col-span-1 p-6'>
        <!-- <ItemsPane /> -->
        <div id="items">
            <div class="container min-w-full h-10 text-sm text-left">
               <div id='list'>
                  <div id="notifs" class="grid gap-0 grid-cols-2">
                     <a href="#" class="font-bold hover:bg-orange-300 active:bg-green-600" @click="NewItems()">
                        <div v-if="newItems" class="col-span-1 border px-6 py-4 text-center"><span class="text-red-600 font-bold p-2">{{ newItems }}</span>New</div>
                     </a>
                     
                  </div>
                  <div id="list_views" class="grid gap-0 grid-cols-1 border-2 border-green-300">
                     <a @click="MyItems()" href="#" class="font-bold hover:bg-green-300 active:bg-green-600"><div class="border px-6 py-4 text-left">My Items</div></a>
                     <a @click="TeamItems()" href="#" class="font-bold hover:bg-green-300 active:bg-green-600"><div class="border px-6 py-4 text-left">Team Items</div></a>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="dash_right col-span-3 md:px-24 py-48 md:py-0">
         <TicketsPane :tickets='tickets_filtered' />
         <TasksPane :tasks="tasks_filtered" />
      </div>
   </div>
</template>

<style scoped>
.dashboard {
   padding-top: 50px;
   min-height: 100vh;
   width: 100vw;
}

.dash_left, .dash_right {
   margin-top: 10px;
}

</style>
