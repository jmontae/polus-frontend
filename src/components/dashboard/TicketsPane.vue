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
   <div class='tickets container'>
      <div class="min-w-full h-10">
         <h2 id="heading" class="pb-2 font-bold">Tickets</h2>
         <div class="list overflow-scroll border border-gray-300 rounded-lg">
            <div v-for="(ticket, key) in tickets" :key="key" id='item' class="item p-2 border border-gray-300">
               <a class='ticket' :href="goTo(ticket.id)">
               <div class="ticket">
                  <div class='info w-64'>
                     <div id="id" class="font-bold">{{ ticket.tenant + ticket.id }}</div>
                     <div id="subject"> {{ ticket.subject }}</div>
                  </div>
                  <div class='time_requestor w-64'>
                     <div id="datetime" class="font-bold">{{ parseDateTime( ticket.dated ) }}</div>
                     <div id="requestor">{{ ticket.requestor.name || "N/A" }}</div>
                  </div>
                  <div class="status ">{{ ticket.status }}</div>
               </div>
               </a>
            </div>
         </div>
      </div>
   </div>
</template>
<style scoped>
.tickets{
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
   background-color: aquamarine;
}

</style>
