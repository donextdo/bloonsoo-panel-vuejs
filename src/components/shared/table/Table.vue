<template>
    
    <div class="overflow-x-auto h-[68vh] relative">
    
          <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-sm text-gray-700 border border-gray-100 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <slot name="thead" />
              </tr>
            </thead>
            <tbody class="bg-white overflow-y-auto">  
              <slot name="tbody" />
            </tbody>
          </table>
        
    </div>

</template>