<script setup>
import styles from './Search.module.css'
</script>

<template>
    <main :class="`${styles.main}`">
        <input placeholder="search for a task" type="text" :class="`${styles.input}`">
        <button :class="`${styles.icon} pi pi-search`"></button>
    </main>
</template>