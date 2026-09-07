import { apiClient } from '@/api'
import { appService } from '@/app/services/app-service'
import { profileState } from '../state/profile.state'

class ProfileService {
  public async loadProfile(): Promise<void> {
    profileState.isLoading = true
    try {
      profileState.profile = await apiClient.getUserProfile()
    } finally {
      profileState.isLoading = false
    }
  }

  public async updateProfile(patch: { name?: string; avatarUrl?: string }): Promise<void> {
    profileState.isSaving = true
    try {
      const updated = await apiClient.updateUserProfile(patch)
      profileState.profile = updated
      // Сайдбар и шапка дашборда читают appState.user — держим их в синхроне
      // без перезагрузки страницы.
      appService.setUser(updated)
      appService.showToast('Профиль обновлён')
    } finally {
      profileState.isSaving = false
    }
  }
}

export const profileService = new ProfileService()
