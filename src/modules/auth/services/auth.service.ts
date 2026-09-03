import { apiClient } from '@/api'
import { supabase } from '@/api/supabase'
import { appService } from '@/app/services/app-service'
import { authState } from '../state/auth.state'
import type { AuthFormMode } from '../state/auth.state'

class AuthService {
  public async init(): Promise<void> {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      await this.loadProfile()
    }
    authState.isInitializing = false

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        void this.loadProfile()
      } else {
        appService.setUser(null)
      }
    })
  }

  public setMode(mode: AuthFormMode): void {
    authState.mode = mode
    authState.errorMessage = null
  }

  public async signIn(email: string, password: string): Promise<void> {
    await this.submit(async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    })
  }

  public async signUp(email: string, password: string, name: string): Promise<void> {
    await this.submit(async () => {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
      if (error) throw error
    })
  }

  public async signOut(): Promise<void> {
    await supabase.auth.signOut()
  }

  private async submit(action: () => Promise<void>): Promise<void> {
    authState.errorMessage = null
    authState.isSubmitting = true
    try {
      await action()
    } catch (err: unknown) {
      authState.errorMessage = err instanceof Error ? err.message : 'Не удалось выполнить запрос. Попробуйте ещё раз.'
    } finally {
      authState.isSubmitting = false
    }
  }

  private async loadProfile(): Promise<void> {
    try {
      const profile = await apiClient.getUserProfile()
      appService.setUser(profile)
    } catch {
      appService.setUser(null)
    }
  }
}

export const authService = new AuthService()
