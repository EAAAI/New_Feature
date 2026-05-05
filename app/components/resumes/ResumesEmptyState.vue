<template>
    <div class="text-center py-16">
        <div v-if="type === 'no-resumes'">
            <FileText class="w-24 h-24 text-ink-5 mx-auto mb-4" />
            <h2 class="text-2xl font-semibold text-ink mb-2">
                {{ $t('resumes.empty.noResumes') }}
            </h2>
            <p class="text-ink-3 mb-6">
                {{ $t('resumes.empty.createFirst') }}
            </p>
            <Button
                size="lg"
                @click="$emit('create')"
            >
                {{ $t('resumes.empty.createFirstButton') }}
            </Button>
        </div>
        <div v-else-if="type === 'no-search-results'">
            <Search class="w-24 h-24 text-ink-5 mx-auto mb-4" />
            <h2 class="text-2xl font-semibold text-ink mb-2">
                {{ $t('resumes.empty.noResults') }}
            </h2>
            <p class="text-ink-3 mb-6">
                {{ $t('resumes.empty.noResultsMessage') }} "{{ searchQuery }}"
            </p>
            <div class="flex gap-3 justify-center">
                <Button
                    variant="outline"
                    @click="$emit('clear-search')"
                >
                    {{ $t('resumes.empty.clearSearch') }}
                </Button>
                <Button @click="$emit('create')">
                    {{ $t('resumes.empty.createNew') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { FileText, Search } from 'lucide-vue-next';

interface Props {
    type: 'no-resumes' | 'no-search-results';
    searchQuery?: string;
}

defineProps<Props>();

defineEmits<{
    'create': [];
    'clear-search': [];
}>();
</script>
