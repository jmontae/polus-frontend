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
<div class='tasks container'>
      <div class="min-w-full h-10">
         <h2 id="heading" class="pb-2 font-bold">Tasks</h2>
         <div class="list overflow-scroll border border-gray-300 rounded-lg">
            <div v-for="(task, key) in tasks" :key="key" class="item p-2 border border-gray-300">
               <a :href="goTo(task.id)">
               <div class="task">
                  <div class='info w-64'>
                     <div id="id" class="font-bold">{{ task.tenant + task.id }}</div>
                     <div id="title"> {{ task.title }}</div>
                  </div>
                  <div class='time_requestor w-64'>
                     <div id="datetime" class="font-bold">{{ parseDateTime( task.dated ) }}</div>
                     <div id="requestor">{{ task.creator.name || "N/A" }}</div>
                  </div>
                  <div class="status ">{{ task.status }}</div>
               </div>
               </a>
            </div>
         </div>
      </div>
   </div>
</template>
<style scoped>
.tasks{
    height: 40vh;
   padding-bottom: 30px;
}

.list {
   height: 30vh;
}

.info, .time_requestor, .status {
   display: inline-block;
}

.item:hover {
   background-color: darksalmon;
}
</style>