<script>
import TicketsPane from "../components/dashboard/TicketsPane.vue"
import ItemsPane from "../components/dashboard/ItemsPane.vue"
import TasksPane from "../components/dashboard/TasksPane.vue"

export default {
   name: 'Dashboard',
   components: { ItemsPane, TicketsPane, TasksPane },
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
      dashboard = await fetch(`${this.$serverURL}/s/ui/dashboards/default`, {
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

      
   },
   methods: {
      MyItems: function( value ) {
         let filtered = { tickets: [], tasks: [] }
         filtered['tickets'] = this.tickets.filter( ticket => ticket.owner.name == value )
         filtered['tasks'] = this.tasks.filter( task => task.owner.name == value )

         return filtered
      },
      TeamItems: function( value ) {
         let filtered = { tickets: [], tasks: [] }
         filtered['tickets'] = this.tickets.filter( ticket => ticket.team == value )
         filtered['tasks'] = this.tasks.filter( task => task.team == value )

         return filtered
      }
   }
}
</script>

<template>
   <div class='dashboard'>
      <div class='dash_left'>
        <ItemsPane />
      </div>
      <div class="dash_right">
         <TicketsPane :tickets='tickets' />
         <TasksPane :tasks="tasks" />
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
   width: 20vw;
}

.dash_right {
   max-height: 100vh;
   width: 60vw;
   position: absolute;
   margin-right: 80px;
   right: 0;
}

</style>
