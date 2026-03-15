import { describe, it, expect } from 'vitest'
import { canonicalSoort } from './speciesCanonical'

describe('canonicalSoort', () => {
  it('mapt rhinoceros-varianten naar neushoorn', () => {
    expect(canonicalSoort('Rhinoceros')).toBe('neushoorn')
    expect(canonicalSoort('rhinoceros')).toBe('neushoorn')
    expect(canonicalSoort('Rhino')).toBe('neushoorn')
    expect(canonicalSoort('neushoorn')).toBe('neushoorn')
    expect(canonicalSoort('Rinocerus')).toBe('neushoorn')
  })

  it('gebruikt fallback voor namen die rhino/neushoorn bevatten', () => {
    expect(canonicalSoort('white rhinoceros')).toBe('neushoorn')
    expect(canonicalSoort('zwarte neushoorn')).toBe('neushoorn')
  })

  it('behoudt andere soorten of geeft genormaliseerde key terug', () => {
    expect(canonicalSoort('tijger')).toBe('tijger')
    expect(canonicalSoort('Tiger')).toBe('tijger')
    expect(canonicalSoort('gorilla')).toBe('gorilla')
    expect(canonicalSoort('vuursalamander')).toBe('vuursalamander')
    expect(canonicalSoort('fire salamander')).toBe('vuursalamander')
  })

  it('handelt lege/undefined af', () => {
    expect(canonicalSoort(undefined)).toBe('')
    expect(canonicalSoort('')).toBe('')
    expect(canonicalSoort('  ')).toBe('')
  })
})
