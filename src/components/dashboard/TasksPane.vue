<script>

export default {
   name: 'TasksPane',
   props: [ 'tasks' ],
   data: () => {
      return {
         
      }
   },
   methods: {
      goTo: function(id) {
         return `./task/${id}`
      },
      parseDateTime( datetime ) {
         let today = new Date().toString()
         console.log( datetime )
         console.log( today )
         return datetime
      }
   }
}
</script>

<template>
   <div id="tasks" class='container block'>
      <div class="min-w-full h-10">
         <h2 id="heading" class="pb-2">Tasks</h2>
         <table class='table-fixed'>
            <thead>
               <tr>
                  <th class="px-4 py-2 w-1/5">ID</th>
                  <th class='px-4 py-2 w-2/5'>Title</th>
                  <th class='px-4 py-2 w-1/5'>Date</th>
                  <th class='px-4 py-2 w-1/5'>Creator</th>
               </tr>
            </thead>
            <div class='table_items'>
               <tr v-for="(task, key) in tasks" :key="key" id="task">
                  <a :href="goTo(task.id)">
                  <td class="border px-4 py-2 w-1/5">{{ task.id }}</td>
                  <td class="border px-4 py-2 w-1/5">{{ parseDateTime( task.dated ) }}</td>
                  <td class="border px-4 py-2 w-2/5">{{ task.title }}</td>
                  <td class="border px-4 py-2 w-1/5">{{ task.creator.name }}</td>
                  </a>
               </tr>
            </div>
         </table>      
      </div>
   </div>
</template>
<style scoped>
.tasks{
    height: 50vh;
    margin-bottom: 5px;
}

table{
   width: auto;
}

.table_items {
   border: 0.5 gray solid;
   height: 30vh;
   overflow: scroll;
}

tr{
   min-width: 100%;
   white-space: nowrap;
}
td{
   position: relative;
}
</style>