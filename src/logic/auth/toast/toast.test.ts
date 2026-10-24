import { describe, expect, it } from 'vitest'

import { composeArrivalToast } from '@/logic/auth/toast/toast'

describe("composeArrivalToast — RM3 / RM4 texte du toast selon l'origine", () => {
  it('RM3 : après un signup, souhaite la bienvenue et annonce le compte créé', () => {
    const firstName = 'Marc'

    expect(composeArrivalToast('signup', firstName)).toBe('Bienvenue Marc, ton compte est créé.')
  })

  it('RM4 : après un signin, accueille avec le point final conservé', () => {
    const firstName = 'Marc'

    expect(composeArrivalToast('signin', firstName)).toBe('Content de te revoir Marc.')
  })

  it("le même prénom donne un texte différent selon l'origine", () => {
    const firstName = 'Lina'

    const toastAfterSignup = composeArrivalToast('signup', firstName)
    const toastAfterSignin = composeArrivalToast('signin', firstName)

    expect(toastAfterSignup).not.toBe(toastAfterSignin)
  })
})
