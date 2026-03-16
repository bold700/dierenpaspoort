import type { Locale } from '../i18n/translations'
import { LEER_CONTENT } from './leerContent'

export type DierCategorie = 'zoogdier' | 'vogel' | 'reptiel' | 'insect' | 'water' | 'dinosaurus' | 'fantasie' | 'overig'

export interface LeerDierBase {
  id: string
  emoji: string
  categorie: DierCategorie
}

export interface LeerDier extends LeerDierBase {
  naam: string
  kort?: string
  beschrijving: string
  weetjes: string[]
}

const MIN_LEER_WEETJES = 10

const EXTRA_WEETJES: Record<Locale, Record<DierCategorie, readonly string[]>> = {
  nl: {
    zoogdier: [
      'Dit dier hoort bij de zoogdieren.',
      'Zoogdieren ademen lucht met longen.',
      'Jonge zoogdieren drinken melk bij hun moeder.',
      'Zoogdieren zijn warmbloedig en houden hun lichaam goed op temperatuur.',
      'Veel zoogdieren zorgen lang voor hun jongen.',
    ],
    vogel: [
      'Dit dier hoort bij de vogels.',
      'Vogels hebben veren in plaats van haren.',
      'Veel vogels leggen eieren in een nest.',
      'Met een snavel kunnen vogels eten oppakken en schoonmaken.',
      'Veel vogels hebben lichte botten die helpen bij bewegen door de lucht.',
    ],
    reptiel: [
      'Dit dier hoort bij de reptielen.',
      'Reptielen hebben meestal schubben op hun huid.',
      'Reptielen zijn koudbloedig en warmen vaak op in de zon.',
      'Veel reptielen leggen eieren met een stevige of leerachtige schaal.',
      'Reptielen besparen vaak energie door rustig te bewegen.',
    ],
    insect: [
      'Dit dier hoort bij de insecten.',
      'Insecten hebben zes poten.',
      'Het lichaam van een insect heeft een kop, borststuk en achterlijf.',
      'Veel insecten gebruiken voelsprieten om te ruiken en te voelen.',
      'Een hard buitenpantser beschermt veel insecten.',
    ],
    water: [
      'Dit dier leeft helemaal of vaak in het water.',
      'Waterdieren hebben een lichaam dat helpt bij zwemmen en duiken.',
      'Veel waterdieren gebruiken vinnen, flippers of armen om te bewegen.',
      'In het water zoeken dieren eten met scherpe zintuigen.',
      'Sommige waterdieren halen lucht boven water en andere halen zuurstof uit het water.',
    ],
    dinosaurus: [
      "Dit dier hoort bij de dino's.",
      'Dinosaurussen leefden miljoenen jaren geleden.',
      'Van dinosaurussen vinden we nu fossielen in steen.',
      'Wetenschappers leren over dinosaurussen door botten en voetsporen te bestuderen.',
      'Niet alle dinosaurussen waren reusachtig; sommige waren zo klein als een kip.',
    ],
    fantasie: [
      'Dit dier hoort bij de fantasiedieren.',
      'Fantasiedieren bestaan in verhalen, spellen en legendes.',
      'Makers geven fantasiedieren vaak bijzondere krachten.',
      'Het uiterlijk van een fantasiedier kan per verhaal verschillen.',
      'Fantasiedieren laten zien hoe groot onze verbeelding kan zijn.',
    ],
    overig: [
      'Dit dier hoort bij een bijzondere groep.',
      'Dieren kun je herkennen aan hun lichaam, geluid en gedrag.',
      'Wetenschappers vergelijken dieren op uiterlijk, voedsel en leefplek.',
      'Door goed te kijken leer je steeds meer over dieren.',
      'Elk dier heeft kenmerken die het anders maken dan andere dieren.',
    ],
  },
  en: {
    zoogdier: [
      'This animal belongs to the mammals.',
      'Mammals breathe air with lungs.',
      'Baby mammals drink milk from their mother.',
      'Mammals are warm-blooded and keep their body temperature steady.',
      'Many mammals care for their young for a long time.',
    ],
    vogel: [
      'This animal belongs to the birds.',
      'Birds have feathers instead of hair.',
      'Many birds lay eggs in a nest.',
      'A beak helps birds pick up and clean food.',
      'Many birds have light bones that help them move through the air.',
    ],
    reptiel: [
      'This animal belongs to the reptiles.',
      'Reptiles usually have scales on their skin.',
      'Reptiles are cold-blooded and often warm up in the sun.',
      'Many reptiles lay eggs with a firm or leathery shell.',
      'Reptiles often save energy by moving calmly.',
    ],
    insect: [
      'This animal belongs to the insects.',
      'Insects have six legs.',
      'An insect body has a head, thorax and abdomen.',
      'Many insects use antennae to smell and feel.',
      'A hard outer shell protects many insects.',
    ],
    water: [
      'This animal lives fully or often in the water.',
      'Water animals have bodies that help them swim and dive.',
      'Many water animals use fins, flippers or arms to move.',
      'In the water, animals search for food with sharp senses.',
      'Some water animals breathe air above the surface and others take oxygen from the water.',
    ],
    dinosaurus: [
      'This animal belongs to the dinos.',
      'Dinosaurs lived millions of years ago.',
      'Today we find dinosaur fossils in rock.',
      'Scientists learn about dinosaurs by studying bones and footprints.',
      'Not all dinosaurs were giant; some were as small as a chicken.',
    ],
    fantasie: [
      'This animal belongs to fantasy creatures.',
      'Fantasy creatures live in stories, games and legends.',
      'Creators often give fantasy creatures special powers.',
      'The look of a fantasy creature can change from one story to another.',
      'Fantasy creatures show how big our imagination can be.',
    ],
    overig: [
      'This animal belongs to a special group.',
      'You can recognize animals by their body, sound and behavior.',
      'Scientists compare animals by appearance, food and habitat.',
      'The better you look, the more you learn about animals.',
      'Every animal has features that make it different from other animals.',
    ],
  },
  es: {
    zoogdier: [
      'Este animal pertenece a los mamiferos.',
      'Los mamiferos respiran aire con pulmones.',
      'Las crias de los mamiferos beben leche de su madre.',
      'Los mamiferos son de sangre caliente y mantienen estable su temperatura corporal.',
      'Muchos mamiferos cuidan de sus crias durante mucho tiempo.',
    ],
    vogel: [
      'Este animal pertenece a las aves.',
      'Las aves tienen plumas en lugar de pelo.',
      'Muchas aves ponen huevos en un nido.',
      'El pico ayuda a las aves a coger y limpiar la comida.',
      'Muchas aves tienen huesos ligeros que les ayudan a moverse por el aire.',
    ],
    reptiel: [
      'Este animal pertenece a los reptiles.',
      'Los reptiles suelen tener escamas en la piel.',
      'Los reptiles son de sangre fria y a menudo se calientan al sol.',
      'Muchos reptiles ponen huevos con una cascara dura o flexible.',
      'Los reptiles suelen ahorrar energia moviendose con calma.',
    ],
    insect: [
      'Este animal pertenece a los insectos.',
      'Los insectos tienen seis patas.',
      'El cuerpo de un insecto tiene cabeza, torax y abdomen.',
      'Muchos insectos usan antenas para oler y sentir.',
      'Un caparazon exterior duro protege a muchos insectos.',
    ],
    water: [
      'Este animal vive siempre o muchas veces en el agua.',
      'Los animales acuaticos tienen un cuerpo que les ayuda a nadar y bucear.',
      'Muchos animales acuaticos usan aletas, patas palmeadas o brazos para moverse.',
      'En el agua, los animales buscan comida con sentidos muy agudos.',
      'Algunos animales acuaticos toman aire arriba y otros sacan oxigeno del agua.',
    ],
    dinosaurus: [
      'Este animal pertenece a los dinos.',
      'Los dinosaurios vivieron hace millones de anos.',
      'Hoy encontramos fosiles de dinosaurios en la roca.',
      'Los cientificos aprenden sobre los dinosaurios estudiando huesos y huellas.',
      'No todos los dinosaurios eran gigantes; algunos eran tan pequenos como una gallina.',
    ],
    fantasie: [
      'Este animal pertenece a las criaturas de fantasia.',
      'Las criaturas de fantasia viven en cuentos, juegos y leyendas.',
      'Los creadores suelen dar poderes especiales a las criaturas de fantasia.',
      'El aspecto de una criatura de fantasia puede cambiar segun la historia.',
      'Las criaturas de fantasia muestran lo grande que puede ser nuestra imaginacion.',
    ],
    overig: [
      'Este animal pertenece a un grupo especial.',
      'Puedes reconocer a los animales por su cuerpo, sonido y comportamiento.',
      'Los cientificos comparan a los animales por su aspecto, comida y habitat.',
      'Cuanto mejor observas, mas aprendes sobre los animales.',
      'Cada animal tiene rasgos que lo hacen diferente de los demas.',
    ],
  },
  zh: {
    zoogdier: [
      '这种动物属于哺乳动物。',
      '哺乳动物用肺呼吸空气。',
      '幼小的哺乳动物会喝妈妈的奶。',
      '哺乳动物是恒温动物，能保持身体温度稳定。',
      '很多哺乳动物会照顾宝宝很久。',
    ],
    vogel: [
      '这种动物属于鸟类。',
      '鸟类有羽毛，不是毛发。',
      '很多鸟会在鸟巢里下蛋。',
      '鸟类用喙来夹取和整理食物。',
      '很多鸟的骨头很轻，方便在空中移动。',
    ],
    reptiel: [
      '这种动物属于爬行动物。',
      '爬行动物的皮肤通常有鳞片。',
      '爬行动物是变温动物，常常靠晒太阳取暖。',
      '很多爬行动物会产下外壳较硬或有弹性的蛋。',
      '很多爬行动物会慢慢移动来节省能量。',
    ],
    insect: [
      '这种动物属于昆虫。',
      '昆虫有六条腿。',
      '昆虫的身体分成头部、胸部和腹部。',
      '很多昆虫用触角来闻气味和感受周围。',
      '坚硬的外骨骼能保护很多昆虫。',
    ],
    water: [
      '这种动物一直生活在水里，或者经常待在水里。',
      '水生动物的身体很适合游泳和潜水。',
      '很多水生动物用鳍、蹼或手臂来移动。',
      '在水里，动物会用灵敏的感觉寻找食物。',
      '有些水生动物会到水面呼吸空气，另一些会从水里获得氧气。',
    ],
    dinosaurus: [
      '这种动物属于恐龙。',
      '恐龙生活在几百万年前。',
      '今天我们会在岩石里发现恐龙化石。',
      '科学家通过研究骨头和脚印来了解恐龙。',
      '不是所有恐龙都很大，有些恐龙只有鸡那么小。',
    ],
    fantasie: [
      '这种动物属于幻想生物。',
      '幻想生物生活在故事、游戏和传说里。',
      '创作者常常会给幻想生物特别的能力。',
      '同一种幻想生物在不同故事里外形可能不一样。',
      '幻想生物让我们看到想象力可以有多大。',
    ],
    overig: [
      '这种动物属于一个特别的类别。',
      '你可以通过身体、声音和行为来认识动物。',
      '科学家会比较动物的外形、食物和生活环境。',
      '你观察得越认真，就会学到越多动物知识。',
      '每一种动物都有让它与其他动物不同的特点。',
    ],
  },
  fr: {
    zoogdier: [
      'Cet animal fait partie des mammiferes.',
      'Les mammiferes respirent l air avec leurs poumons.',
      'Les petits mammiferes boivent le lait de leur mere.',
      'Les mammiferes sont a sang chaud et gardent une temperature stable.',
      'Beaucoup de mammiferes s occupent longtemps de leurs petits.',
    ],
    vogel: [
      'Cet animal fait partie des oiseaux.',
      'Les oiseaux ont des plumes au lieu de poils.',
      'Beaucoup d oiseaux pondent des oeufs dans un nid.',
      'Le bec aide les oiseaux a attraper et nettoyer la nourriture.',
      'Beaucoup d oiseaux ont des os legers qui aident a bouger dans l air.',
    ],
    reptiel: [
      'Cet animal fait partie des reptiles.',
      'Les reptiles ont souvent des ecailles sur leur peau.',
      'Les reptiles ont le sang froid et se rechauffent souvent au soleil.',
      'Beaucoup de reptiles pondent des oeufs a coquille dure ou souple.',
      'Les reptiles economisent souvent leur energie en bougeant calmement.',
    ],
    insect: [
      'Cet animal fait partie des insectes.',
      'Les insectes ont six pattes.',
      'Le corps d un insecte a une tete, un thorax et un abdomen.',
      'Beaucoup d insectes utilisent leurs antennes pour sentir et toucher.',
      'Une carapace externe dure protege beaucoup d insectes.',
    ],
    water: [
      'Cet animal vit toujours ou souvent dans l eau.',
      'Les animaux aquatiques ont un corps adapte a la nage et a la plongee.',
      'Beaucoup d animaux aquatiques utilisent des nageoires, des pattes palmées ou des bras pour bouger.',
      'Dans l eau, les animaux cherchent leur nourriture avec des sens tres precis.',
      'Certains animaux aquatiques respirent l air a la surface et d autres prennent l oxygene dans l eau.',
    ],
    dinosaurus: [
      'Cet animal fait partie des dinos.',
      'Les dinosaures vivaient il y a des millions d annees.',
      'Aujourd hui, on trouve des fossiles de dinosaures dans la roche.',
      'Les scientifiques apprennent a connaitre les dinosaures en etudiant les os et les empreintes.',
      'Tous les dinosaures n etaient pas geants; certains etaient aussi petits qu une poule.',
    ],
    fantasie: [
      'Cet animal fait partie des creatures fantastiques.',
      'Les creatures fantastiques vivent dans les histoires, les jeux et les legendes.',
      'Les createurs donnent souvent des pouvoirs speciaux aux creatures fantastiques.',
      'L apparence d une creature fantastique peut changer selon l histoire.',
      'Les creatures fantastiques montrent a quel point notre imagination peut etre grande.',
    ],
    overig: [
      'Cet animal fait partie d un groupe special.',
      'On peut reconnaitre les animaux par leur corps, leur son et leur comportement.',
      'Les scientifiques comparent les animaux par leur apparence, leur nourriture et leur habitat.',
      'Plus tu observes bien, plus tu apprends sur les animaux.',
      'Chaque animal a des caracteristiques qui le rendent different des autres.',
    ],
  },
}

