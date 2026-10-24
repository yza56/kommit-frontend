# Inventaire de test, KOM-07 · Authentification · frontend

Paquets et ordre repris du ticket. Doctrine : `docs/testing-strategy.md`. Contrat d'API : `src/types/apiContract.ts` (le Prénom est `SessionUser.name`, les erreurs sont des `ApiError` avec `code`).

Contraintes techniques du ticket prises en compte :

- ESLint et alias `@/` : outillage, aucune RM. Rien à tester.
- Le toast dépend de la page d'origine (signup ou signin) et le front transporte l'info jusqu'à l'accueil puis l'efface : pèse sur RM3, RM4, RM24, RM25.
- Session par cookie cross-origin, `credentials: 'include'` côté front : pèse sur RM8, RM12 (comportement réel du navigateur et de l'API, donc 🔴).

### Paquet 1 · Page d'accueil

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM1 | Un visiteur non connecté voit le message d'accueil et les boutons Se connecter / Créer un compte dans le header | 🔴 | Ce qui est vérifié est la session lue auprès de l'API (`null`) et le rendu réel de l'état visiteur. Le texte statique ne se teste pas (`tests.md`). Si l'API ou le navigateur casse, notre logique reste juste. | Manuel (smoke navigateur) |
| RM2 | Le titre de l'accueil connecté est composé avec le prénom (`SessionUser.name`) | 🟢 | Composition d'un texte à partir d'une entrée, fonction pure dans `src/logic/`. **Écart ticket / maquette** : le ticket dit « Qu'as-tu fait de beau aujourd'hui, {prénom} ? », la maquette (retenue par l'utilisateur) dit « Quoi de neuf aujourd'hui, {prénom} ? ». Les tests s'alignent sur la maquette, ou le ticket est corrigé. Le fait que la session vienne bien de l'API est confirmé par les smokes de RM8 et RM12. | Unitaire, test-first |
| RM15 | Le clic sur « ViDev » dans le footer ouvre la chaîne YouTube dans un nouvel onglet | 🔴 | Comportement du navigateur (ouverture d'un onglet), rien de calculable. | Manuel (smoke navigateur) |

### Paquet 2 · Navigation entre les pages

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM6 | Le clic sur « Créer un compte » amène sur la page de signup | 🔴 | Navigation réelle (React Router, navigateur). | Manuel (smoke navigateur) |
| RM7 | Le clic sur « Se connecter » amène sur la page de signin | 🔴 | Navigation réelle (React Router, navigateur). | Manuel (smoke navigateur) |
| Hors RM | Le logo + « Kommit » de la NavBar est un lien vers l'accueil (`/`) sur les 4 pages | 🔴 | **Aucune RM du ticket ne décrit ce comportement** : il vient de la maquette et d'un commit (`15a75e7`). À classer ici par défaut, à signaler, et à ajouter au ticket si on veut le tracer. Navigation réelle, donc smoke. | Manuel (smoke navigateur) |

### Paquet 3 · Formulaire d'authentification

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM32 | Au signin, le bouton « Me connecter » est désactivé tant que les champs sont vides | 🟢 | Décision d'état (bouton activé ou non) calculée à partir des valeurs des champs. | Unitaire, test-first |
| RM33 | Au signup, le bouton « Créer un compte » est désactivé tant qu'un champ requis est vide, un prénom fait d'espaces compte comme vide | 🟢 | Décision d'état plus trim du prénom, fonction pure. | Unitaire, test-first |
| RM10, RM11, RM20 | Au signup : prénom trimé non vide, email bien formé, mot de passe d'au moins 8 caractères. Au signin : aucun format vérifié | 🟢 | Validation client, fonction pure. Le test couvre aussi l'absence de vérification de format au signin. | Unitaire, test-first |
| RM30 | Au signup, les erreurs de format apparaissent à la 1re soumission, puis se mettent à jour pendant la saisie | 🟠 | Quel champ est en erreur selon « déjà soumis ou non » et les valeurs : décision d'état, 🟢. Le liseré bleu (`aria-invalid`) et le message sous le champ sont du rendu navigateur, 🔴. | Unitaire (décision d'erreur) + smoke manuel : « soumettre un signup avec mot de passe de 3 caractères, le champ Mot de passe prend le liseré bleu, le message s'affiche dessous, puis corriger la saisie et voir le message disparaître » |
| RM17 | Pendant un appel signin ou signup, le bouton est désactivé, le libellé est remplacé par un spinner, avec « Connexion en cours » / « Création du compte en cours » en aria non visible | 🟠 | La condition « bouton désactivé tant que la requête est en vol » est une décision d'état à nous, 🟢. Le spinner, le texte aria non visible et l'état réel de la requête (React Query) sont du rendu et du comportement de dépendance, 🔴. | Unitaire (état du bouton selon l'état d'envoi) + smoke manuel : « soumettre le formulaire et observer le spinner, bouton grisé, texte aria présent » |
| RM16 | Un double-clic sur le bouton ne lance qu'une seule requête | 🔴 | Ce qui compte est le nombre de requêtes réellement parties du navigateur après 2 clics. Un mock simulerait justement ce qu'on veut vérifier. Le désactivage lui-même est déjà couvert par RM17. | Manuel (smoke navigateur) |
| RM9, RM13 | Le message affiché est choisi d'après le `code` de l'`ApiError` : `EMAIL_ALREADY_EXISTS` (sous le champ Email) et `INVALID_CREDENTIALS` (message générique, dans la zone réservée sous le mot de passe) | 🟢 | Reformulation côté front : l'unicité de l'email est une contrainte backend, la RM frontend est « quand l'API renvoie `EMAIL_ALREADY_EXISTS`, le message s'affiche ». Les 2 codes sont dans `apiContract.ts` (`AuthErrorCode`), donc pas de 🟠. Mapping code vers message : fonction pure. **Écart avec la doctrine** : le contrat formule le message de RM9 « Un compte avec cet email existe déjà », alors que `testing-strategy.md` donne en exemple « Cet email est déjà utilisé ». Les tests doivent fixer un seul texte (à trancher, le contrat étant la source la plus proche du code). Le contrat prévoit aussi `INTERNAL_ERROR` (RM18, RM19 de F1) avec un message distinct et une action re-tentable, mais ces RM ne sont pas dans KOM-07 : à signaler. | Unitaire, test-first |
| RM8, RM12 | Après un signup ou un signin réussi, l'utilisateur est ramené sur l'accueil, connecté | 🔴 | Compte réellement créé, session réellement posée, cookie cross-origin (`credentials: 'include'`), navigation effective : comportement de l'API et du navigateur. | Manuel (smoke navigateur) |

