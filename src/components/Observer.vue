<template>
    <div class="observer" ref="root"></div>
</template>

<style scoped>
.observer{
    height: 30px;
    background-color: red;
    width: 30px;
}
</style>
<script setup>

import {ref, onMounted} from 'vue'

const observer = ref(null)
const root = ref(null)

onMounted(()=>{
    observer.value = new IntersectionObserver(([entry])=>{
        if(entry && entry.isIntersecting){
            console.log('triggered')
        }
    })
    observer.value.observe(root.value)
})
</script>