function normalizeWeetje(weetje: string): string {
  return weetje.trim()
}

function buildLeerWeetjes(
  locale: Locale,
  categorie: DierCategorie,
  beschrijving: string,
  weetjes: string[]
): string[] {
  const extraWeetjes = EXTRA_WEETJES[locale]?.[categorie] ?? EXTRA_WEETJES.nl[categorie]
  const ordered = [...weetjes, beschrijving, ...extraWeetjes]
  const uniek: string[] = []
  const seen = new Set<string>()

  for (const weetje of ordered) {
    const normalized = normalizeWeetje(weetje)
    if (!normalized) continue
    const key = normalized.toLocaleLowerCase(locale)
    if (seen.has(key)) continue
    seen.add(key)
    uniek.push(normalized)
  }

  return uniek.length >= MIN_LEER_WEETJES ? uniek : [...uniek, ...EXTRA_WEETJES.nl.overig].slice(0, MIN_LEER_WEETJES)
}

/** Lijst dieren (id, emoji, categorie). Tekst komt uit LEER_CONTENT[locale]. */
export const LEER_DIEREN: LeerDierBase[] = [
  { id: 'leeuw', emoji: '🦁', categorie: 'zoogdier' },
  { id: 'olifant', emoji: '🐘', categorie: 'zoogdier' },
  { id: 'giraffe', emoji: '🦒', categorie: 'zoogdier' },
  { id: 'panda', emoji: '🐼', categorie: 'zoogdier' },
  { id: 'dolfijn', emoji: '🐬', categorie: 'zoogdier' },
  { id: 'tijger', emoji: '🐯', categorie: 'zoogdier' },
  { id: 'wolf', emoji: '🐺', categorie: 'zoogdier' },
  { id: 'aap', emoji: '🐵', categorie: 'zoogdier' },
  { id: 'koala', emoji: '🐨', categorie: 'zoogdier' },
  { id: 'nijlpaard', emoji: '🦛', categorie: 'zoogdier' },
  { id: 'zebra', emoji: '🦓', categorie: 'zoogdier' },
  { id: 'eekhoorn', emoji: '🐿️', categorie: 'zoogdier' },
  { id: 'konijn', emoji: '🐰', categorie: 'zoogdier' },
  { id: 'egel', emoji: '🦔', categorie: 'zoogdier' },
  { id: 'uil', emoji: '🦉', categorie: 'vogel' },
  { id: 'pauw', emoji: '🦚', categorie: 'vogel' },
  { id: 'pinguin', emoji: '🐧', categorie: 'vogel' },
  { id: 'flamingo', emoji: '🦩', categorie: 'vogel' },
  { id: 'kolibrie', emoji: '🐦', categorie: 'vogel' },
  { id: 'specht', emoji: '🐦', categorie: 'vogel' },
  { id: 'krokodil', emoji: '🐊', categorie: 'reptiel' },
  { id: 'slang', emoji: '🐍', categorie: 'reptiel' },
  { id: 'schildpad', emoji: '🐢', categorie: 'reptiel' },
  { id: 'kameleon', emoji: '🦎', categorie: 'reptiel' },
  { id: 'bij', emoji: '🐝', categorie: 'insect' },
  { id: 'vlinder', emoji: '🦋', categorie: 'insect' },
  { id: 'mier', emoji: '🐜', categorie: 'insect' },
  { id: 'libel', emoji: '🪲', categorie: 'insect' },
  { id: 'haai', emoji: '🦈', categorie: 'water' },
  { id: 'octopus', emoji: '🐙', categorie: 'water' },
  { id: 'zeehond', emoji: '🦭', categorie: 'water' },
  { id: 'walvis', emoji: '🐋', categorie: 'water' },
  { id: 'zeearend', emoji: '🦅', categorie: 'vogel' },
  { id: 'neushoorn', emoji: '🦏', categorie: 'zoogdier' },
  { id: 'kangoeroe', emoji: '🦘', categorie: 'zoogdier' },
  { id: 'luiaard', emoji: '🦥', categorie: 'zoogdier' },
  { id: 'trex', emoji: '🦖', categorie: 'dinosaurus' },
  { id: 'triceratops', emoji: '🦕', categorie: 'dinosaurus' },
  { id: 'brachiosaurus', emoji: '🦕', categorie: 'dinosaurus' },
  { id: 'stegosaurus', emoji: '🦕', categorie: 'dinosaurus' },
  { id: 'pteranodon', emoji: '🦅', categorie: 'dinosaurus' },
  { id: 'velociraptor', emoji: '🦖', categorie: 'dinosaurus' },
  { id: 'draak', emoji: '🐉', categorie: 'fantasie' },
  { id: 'eenhoorn', emoji: '🦄', categorie: 'fantasie' },
  { id: 'feniks', emoji: '🔥', categorie: 'fantasie' },
]

export function getLeerDierenWithLocale(locale: Locale): LeerDier[] {
  const content = LEER_CONTENT[locale] ?? LEER_CONTENT.nl
  return LEER_DIEREN.map((base) => {
    const c = content[base.id] ?? (LEER_CONTENT.nl[base.id] as (typeof content)[string])
    if (!c) return null
    return {
      ...base,
      ...c,
      weetjes: buildLeerWeetjes(locale, base.categorie, c.beschrijving, c.weetjes),
    } as LeerDier
  }).filter(Boolean) as LeerDier[]
}
