<script>

export default {
   name: 'TicketsPane',
   props: [ 'tickets' ],
   data: () => {
      return {
         
      }
   },
   methods: {
      goTo: function(id) {
         return `./ticket/${id}`
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
   <div id="tickets" class='tickets container block'>
      <div class="min-w-full h-10">
         <h2 id="heading" class="pb-2">Tickets</h2>
            <table class='table-fixed'>
               <thead>
                  <tr>
                     <th class="px-4 py-2 w-1/5">ID</th>
                     <th class='px-4 py-2 w-2/5'>Subject</th>
                     <th class='px-4 py-2 w-1/5'>Date</th>
                     <th class='px-4 py-2 w-1/5'>Requestor</th>
                  </tr>
               </thead>
               <div class='table_items'>
                  <tr v-for="(ticket, key) in tickets" :key="key" id="ticket">
                     <a :href="goTo(ticket.id)">
                     <td class="border px-4 py-2 w-1/5">{{ ticket.id }}</td>
                     <td class="border px-4 py-2 w-1/5">{{ parseDateTime( ticket.dated ) }}</td>
                     <td class="border px-4 py-2 w-2/5">{{ ticket.subject }}</td>
                     <td class="border px-4 py-2 w-1/5">{{ ticket.requestor.name }}</td>
                     </a>
                  </tr>
               </div>
            </table>   
      </div>
   </div>
</template>
<style scoped>
.tickets{
    height: 50vh;
    margin-bottom: 5px;
}

table{
   width: inherit;
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
