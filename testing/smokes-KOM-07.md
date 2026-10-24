# Smokes, KOM-07 · Authentification · frontend

Source en langage humain, écrite **avant** l'implémentation. Après le code, `e2e-test-writer` transcrit chaque scénario en e2e Playwright. Même découpage et même ordre que `testing/inventaire-KOM-07.md`. Format : `docs/testing-strategy.md` (« Format des smokes »).

Préconditions communes, sauf mention contraire :

- Front lancé (`pnpm dev`, `http://localhost:5173`) et backend lancé (`http://localhost:3000`).
- « Visiteur » : aucune session ouverte (cookies du site supprimés, ou fenêtre de navigation privée).
- « Compte de test » : un compte existe avec le Prénom « Marc », l'email « marc@test.dev » et le mot de passe « motdepasse8 ».
- Les labels de champs (Prénom, Email, Mot de passe) sont affichés en majuscules par le CSS : on les désigne par leur texte d'origine.

### Paquet 1 · Page d'accueil

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM1 | 🔴 | Un visiteur voit le message d'accueil et les boutons Se connecter / Créer un compte dans le header | SM-1 |
| RM2 | 🟢 | Titre de l'accueil connecté composé avec le prénom | aucun smoke, couvert en unitaire |
| RM15 | 🔴 | Le clic sur « ViDev » dans le footer ouvre la chaîne YouTube dans un nouvel onglet | SM-2 |

### SM-1 : Accueil visiteur, message d'accueil et boutons du header (RM1)

> ✅ **Ce qu'on vérifie :**
> - Un visiteur non connecté voit le message d'accueil et, dans le header, les boutons « Se connecter » et « Créer un compte ».
> - Passe par un smoke : ce qui est vérifié, c'est la session lue auprès de la vraie API (`null`) et le rendu réel de l'état visiteur. Le texte statique seul ne se teste pas.

Précondition : visiteur (aucune session).

1. Ouvrir la page `/`.

Attendu : la page affiche le message d'accueil (ex. « Prêt pour ton standup »), le header contient les boutons « Se connecter » et « Créer un compte », le footer est affiché sur toute la largeur, et aucun bouton « Se déconnecter » n'est présent.

- [ ] Vérifié

---

### SM-2 : Lien ViDev du footer, ouverture dans un nouvel onglet (RM15)

> ✅ **Ce qu'on vérifie :**
> - Le clic sur « ViDev » dans le footer ouvre la chaîne YouTube dans un nouvel onglet.
> - Passe par un smoke : c'est le comportement du navigateur (ouverture d'un onglet), rien de calculable.

Précondition : page `/` ouverte.

1. Cliquer sur le lien « ViDev » dans le footer.

Attendu : un nouvel onglet s'ouvre sur `https://www.youtube.com/@videv9858`, et l'onglet d'origine reste sur `/`.

- [ ] Vérifié

### Paquet 2 · Navigation entre les pages

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM6 | 🔴 | Le clic sur « Créer un compte » amène sur la page de signup | SM-3 |
| RM7 | 🔴 | Le clic sur « Se connecter » amène sur la page de signin | SM-4 |
| Hors RM | 🔴 | Le logo + « Kommit » de la barre de navigation renvoie à l'accueil sur les 4 pages | SM-5 |

### SM-3 : Du header vers la page de signup (RM6)

> ✅ **Ce qu'on vérifie :**
> - Le clic sur « Créer un compte » dans le header amène sur la page de signup.
> - Passe par un smoke : navigation réelle (React Router, navigateur).

Précondition : visiteur, page `/` ouverte.

1. Cliquer sur le bouton « Créer un compte » du header.

Attendu : on arrive sur `/signup`, la page affiche les champs « Prénom », « Email » et « Mot de passe » (pas de confirmation de mot de passe) et le bouton « Créer un compte ».

- [ ] Vérifié

---

### SM-4 : Du header vers la page de signin (RM7)

