import { toast } from 'vue-sonner';

export default defineNuxtPlugin(async () => {
    if (!import.meta.client) return;
    if (!('serviceWorker' in navigator)) return;

    const { useRegisterSW } = await import('virtual:pwa-register/vue');
    const { t } = useNuxtApp().$i18n as { t: (key: string) => string };

    const { needRefresh, updateServiceWorker } = useRegisterSW({
        immediate: true,
        onRegisteredSW(_swUrl, registration) {
            if (!registration) return;
            setInterval(() => {
                registration.update().catch(console.debug);
            }, 60 * 1000);
        },
    });

    let notified = false;
    watch(needRefresh, (value) => {
        if (!value || notified) return;
        notified = true;

        // Ensure users move to the latest build automatically on static hosting.
        updateServiceWorker(true);

        toast.info(t('notifications.updateAvailable'), {
            description: t('notifications.updateAvailableDescription'),
            duration: 4000,
        });
    });
});
