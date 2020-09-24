<script>
export default {
   name: 'ItemsPane',
   data: () => {
      return {}
   }
}
</script>

<template>
   <div id="items">
      <div class="container min-w-full h-10 text-sm text-left">
         <div id='list'>
            <div id="notifs" class="grid gap-0 grid-cols-2">
               <a href="#" class="font-bold hover:bg-orange-300 active:bg-green-600" v:on-click="">
                  <div class="col-span-1 border px-6 py-4 text-center"><span class="text-red-600 font-bold p-2">3</span>New</div>
               </a>
               <a href="#" class="font-bold hover:bg-orange-300 active:bg-orange-600">
                  <div class="col-span-1 border px-6 py-4 text-center">Updated</div>
               </a>
            </div>
            <div id="list_views" class="grid gap-0 grid-cols-1 border-2 border-green-300">
               <a href="#" class="font-bold hover:bg-green-300 active:bg-green-600"><div class="border px-6 py-4 text-left">My Items</div></a>
               <a href="#" class="font-bold hover:bg-green-300 active:bg-green-600"><div class="border px-6 py-4 text-left">Team Items</div></a>
            </div>
         </div>
      </div>
   </div>
</template>