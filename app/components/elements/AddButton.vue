<template>
    <button
        class="w-full border-2 border-dashed border-border hover:border-primary/40 bg-transparent hover:bg-secondary text-ink-3 hover:text-ink px-4 py-1.5 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        @click="$emit('click')"
    >
        <Plus class="w-4 h-4" />
        <span class="text-sm font-medium">{{ label }}</span>
    </button>
</template>

<script lang="ts" setup>
import { Plus } from 'lucide-vue-next';

interface Props {
    label: string;
}
defineProps<Props>();
defineEmits<{
    click: [];
}>();
</script>
