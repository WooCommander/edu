<script setup lang="ts">
import { onMounted } from 'vue'
import { AuthView, authService, authState } from '@/modules/auth'
import { appState } from '@/app/state/app-state'
import MainLayout from '@/app/ui/layout/MainLayout.vue'

onMounted(() => {
  void authService.init()
})
</script>

<template>
  <!-- Auth gate: a Supabase project is required (see src/api/supabase.ts) -->
  <div v-if="authState.isInitializing" class="auth-loading-screen">
    <span class="auth-loading-spinner" />
  </div>

  <AuthView v-else-if="!appState.user" />

  <MainLayout v-else>
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </MainLayout>
</template>

<style scoped lang="scss">
.auth-loading-screen {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.auth-loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e0e7ff;
  border-right-color: #6366f1;
  border-radius: 50%;
  animation: auth-spin 0.65s linear infinite;
}

@keyframes auth-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