> ✅ **Ce qu'on vérifie :**
> - Le clic sur « Se connecter » dans le header amène sur la page de signin.
> - Passe par un smoke : navigation réelle (React Router, navigateur).

Précondition : visiteur, page `/` ouverte.

1. Cliquer sur le bouton « Se connecter » du header.

Attendu : on arrive sur `/signin`, la page affiche les champs « Email » et « Mot de passe » et le bouton « Me connecter », grisé car les champs sont vides.

- [ ] Vérifié

---

### SM-5 : Le logo « Kommit » renvoie à l'accueil sur les 4 pages (hors RM)

> ✅ **Ce qu'on vérifie :**
> - Le logo + « Kommit » de la barre de navigation est un lien vers `/` sur les 4 pages : accueil visiteur, signup, signin, accueil connecté.
> - Aucune RM du ticket ne décrit ce comportement (il vient de la maquette et du commit `15a75e7`) : à ajouter au ticket Notion si on veut le tracer.
> - Passe par un smoke : navigation réelle.

Précondition : compte de test existant, visiteur, page `/signup` ouverte. Scénario plus long que 4 étapes : il enchaîne les 4 pages pour éviter 4 scénarios quasi identiques. Le résultat est vérifié après chaque clic sur le logo.

1. Cliquer sur le logo « Kommit » de la barre de navigation. Vérifier : on est sur `/`.
2. Cliquer sur le logo « Kommit ». Vérifier : on reste sur `/` (accueil visiteur).
3. Cliquer sur le bouton « Se connecter » du header, puis sur le logo « Kommit ». Vérifier : on est de retour sur `/`.
4. Cliquer sur le bouton « Se connecter », saisir « marc@test.dev » dans « Email », saisir « motdepasse8 » dans « Mot de passe », cliquer sur « Me connecter », puis cliquer sur le logo « Kommit ». Vérifier : on est sur `/` (accueil connecté), toujours connecté.

