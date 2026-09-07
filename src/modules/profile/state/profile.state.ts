import { reactive } from 'vue'
import type { UserProfile } from '@/shared/types'

interface ProfileState {
  profile: UserProfile | null
  isLoading: boolean
  isSaving: boolean
}

export const profileState = reactive<ProfileState>({
  profile: null,
  isLoading: false,
  isSaving: false
})
