# SEEKLIGHT — Direction artistique de la démo

## Trois pistes initiales

### Theme Name: Campus Signal
**Very Brief Intro:** Une interface de campus numérique lumineuse, structurée par des panneaux éditoriaux et des accents jaunes de signalétique. L’expérience évoque la progression, la curiosité et la confiance sans devenir enfantine.
**Probability:** 0.07

### Theme Name: Aurora Study Club
**Very Brief Intro:** Une direction plus expressive, fondée sur des halos colorés, des cartes flottantes et une ambiance de club d’apprentissage premium. Elle rend l’IA et les missions plus émotionnelles, mais risque de réduire la lisibilité des écrans d’administration.
**Probability:** 0.04

### Theme Name: Field Notes
**Very Brief Intro:** Un langage visuel inspiré des carnets de terrain, des annotations et des fiches de progression. Cette piste humanise fortement l’apprentissage, mais elle est moins adaptée à une démonstration SaaS B2B cohérente.
**Probability:** 0.02

## Approche retenue : Campus Signal

### Design Movement
Neo-editorial dashboard : une rencontre entre la signalétique de campus, l’édition numérique et les interfaces SaaS premium. La structure reste dense et opérationnelle, tandis que les accents graphiques rendent la progression immédiatement lisible.

### Core Principles
1. **La progression est visible avant l’action.** Chaque écran expose l’étape, le niveau et le prochain geste utile.
2. **Une énergie jeune, jamais infantile.** Les formes sont souples, les couleurs franches et les micro-interactions vivantes, mais la typographie et les espaces restent matures.
3. **Le contenu prime sur le chrome.** Les missions, retours IA et compétences occupent le centre de l’expérience.
4. **Une même grammaire pour l’élève et le centre.** Les vues student et B2B partagent leurs repères, avec des niveaux de densité adaptés.

### Color Philosophy
Le bleu nuit et l’indigo forment l’environnement de confiance et la colonne vertébrale de la navigation. Le jaune signal agit comme une lumière d’orientation : il indique ce qui mérite l’attention et donne une signature optimiste à SEEKLIGHT. Le violet sert aux fonctions IA et aux feedbacks, tandis que le vert est réservé à PET pour différencier la progression sans fragmenter la marque.

### Layout Paradigm
Une application à rail latéral permanent, avec une scène principale décalée et des panneaux asymétriques. Les écrans alternent entre une zone de synthèse compacte et une zone d’action plus ample : le dashboard ouvre une fenêtre sur le parcours, les missions s’organisent comme une piste, et les activités utilisent un mode focus sans perdre le contexte de navigation.

### Signature Elements
- Un symbole de balise en forme de rayon / faisceau, utilisé dans le logo, les niveaux de progression et les états de succès.
- Des badges de niveau en forme de languettes, rappelant les marqueurs d’un carnet de campus.
- Des panneaux “Seeker note” avec un bord violet discret et une petite orbite graphique, pour rendre l’IA présente mais non intrusive.

### Interaction Philosophy
Chaque clic doit confirmer l’étape suivante : sélection immédiate, feedback local, puis progression visible. Les actions importantes sont accompagnées d’un micro-texte utile plutôt que d’un effet spectaculaire. Les fonctionnalités non implémentées sont présentées comme des “demo flows” explicites, afin de protéger la crédibilité de la validation produit.

### Animation
Les cartes entrent par translation courte et opacité, avec un décalage de 40 ms entre les groupes. Les boutons utilisent une compression de 0.97 à l’activation et un retour rapide. Les barres de progression se remplissent uniquement lors d’un changement réel d’état. Les modales et tiroirs restent sous 260 ms, avec une courbe ease-out nette. Les états de feedback privilégient une transition de couleur et un léger déplacement plutôt qu’un rebond. Les animations non essentielles sont désactivées pour prefers-reduced-motion.

### Typography System
Titres : **Manrope**, poids 700–800, pour une voix contemporaine, nette et légèrement géométrique. Corps et labels : **DM Sans**, poids 400–600, pour une lecture confortable dans les écrans denses. Les titres utilisent une échelle courte et contrastée : 12 px pour les caps de section, 16–18 px pour les cartes, 30–44 px pour les titres de page. Les chiffres de progression peuvent monter à 48 px pour devenir des repères visuels.

### Brand Essence
SEEKLIGHT est le compagnon d’apprentissage Cambridge qui transforme chaque compétence en prochaine étape claire pour les élèves de 10 à 14 ans et les centres de langues qui les accompagnent.
**Personality:** Encouraging, Focused, Bright.

### Brand Voice
Les titres sont directs et encourageants. Les CTA décrivent une action concrète, sans jargon produit. Les microcopies donnent du courage tout en restant précises.

Exemples :
- « Ta prochaine étape est déjà éclairée. »
- « Reprendre la mission là où tu t’es arrêté. »

### Wordmark & Logo
Le logotype combine une capitalisation compacte “SEEKLIGHT” avec un symbole autonome : deux rayons jaunes qui traversent un point indigo, comme une balise qui révèle un chemin. Le symbole doit fonctionner seul dans la navigation et le favicon, avec une construction simple et reconnaissable à petite taille.

### Signature Brand Color
**Signal Yellow — #F7C948**, un jaune chaud et propriétaire qui évoque l’orientation, le progrès et la lumière, utilisé en touches ciblées sur l’indigo plutôt qu’en aplats dominants.

## Style Decisions
Cette direction est la référence obligatoire pour les composants, pages et styles de la démo. Toute décision visuelle doit répondre à la question : **« Est-ce que cela rend la prochaine étape plus claire sans diluer l’énergie premium de Campus Signal ? »**


## Style Decisions

- Le wordmark SEEKLIGHT et le symbole de balise/rayons doivent rester visibles dans le rail indigo permanent sur chaque route produit.
- Le Signal Yellow #F7C948 est réservé aux moments d’orientation : action principale, étape courante, progression active et balise de marque ; les autres couleurs restent sémantiques.
- La composition par défaut est un rail de navigation indigo permanent et une scène principale éditoriale asymétrique, plutôt qu’une page SaaS centrée générique.
- Toutes les routes de validation, y compris les vues mission, assessment et B2B, conservent la même coque de produit et le même langage de progression.
