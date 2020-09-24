<script>
export default {
   name: 'Editor',
   data: () => {
      return {
         content: ''
      }
   }
}
</script>

<template>
   <div id="ticket_editor">
      <div id="editor" class="container min-w-full mb-8 border border-orange-500 rounded bg-gray-100">
         <textarea class="w-full h-full p-5" :bind="content"></textarea>
      </div>
   </div>
</template>

<style>
#editor {
   height: 30vh;
}
</style>