<template>
    <ACard hoverable style="width: 240px" class="card">
      <template #cover>
        <img alt="example" :src="`${VITE_BASE_PHOTO_URL}${props.post.url}`" />
      </template>
      <ACardMeta  :title="post.name">
        <template #description>{{props.post.caption}}</template>
      </ACardMeta>
    </ACard>
  </template>

<script setup>
import {defineProps} from 'vue';

const {VITE_BASE_PHOTO_URL} = import.meta.env

const props = defineProps(['post'])
</script>

<style>
.card{
    margin-bottom: 20px;
}
</style>
  
  
  