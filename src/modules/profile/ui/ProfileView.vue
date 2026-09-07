<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { appService } from '@/app/services/app-service'
import { authService } from '@/modules/auth'
import { notesService, notesState } from '@/modules/notes'
import { BaseButton, BaseCard, BaseInput } from '@/shared/ui'
import { LogOut } from 'lucide-vue-next'
import { profileService } from '../services/profile.service'
import { profileState } from '../state/profile.state'

const name = ref('')
const avatarUrl = ref('')

function syncFormFromProfile(): void {
  name.value = profileState.profile?.name ?? ''
  avatarUrl.value = profileState.profile?.avatarUrl ?? ''
}

onMounted(async () => {
  await Promise.all([
    !profileState.profile ? profileService.loadProfile() : Promise.resolve(),
    notesState.notes.length === 0 ? notesService.loadNotes() : Promise.resolve()
  ])
  syncFormFromProfile()
})

watch(() => profileState.profile, syncFormFromProfile)

const isDirty = computed(() => {
  const profile = profileState.profile
  if (!profile) return false
  return name.value.trim() !== profile.name || avatarUrl.value.trim() !== profile.avatarUrl
})

// Фоллбэк для аватара без похода на внешний сервис — превью того, что видят другие
const initials = computed(() => {
  const value = name.value.trim()
  if (!value) return '?'
  return value
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('')
})

async function handleSave(): Promise<void> {
  if (!isDirty.value) return
  await profileService.updateProfile({ name: name.value.trim(), avatarUrl: avatarUrl.value.trim() })
}

async function handleSignOut(): Promise<void> {
  await authService.signOut()
}
</script>

<template>
  <div class="profile-view">
    <header class="profile-header">
      <button type="button" class="back-btn" aria-label="Назад" @click="appService.goBack()">‹</button>
      <h1 class="profile-title">Профиль</h1>
    </header>

    <div v-if="profileState.profile" class="profile-body">
      <div class="profile-avatar-block">
        <img v-if="avatarUrl" class="profile-avatar" :src="avatarUrl" :alt="name" />
        <span v-else class="profile-avatar profile-avatar--placeholder" aria-hidden="true">{{ initials }}</span>
      </div>

      <BaseCard padding="md" class="profile-section">
        <BaseInput v-model="name" label="Имя" placeholder="Как к вам обращаться" />
        <BaseInput v-model="avatarUrl" label="Ссылка на аватар (опционально)" placeholder="https://..." />
        <BaseInput :model-value="profileState.profile.email" label="Email" disabled />

        <BaseButton
          variant="primary"
          full-width
          :disabled="!isDirty"
          :is-loading="profileState.isSaving"
          @click="handleSave"
        >
          Сохранить изменения
        </BaseButton>
      </BaseCard>

      <BaseCard padding="md" class="profile-stats">
        <div class="profile-stat">
          <span class="profile-stat__value">{{ notesState.notes.length }}</span>
          <span class="profile-stat__label">Заметок создано</span>
        </div>
      </BaseCard>

      <BaseButton variant="outline" full-width @click="handleSignOut">
        <span class="signout-content"><LogOut class="signout-icon" /> Выйти из аккаунта</span>
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 5.5rem;
  background: #ffffff;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;

  .back-btn {
    background: none;
    border: none;
    font-size: 1.35rem;
    color: #0f172a;
    cursor: pointer;
  }

  .profile-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
  }
}

.profile-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
}

.profile-avatar-block {
  display: flex;
  justify-content: center;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;

  &--placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e0e7ff;
    color: #4338ca;
    font-size: 1.75rem;
    font-weight: 700;
  }
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-stats {
  display: flex;
}

.profile-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  width: 100%;

  &__value {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
  }

  &__label {
    font-size: 0.8125rem;
    color: #64748b;
  }
}

.signout-content {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.signout-icon {
  width: 16px;
  height: 16px;
}
</style>
