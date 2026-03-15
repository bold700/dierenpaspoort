export type DierCategorie = 'zoogdier' | 'vogel' | 'reptiel' | 'insect' | 'water' | 'overig'

export interface LeerDier {
  id: string
  naam: string
  emoji: string
  beschrijving: string
  categorie: DierCategorie
}

/** Dieren om te ontdekken en te beluisteren — tik om te horen. */
export const LEER_DIEREN: LeerDier[] = [
  // Zoogdieren
  { id: 'leeuw', naam: 'Leeuw', emoji: '🦁', categorie: 'zoogdier', beschrijving: 'De leeuw is de koning van de savanne. Hij heeft een grote manen en brult heel hard. Leeuwen slapen wel twintig uur per dag!' },
  { id: 'olifant', naam: 'Olifant', emoji: '🐘', categorie: 'zoogdier', beschrijving: 'De olifant is het zwaarste dier dat op het land loopt. Zijn slurf is eigenlijk zijn neus. Hij kan er mee drinken, eten pakken en vriendjes groeten.' },
  { id: 'giraffe', naam: 'Giraffe', emoji: '🦒', categorie: 'zoogdier', beschrijving: 'De giraffe is het langste dier ter wereld. Zijn nek is zo lang dat hij bij de hoogste blaadjes kan. Elke giraffe heeft unieke vlekken, net als een vingerafdruk.' },
  { id: 'panda', naam: 'Reuzenpanda', emoji: '🐼', categorie: 'zoogdier', beschrijving: 'De reuzenpanda eet bijna alleen maar bamboe. Hij woont in China en heeft een zwart-wit pak. Panda\'s zijn heel zeldzaam en worden beschermd.' },
  { id: 'dolfijn', naam: 'Dolfijn', emoji: '🐬', categorie: 'zoogdier', beschrijving: 'Dolfijnen zijn superslimme zoogdieren die in de zee leven. Ze praten met piepjes en klikjes. Ze springen graag uit het water en zwemmen vaak in groepen.' },
  { id: 'tijger', naam: 'Tijger', emoji: '🐯', categorie: 'zoogdier', beschrijving: 'De tijger is de grootste kat ter wereld. Hij heeft oranje vacht met zwarte strepen. Elke tijger heeft andere strepen, net als wij vingerafdrukken.' },
  { id: 'wolf', naam: 'Wolf', emoji: '🐺', categorie: 'zoogdier', beschrijving: 'Wolven leven in een roedel, dat is hun familie. Ze huilen naar de maan om met elkaar te praten. In Nederland zijn weer een paar wolven in het wild.' },
  { id: 'aap', naam: 'Chimpansee', emoji: '🐵', categorie: 'zoogdier', beschrijving: 'De chimpansee lijkt het meest op mensen. Hij gebruikt takjes om mieren te vangen en kan gereedschap maken. Chimpansees knuffelen en lachen net als wij.' },
  { id: 'koala', naam: 'Koala', emoji: '🐨', categorie: 'zoogdier', beschrijving: 'De koala woont in Australië en eet bijna alleen eucalyptusblaadjes. Hij slaapt wel achttien uur per dag. Baby koala\'s rijden mee op mama\'s rug.' },
  { id: 'nijlpaard', naam: 'Nijlpaard', emoji: '🦛', categorie: 'zoogdier', beschrijving: 'Het nijlpaard is zwaar en woont in Afrika. Hij kan heel goed zwemmen en blijft vaak in het water. Zijn bek kan wijd open, dat is best eng voor roofdieren!' },
  { id: 'zebra', naam: 'Zebra', emoji: '🦓', categorie: 'zoogdier', beschrijving: 'De zebra heeft zwart-witte strepen. Die strepen helpen tegen vliegen en maken het lastig voor een leeuw om er eentje te pakken. Elke zebra heeft unieke strepen.' },
  { id: 'eekhoorn', naam: 'Eekhoorn', emoji: '🐿️', categorie: 'zoogdier', beschrijving: 'De eekhoorn woont in bomen en verzamelt noten. Hij verstop ze voor de winter. Zijn pluimstaart helpt bij het springen en houdt hem in evenwicht.' },
  { id: 'konijn', naam: 'Konijn', emoji: '🐰', categorie: 'zoogdier', beschrijving: 'Konijnen kunnen heel hoog springen. Ze hebben lange oren om goed te horen. Wilde konijnen graven gangen onder de grond, dat heet een burcht.' },
  { id: 'egel', naam: 'Egel', emoji: '🦔', categorie: 'zoogdier', beschrijving: 'De egel heeft stekels op zijn rug. Als hij schrikt, rolt hij zich op tot een balletje. Egels eten slakken en insecten en slapen in de winter een winterslaap.' },
  // Vogels
  { id: 'uil', naam: 'Uil', emoji: '🦉', categorie: 'vogel', beschrijving: 'Uilen jagen \'s nachts. Hun ogen kunnen in het donker goed zien. Ze kunnen hun kop bijna helemaal omdraaien, wel 270 graden!' },
  { id: 'pauw', naam: 'Pauw', emoji: '🦚', categorie: 'vogel', beschrijving: 'De mannetjespauw heeft een prachtige staart met oogjes. Hij spreidt die om indruk te maken op de vrouwtjes. Pauwen kunnen niet zo goed vliegen, maar wel mooi lopen.' },
  { id: 'pinguin', naam: 'Pinguïn', emoji: '🐧', categorie: 'vogel', beschrijving: 'Pinguïns zijn vogels die niet kunnen vliegen maar wel heel goed zwemmen. Ze leven op de Zuidpool. Papa pinguïn houdt het ei warm op zijn voeten.' },
  { id: 'flamingo', naam: 'Flamingo', emoji: '🦩', categorie: 'vogel', beschrijving: 'Flamingo\'s zijn roze door het eten van garnalen en algen. Ze staan vaak op één been. In Nederland zie je ze soms in het wild bij zout water.' },
  { id: 'kolibrie', naam: 'Kolibrie', emoji: '🐦', categorie: 'vogel', beschrijving: 'De kolibrie is een heel klein vogeltje dat zijn vleugels super snel beweegt. Hij kan stil in de lucht hangen en achteruit vliegen. Hij drinkt nectar uit bloemen.' },
  { id: 'specht', naam: 'Specht', emoji: '🐦', categorie: 'vogel', beschrijving: 'De specht tikt met zijn snavel tegen bomen om insecten te vinden. Zijn kop is extra stevig zodat hij geen hoofdpijn krijgt. Hij maakt ook een hol in de boom om te slapen.' },
  // Reptielen
  { id: 'krokodil', naam: 'Krokodil', emoji: '🐊', categorie: 'reptiel', beschrijving: 'De krokodil is een oud reptiel. Hij leeft in het water en wacht tot een dier komt drinken. Zijn kaken zijn zo sterk dat hij bijna alles kan dichtbijten.' },
  { id: 'slang', naam: 'Slang', emoji: '🐍', categorie: 'reptiel', beschrijving: 'Slangen hebben geen pootjes. Ze kronkelen voort. Sommige slangen voelen trillingen met hun buik. Ze ruiken met hun tong!' },
  { id: 'schildpad', naam: 'Reuzenschildpad', emoji: '🐢', categorie: 'reptiel', beschrijving: 'Reuzenschildpadden kunnen heel oud worden, wel meer dan honderd jaar. Ze dragen hun huis op hun rug. Op de Galapagoseilanden leven er nog echte reuzen.' },
  { id: 'kameleon', naam: 'Kameleon', emoji: '🦎', categorie: 'reptiel', beschrijving: 'De kameleon kan van kleur veranderen. Hij doet dat door zijn humeur of om zich te verstoppen. Zijn tong schiet eruit om insecten te vangen.' },
  // Insecten
  { id: 'bij', naam: 'Honingbij', emoji: '🐝', categorie: 'insect', beschrijving: 'Honingbijen maken honing van bloemnectar. Ze dansen om aan andere bijen te vertellen waar bloemen zijn. Zonder bijen hebben we bijna geen fruit en groente.' },
  { id: 'vlinder', naam: 'Vlinder', emoji: '🦋', categorie: 'insect', beschrijving: 'Vlinders beginnen als rups. Die verpopt zich en wordt dan een vlinder. Hun vleugels hebben duizenden schubjes, daarom zijn ze zo mooi van kleur.' },
  { id: 'mier', naam: 'Mier', emoji: '🐜', categorie: 'insect', beschrijving: 'Mieren zijn super sterk. Ze tillen dingen die veel zwaarder zijn dan zijzelf. Ze leven in een nest met een koningin en werken allemaal samen.' },
  { id: 'libel', naam: 'Libel', emoji: '🪲', categorie: 'insect', beschrijving: 'Libellen kunnen heel snel vliegen en alle kanten op. Ze hebben grote ogen en vangen andere insecten in de lucht. Ze leven graag bij water.' },
  // Water
  { id: 'haai', naam: 'Haaai', emoji: '🦈', categorie: 'water', beschrijving: 'Haaien zijn vissen met een skelet van kraakbeen. Ze ruiken bloed van ver. De witte haai is een van de grootste roofvissen, maar niet alle haaien zijn gevaarlijk.' },
  { id: 'octopus', naam: 'Octopus', emoji: '🐙', categorie: 'water', beschrijving: 'De octopus heeft acht armen met zuignappen. Hij kan van kleur en vorm veranderen om zich te verstoppen. Hij is heel slim en kan potjes openmaken.' },
  { id: 'zeehond', naam: 'Zeehond', emoji: '🦭', categorie: 'water', beschrijving: 'Zeehonden leven in zee maar komen op het strand om te rusten. In Nederland zie je ze in de Waddenzee. Ze eten vis en kunnen heel diep duiken.' },
  { id: 'walvis', naam: 'Blauwe vinvis', emoji: '🐋', categorie: 'water', beschrijving: 'De blauwe vinvis is het grootste dier dat ooit heeft geleefd. Hij is groter dan een dinosaurus. Zijn hart is zo groot als een kleine auto.' },
  { id: 'zeearend', naam: 'Zeearend', emoji: '🦅', categorie: 'vogel', beschrijving: 'De zeearend is een grote roofvogel. Hij leeft bij meren en de zee en eet vis. In Nederland broedt hij weer in de Oostvaardersplassen.' },
  // Overig / extra
  { id: 'neushoorn', naam: 'Neushoorn', emoji: '🦏', categorie: 'zoogdier', beschrijving: 'De neushoorn heeft een hoorn op zijn neus. Die hoorn is van hetzelfde spul als onze nagels. Er zijn vijf soorten neushoorns, sommige zijn heel zeldzaam.' },
  { id: 'kangoeroe', naam: 'Kangoeroe', emoji: '🦘', categorie: 'zoogdier', beschrijving: 'De kangoeroe springt op zijn sterke achterpoten. Het jong zit in de buidel van mama. Kangoeroes komen uit Australië.' },
  { id: 'luiaard', naam: 'Luiaard', emoji: '🦥', categorie: 'zoogdier', beschrijving: 'De luiaard beweegt heel langzaam en hangt ondersteboven in bomen. Hij slaapt wel vijftien uur per dag. In zijn vacht groeien soms groene algen, dat is zijn camouflage.' },
]
