import { describe, expect, it } from 'vitest'
import { formatMinutes, formatPercent } from '@/shared/lib/formatters'

describe('Formatters Tests', () => {
  it('formatMinutes formats minutes under an hour', () => {
    expect(formatMinutes(45)).toBe('45 мин')
  })

  it('formatMinutes formats hours and minutes', () => {
    expect(formatMinutes(90)).toBe('1ч 30м')
    expect(formatMinutes(120)).toBe('2ч')
  })

  it('formatPercent formats number with %', () => {
    expect(formatPercent(75.4)).toBe('75%')
    expect(formatPercent(100)).toBe('100%')
  })
})
