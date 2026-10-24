import { describe, expect, it } from 'vitest'

import { composeGreeting } from '@/logic/home/greeting/greeting'

describe("composeGreeting — RM2 titre de l'accueil connecté", () => {
  it('compose le titre de la maquette avec le prénom de la session', () => {
    const firstName = 'Marc'

    expect(composeGreeting(firstName)).toBe("Quoi de neuf aujourd'hui, Marc ?")
  })

  it('reprend le prénom tel quel, accents et tirets compris', () => {
    const compoundFirstName = 'Jean-Éloïse'

    expect(composeGreeting(compoundFirstName)).toBe("Quoi de neuf aujourd'hui, Jean-Éloïse ?")
  })
})
