<script setup>
import styles from './ModalComponent.module.css'
import { defineProps } from 'vue';

defineProps({
    open: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <main v-if="open" :class="`${styles.main}`">
        <section :class="`${styles.modalContainer}`">
            <section :class="`${styles.modalContent} ${open && styles.active}`">
                <span class="pi pi-times icon-pi icn-right"></span>
                <slot></slot>
            </section>
        </section>
    </main>
</template>