<script>
export default {
   name: 'TicketReader',
   props: [ 'data' ]
}
</script>

<template>
   <div id="email_reader">
      <div id='content' class="min-w-full overflow-scroll container p-10 border border-indigo-500 rounded bg-gray-300">
         {{ data }}
      </div>
   </div>
</template>

<style>
#content {
   height: 50vh;
}
</style>