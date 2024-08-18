<script setup>
import styles from './Search.module.css'
import { defineProps, defineEmits } from 'vue';

defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

//updates the modelValue which is bound to the text passed in the parent component
const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <main :class="`${styles.main} container`">
        <section :class="`${styles.content}`">
            <input :value="modelValue" @input="handleInput" placeholder="Filter by title" type="text"
                :class="`${styles.input}`">
        </section>
    </main>
</template>
