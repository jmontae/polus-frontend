<script>
import Info from "../components/Info.vue"
import Editor from "../components/ticket/Editor.vue"

export default {
   name: 'TaskView',
   components: { Info, Editor },
   data: () => {
      return {
         task: {},
         loading: true
      }
   },
   mounted: function() {
      let id = this.$route.params.id
      
      fetch(`${this.$serverURL}/s/ui/tasks/${id}`)
      .then( response => response.json() )
      .then( task => {
         console.log( task )
         this.task = task
         this.loading = false
      })
   }
}
</script>

<template>
   <div v-if="loading" id='loading'>
   loading . . .
   </div>
   <div v-else id='task' class='task mx-auto'>
      <div class="grid grid-cols-4 gap-3">
         <div id='task_left' class="col-span-1 p-6">
            <Info :data='{ 
               owner: task.owner, 
               requestor: task.creator,
               team: task.team }' />
         </div>
         <div id="task_right" class="col-span-3 px-12">
            <div id='heading' class="pb-8">
               <h1 id="task_number" class="text-4xl font-bold">{{ task.tenant + task.id }}</h1>
               <h2 id='task_title' class="text-2xl">{{ task.title }}</h2>
               <p id="task_description" class="pt-3 pb-10"> {{ task.description.text }}</p>
               <!-- <h3 id='task_created_date' class="text-xl font-italic">{{ task.dated }}</h3> -->
            </div>
            <Editor />
         </div>
      </div>
      <div class="submit">
         <button class="submit_button" type="button" @click="save()">Save</button>
      </div>
   </div>
</template>
<style scoped>
   .task {
      padding-top: 50px;
      min-height: 100vh;
      width: 100vw;
   }
</style>
