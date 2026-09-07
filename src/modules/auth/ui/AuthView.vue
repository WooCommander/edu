<script setup lang="ts">
import { ref } from 'vue'
import { BaseButton, BaseInput } from '@/shared/ui'
import { authService } from '../services/auth.service'
import { authState } from '../state/auth.state'

const email = ref('')
const password = ref('')
const name = ref('')

async function handleSubmit(): Promise<void> {
  if (authState.mode === 'sign-in') {
    await authService.signIn(email.value, password.value)
  } else {
    await authService.signUp(email.value, password.value, name.value)
  }
}
</script>

<template>
  <div class="auth-screen">
    <form class="auth-card" @submit.prevent="handleSubmit">
      <div class="auth-brand">
        <span class="brand-logo">🧠</span>
        <h1 class="brand-title">Система Знаний</h1>
        <p class="brand-sub">Личная база знаний</p>
      </div>

      <div class="auth-tabs">
        <button
          type="button"
          class="auth-tab"
          :class="{ 'auth-tab--active': authState.mode === 'sign-in' }"
          @click="authService.setMode('sign-in')"
        >
          Вход
        </button>
        <button
          type="button"
          class="auth-tab"
          :class="{ 'auth-tab--active': authState.mode === 'sign-up' }"
          @click="authService.setMode('sign-up')"
        >
          Регистрация
        </button>
      </div>

      <BaseInput
        v-if="authState.mode === 'sign-up'"
        v-model="name"
        label="Имя"
        placeholder="Как к вам обращаться"
      />
      <BaseInput
        v-model="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
      />
      <BaseInput
        v-model="password"
        type="password"
        label="Пароль"
        placeholder="Минимум 6 символов"
      />

      <p v-if="authState.errorMessage" class="auth-error">{{ authState.errorMessage }}</p>

      <BaseButton
        type="submit"
        full-width
        :is-loading="authState.isSubmitting"
      >
        {{ authState.mode === 'sign-in' ? 'Войти' : 'Создать аккаунт' }}
      </BaseButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
.auth-screen {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 1.5rem;
}

.auth-card {
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
}

.auth-brand {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: 0.25rem;

  .brand-logo {
    font-size: 2.25rem;
  }

  .brand-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  .brand-sub {
    margin: 0;
    font-size: 0.8125rem;
    color: #64748b;
  }
}

.auth-tabs {
  display: flex;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 0.25rem;
  gap: 0.25rem;
}

.auth-tab {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.5rem;
  border-radius: 9px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;

  &--active {
    background: #ffffff;
    color: #4338ca;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.1);
  }
}

.auth-error {
  margin: 0;
  font-size: 0.8125rem;
  color: #ef4444;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 0.6rem 0.75rem;
}
</style>