Attendu : à chaque clic sur le logo (depuis `/signup`, `/`, `/signin` et l'accueil connecté), on se retrouve sur `/` sans erreur.

- [ ] Vérifié

### Paquet 3 · Formulaire d'authentification

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM32 | 🟢 | Signin : « Me connecter » grisé tant que les champs sont vides | aucun smoke, couvert en unitaire |
| RM33 | 🟢 | Signup : « Créer un compte » grisé tant qu'un champ requis est vide, prénom d'espaces = vide | aucun smoke, couvert en unitaire |
| RM10, RM11, RM20 | 🟢 | Validation signup (prénom, email, mot de passe 8+), aucun format au signin | aucun smoke, couvert en unitaire |
| RM30 | 🟠 | Signup : erreurs de format à la 1re soumission, puis mises à jour pendant la saisie (liseré bleu, message sous le champ) | SM-6 |
| RM17 | 🟠 | Pendant l'appel, bouton désactivé, spinner, texte aria non visible | SM-7 |
| RM16 | 🔴 | Un double-clic ne lance qu'une seule requête | SM-8 |
| RM9, RM13 | 🟢 | Message choisi d'après le `code` de l'`ApiError` | aucun smoke, couvert en unitaire |
| RM8, RM12 | 🔴 | Après signup ou signin réussi, retour sur l'accueil connecté | SM-9 (RM8), SM-10 (RM12) |

### SM-6 : Signup, erreur de format affichée puis mise à jour pendant la saisie (RM30)

> ✅ **Ce qu'on vérifie :**
> - À la 1re soumission, le champ Mot de passe trop court prend le liseré bleu (pas rouge) et le message d'erreur rouge s'affiche sous le champ.
> - Ensuite l'erreur se met à jour pendant la saisie : en corrigeant le mot de passe, le message disparaît sans nouvelle soumission.
> - Passe par un smoke : le choix « quel champ est en erreur » est testé en unitaire, mais le liseré (`aria-invalid`) et le message sous le champ sont du rendu navigateur.

Précondition : visiteur, page `/signup` ouverte.

1. Saisir « Marc » dans le champ « Prénom ».
2. Saisir « marc.rm30@test.dev » dans le champ « Email ».
3. Saisir « abc » dans le champ « Mot de passe ».
4. Cliquer sur le bouton « Créer un compte ».
5. Saisir « abcdefgh » dans le champ « Mot de passe » (en remplaçant « abc »).

Attendu après l'étape 4 : le champ Mot de passe prend le liseré bleu, un message en rouge s'affiche sous le champ (texte attendu : « Le mot de passe doit contenir au moins 8 caractères. », voir points remontés), et on reste sur `/signup`. Attendu après l'étape 5 : le message disparaît et le liseré bleu s'en va, sans nouveau clic sur le bouton.

- [ ] Vérifié

---

### SM-7 : Bouton en chargement, spinner et texte aria (RM17)

> ✅ **Ce qu'on vérifie :**
> - Pendant un appel signin, le bouton est désactivé et son libellé est remplacé par un spinner ; le texte « Connexion en cours » est présent pour l'accessibilité mais invisible. Au signup, c'est « Création du compte en cours ».
> - Passe par un smoke : la condition « désactivé tant que la requête est en vol » est testée en unitaire, mais le spinner, le texte aria et l'état réel de la requête (React Query) sont du rendu et du comportement de dépendance.

Précondition : compte de test existant, visiteur, page `/signin` ouverte, réseau ralenti dans les outils de développement du navigateur (profil « Slow 3G ») pour que l'état de chargement dure assez longtemps pour être observé.

1. Saisir « marc@test.dev » dans le champ « Email ».
2. Saisir « motdepasse8 » dans le champ « Mot de passe ».
3. Cliquer sur le bouton « Me connecter ».

Attendu : tant que la requête est en vol, le bouton est grisé, le texte « Me connecter » a laissé la place à un spinner, et l'inspecteur d'accessibilité (ou un lecteur d'écran) expose le texte « Connexion en cours » qui n'est pas visible à l'écran. Variante signup : mêmes étapes sur `/signup` avec un email jamais utilisé, le texte aria est « Création du compte en cours ».

- [ ] Vérifié

---

### SM-8 : Double-clic sur le bouton, une seule requête (RM16)

> ✅ **Ce qu'on vérifie :**
> - Un double-clic sur « Me connecter » ne lance qu'une seule requête vers l'API.
> - Passe par un smoke : ce qui compte est le nombre de requêtes réellement parties du navigateur ; un mock simulerait justement ce qu'on veut vérifier. Le désactivage du bouton est déjà vu en SM-7.

Précondition : compte de test existant, visiteur, page `/signin` ouverte, onglet Réseau des outils de développement ouvert et vidé, réseau ralenti (profil « Slow 3G »).

1. Saisir « marc@test.dev » dans le champ « Email ».
2. Saisir « motdepasse8 » dans le champ « Mot de passe ».
3. Double-cliquer sur le bouton « Me connecter ».

Attendu : l'onglet Réseau montre une seule requête de connexion vers `http://localhost:3000`, et on arrive sur `/` connecté.

- [ ] Vérifié

---

### SM-9 : Signup réussi, retour sur l'accueil connecté (RM8)

> ✅ **Ce qu'on vérifie :**
> - Après un signup réussi, l'utilisateur est ramené sur l'accueil, connecté, avec son Prénom dans le titre.
> - Passe par un smoke : compte réellement créé, session réellement posée, cookie cross-origin (`credentials: 'include'`) et navigation effective. Si le cookie n'est pas joint, l'accueil reste en visiteur.

Précondition : visiteur, page `/signup` ouverte, l'email utilisé n'a jamais servi (ex. « marc.rm8.<horodatage>@test.dev »).

1. Saisir « Marc » dans le champ « Prénom ».
2. Saisir un email jamais utilisé dans le champ « Email ».
3. Saisir « motdepasse8 » dans le champ « Mot de passe ».
4. Cliquer sur le bouton « Créer un compte ».

Attendu : on arrive sur `/`, le titre affiche « Quoi de neuf aujourd'hui, Marc ? », le header affiche « Se déconnecter » et plus « Se connecter » / « Créer un compte ».

- [ ] Vérifié

---

### SM-10 : Signin réussi, retour sur l'accueil connecté (RM12)

> ✅ **Ce qu'on vérifie :**
> - Après un signin réussi, l'utilisateur est ramené sur l'accueil, connecté, avec son Prénom dans le titre.
> - Passe par un smoke : session réellement posée par l'API, cookie cross-origin et navigation effective.

Précondition : compte de test existant, visiteur, page `/signin` ouverte.

1. Saisir « marc@test.dev » dans le champ « Email ».
2. Saisir « motdepasse8 » dans le champ « Mot de passe ».
3. Cliquer sur le bouton « Me connecter ».

Attendu : on arrive sur `/`, le titre affiche « Quoi de neuf aujourd'hui, Marc ? », le header affiche « Se déconnecter » et plus « Se connecter » / « Créer un compte ».

- [ ] Vérifié

### Paquet 4 · Le toast d'arrivée

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM3, RM4 | 🟠 | Toast « Bienvenue {prénom}, ton compte est créé. » après signup, « Content de te revoir {prénom}. » après signin, affiché en haut à droite avec × | SM-11 (RM3), SM-12 (RM4) |
| RM24, RM25 | 🔴 | Pas de toast au rechargement, au « retour » du navigateur, ni à l'ouverture directe avec session persistée | SM-13 (RM24), SM-14 (RM25) |

### SM-11 : Toast après un signup (RM3)

> ✅ **Ce qu'on vérifie :**
> - Après un signup, l'accueil affiche en haut à droite un toast « Bienvenue Marc, ton compte est créé. » avec un × pour le fermer.
> - Passe par un smoke : le choix du texte selon l'origine est testé en unitaire, mais l'affichage du toast (Sonner, position, ×) est le comportement d'une librairie dans le navigateur.

Précondition : visiteur, page `/signup` ouverte, email jamais utilisé.

1. Saisir « Marc » dans le champ « Prénom ».
2. Saisir un email jamais utilisé dans le champ « Email ».
3. Saisir « motdepasse8 » dans le champ « Mot de passe ».
4. Cliquer sur le bouton « Créer un compte ».
5. Cliquer sur le × du toast.

Attendu après l'étape 4 : on est sur `/` et un toast apparaît en haut à droite avec le texte « Bienvenue Marc, ton compte est créé. » et un ×. Attendu après l'étape 5 : le toast disparaît.

- [ ] Vérifié

---

### SM-12 : Toast après un signin (RM4)

> ✅ **Ce qu'on vérifie :**
> - Après un signin, l'accueil affiche en haut à droite un toast « Content de te revoir Marc. » (point final compris) avec un × pour le fermer.
> - Passe par un smoke : même raison que SM-11, c'est le toast réel dans le navigateur, et le message doit être celui du signin et non celui du signup.

Précondition : compte de test existant, visiteur, page `/signin` ouverte.

1. Saisir « marc@test.dev » dans le champ « Email ».
2. Saisir « motdepasse8 » dans le champ « Mot de passe ».
3. Cliquer sur le bouton « Me connecter ».

Attendu : on est sur `/` et un toast apparaît en haut à droite avec le texte « Content de te revoir Marc. » et un ×.

- [ ] Vérifié

---

### SM-13 : Pas de toast au rechargement ni au retour du navigateur (RM24)

> ✅ **Ce qu'on vérifie :**
> - Après l'arrivée sur l'accueil, le toast ne réapparaît ni au rechargement, ni quand on fait « retour » puis « avancer » dans le navigateur.
> - Passe par un smoke : dépend du mécanisme de transport de l'info (état de navigation, stockage) et de l'historique du navigateur, donc du comportement réel du navigateur et du router.

Précondition : compte de test existant, visiteur, page `/signin` ouverte. Scénario de plus de 4 étapes : la connexion initiale est obligatoire pour produire le toast.

1. Saisir « marc@test.dev » dans le champ « Email ».
2. Saisir « motdepasse8 » dans le champ « Mot de passe ».
3. Cliquer sur le bouton « Me connecter ».
4. Recharger la page.
5. Cliquer sur le bouton « Précédent » du navigateur.
6. Cliquer sur le bouton « Suivant » du navigateur.

Attendu : le toast « Content de te revoir Marc. » apparaît après l'étape 3 uniquement ; après l'étape 4 puis après l'étape 6, on est sur `/` connecté, le titre « Quoi de neuf aujourd'hui, Marc ? » est affiché et aucun toast n'apparaît.

- [ ] Vérifié

---

### SM-14 : Pas de toast à l'ouverture directe avec une session persistée (RM25)

> ✅ **Ce qu'on vérifie :**
> - Un utilisateur dont la session est persistée qui ouvre directement l'accueil voit la page personnalisée sans toast.
> - Passe par un smoke : comportement réel du navigateur (cookie de session conservé entre onglets) et du router.

Précondition : compte de test existant, session ouverte dans un onglet (signin déjà fait), un nouvel onglet vide ouvert.

1. Ouvrir la page `http://localhost:5173/` dans le nouvel onglet.

Attendu : l'accueil affiche « Quoi de neuf aujourd'hui, Marc ? » et le bouton « Se déconnecter », sans aucun toast.

- [ ] Vérifié

### Paquet 5 · Sign out et fin de session

| RM | Inventaire | Ce qu'on vérifie | Scénario |
|---|---|---|---|
| RM5 | 🔴 | Le clic sur « Se déconnecter » ferme la session, l'accueil repasse en visiteur, sans modale ni toast | SM-15 |
| RM31 | 🔴 | Session expirée : au chargement suivant, accueil visiteur sans message | SM-16 |

### SM-15 : Déconnexion silencieuse (RM5)

> ✅ **Ce qu'on vérifie :**
> - Le clic sur « Se déconnecter » ferme la session et l'accueil repasse en visiteur, sans modale de confirmation ni toast.
> - Passe par un smoke : session réellement fermée côté API, rendu et navigation réels. Le rechargement prouve que la session est fermée côté serveur et pas seulement masquée à l'écran.

Précondition : compte de test existant, session ouverte, page `/` rechargée une fois (aucun toast d'arrivée affiché).

1. Cliquer sur le bouton « Se déconnecter ».
2. Recharger la page.

Attendu après l'étape 1 : aucune modale ni toast, l'accueil affiche l'état visiteur (message d'accueil, boutons « Se connecter » et « Créer un compte »). Attendu après l'étape 2 : l'accueil reste en état visiteur.

- [ ] Vérifié

---

### SM-16 : Session expirée, accueil visiteur sans message (RM31)

> ✅ **Ce qu'on vérifie :**
> - Quand la session a expiré, au prochain chargement l'accueil s'affiche en visiteur, sans aucun message.
> - Passe par un smoke : l'expiration est un comportement de l'API (Better Auth) ; côté front on lit seulement `null`, comme en SM-1. On simule l'expiration en supprimant le cookie de session dans les outils de développement.

Précondition : compte de test existant, session ouverte, page `/` ouverte, onglet Application des outils de développement ouvert sur les cookies de `localhost`.

1. Supprimer le cookie de session de Better Auth dans les outils de développement.
2. Recharger la page.

Attendu : l'accueil s'affiche en état visiteur (boutons « Se connecter » et « Créer un compte »), sans toast, sans message d'erreur ni de session expirée.

- [ ] Vérifié
