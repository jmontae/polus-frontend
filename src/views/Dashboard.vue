<script>
import TicketsPane from "../components/dashboard/TicketsPane.vue"
import ItemsPane from "../components/dashboard/ItemsPane.vue"
import TasksPane from "../components/dashboard/TasksPane.vue"

export default {
   name: 'Dashboard',
   components: { TicketsPane, ItemsPane, TasksPane },
   data: () => {
      return {
         tickets: [],
         tasks: [],
         views: {},
         loading: false
      }
   },
   created: async function() {
      let body = { "tenant": 'ATEC' },
      dashboard = await fetch(`http://localhost:9000/s/ui/dashboards/default`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(body)
      }).then( response => 
         response.json() 
         )
   
      console.log( dashboard )

      this.tickets = dashboard.data.tickets,
      this.tasks = dashboard.data.tasks,
      this.views = dashboard.views

      this.loading = true

      
   }
}
</script>

<template>
   <div id='dashboard' class="dashboard">      
      <div v-if='!loading'>
      loading...
      </div>
      <div v-else class="layout grid grid-cols-3 gap-2">
         <div id='dash_left' class="dash_left col-span-1 p-12">
            <ItemsPane v-on:click="renderItems" />
         </div>
         <div id="dash_right" class="dash_right col-span-2 p-12">
               <TicketsPane :tickets="tickets" />
               <TasksPane :tasks='tasks' />
         </div>
      </div>
   </div>
</template>

<style scoped>
.dashboard {
   padding-top: 50px;
   min-height: 100vh;
   width: 100vw;
}

.layout, .dash_left, .dash_right {
   min-height: 100vh;
}

.dash_left {
   position: fixed;
   left: 0;
   margin-left: 50px;
   width: 30vw;
}

.dash_right {
   position: absolute;
   margin-right: 10px;
   right: 0;
}

</style>
