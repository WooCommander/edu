import { reactive } from 'vue'

export type AuthFormMode = 'sign-in' | 'sign-up'

interface AuthUiState {
  mode: AuthFormMode
  isInitializing: boolean
  isSubmitting: boolean
  errorMessage: string | null
}

export const authState = reactive<AuthUiState>({
  mode: 'sign-in',
  isInitializing: true,
  isSubmitting: false,
  errorMessage: null
})
