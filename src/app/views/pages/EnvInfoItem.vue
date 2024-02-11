<template>
    <div style="display: flex;justify-content: space-between;">
        <div style="background-color: blueviolet;">
            <slot name="left"></slot>
        </div>
        <div style="background-color: yellowgreen;">
            <slot name="right"></slot>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>