### Paquet 4 · Le toast d'arrivée

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM3, RM4 | Après un signup, toast « Bienvenue {prénom}, ton compte est créé. » ; après un signin, toast « Content de te revoir {prénom}. » (point final conservé) | 🟠 | Choisir et composer le texte selon l'origine (signup ou signin) et le prénom : fonction pure, 🟢. L'affichage du toast (Sonner, en haut à droite, avec ×) est le comportement d'une librairie dans le navigateur, 🔴. | Unitaire (texte selon l'origine) + smoke manuel : « se connecter, arriver sur l'accueil, voir le toast en haut à droite avec le ×, et son texte » |
| RM24, RM25 | Le toast ne réapparaît pas au rechargement ni au « retour » du navigateur, ni quand un utilisateur à session persistée ouvre directement l'accueil | 🔴 | Dépend du mécanisme de transport de l'info (état de navigation, stockage) et de l'historique du navigateur : comportement réel du navigateur et du router. Doute : si la partie « consommer l'info une seule fois » est extraite en fonction pure, une tranche 🟢 apparaîtrait ; tranché au plus prudent. | Manuel (smoke navigateur) |

### Paquet 5 · Sign out et fin de session

| RM | Ce qu'on vérifie | Testable unitaire ? | Pourquoi | Comment |
|---|---|---|---|---|
| RM5 | Le clic sur « Déconnexion » ferme la session, l'accueil repasse en non connecté, sans modale ni toast | 🔴 | Session réellement fermée côté API, rendu et navigation réels. | Manuel (smoke navigateur) |
| RM31 | Session expirée : au chargement suivant, l'accueil s'affiche en non connecté, sans message | 🔴 | L'expiration est un comportement de l'API (Better Auth). Côté front, on lit seulement `null`, déjà vu en RM1. | Manuel (smoke navigateur) |

## Points à remonter

- Écart RM2 : titre du ticket ≠ titre de la maquette (retenue). Aligner les tests sur la maquette ou corriger le ticket.
- RM9 (tranché) : le message est celui du contrat, « Un compte avec cet email existe déjà ». L'exemple de la doctrine (« Cet email est déjà utilisé ») n'est pas retenu.
- Comportement du logo vers l'accueil (tranché) : hors RM, gardé en 🔴 smoke en paquet 2. À ajouter au ticket Notion.
- RM24, RM25 (tranché) : restent 🔴, la règle « le toast ne s'affiche qu'une fois » n'est pas extraite en fonction pure.
- RM4 : le point final fait partie du texte attendu (« Content de te revoir {prénom}. »).
- RM13 : la zone sous le mot de passe au signin est réservée à l'erreur serveur.
- Seul le champ Email a un placeholder (`jean.dev@gmail.com`) : rendu statique, non testé.
- `INTERNAL_ERROR` (contrat) n'est couvert par aucune RM de KOM-07.
- Le typecheck échoue sur `src/lib/api/health.ts` (écart connu, hors périmètre).

## Récap

### Test unitaire automatisé (→ `unit-test-writer`)

- RM2 : composition du titre de l'accueil connecté (texte maquette)
- RM32 : bouton signin désactivé si champs vides
- RM33 : bouton signup désactivé si champ requis vide, prénom trimé
- RM10, RM11, RM20 : validation signup (et absence de format au signin)
- RM9, RM13 : mapping `EMAIL_ALREADY_EXISTS` / `INVALID_CREDENTIALS` vers message

### Couverture partielle, unitaire + smoke manuel (→ `unit-test-writer` puis `smoke-test-writer`)

- RM30 : décision d'erreur par champ en unitaire ; smoke : liseré bleu et message sous le champ, mise à jour pendant la saisie
- RM17 : état du bouton en unitaire ; smoke : spinner, bouton grisé, texte aria
- RM3, RM4 : texte du toast selon l'origine en unitaire ; smoke : toast visible en haut à droite avec ×

### Vérification manuelle (→ `smoke-test-writer`)

- RM1 : accueil visiteur
- RM15 : lien ViDev en nouvel onglet
- RM6, RM7 : navigation vers signup et signin
- Hors RM : logo vers l'accueil sur les 4 pages
- RM16 : double-clic, une seule requête
- RM8, RM12 : retour à l'accueil connecté après signup / signin
- RM24, RM25 : pas de toast au rechargement, au retour, ni à l'ouverture directe
- RM5 : déconnexion silencieuse
- RM31 : session expirée silencieuse
