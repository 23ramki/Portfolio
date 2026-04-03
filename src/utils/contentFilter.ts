/*
  CONTENT FILTER
  ==============
  Blocks form submissions containing racist slurs, offensive phrases,
  and hate speech — with emphasis on anti-Indian/South Asian slurs.

  All terms are stored lowercase. Matching is case-insensitive and
  checks for whole-word boundaries to reduce false positives.
*/

const BLOCKED_TERMS: string[] = [
  // --- Anti-Indian / Anti-South Asian slurs ---
  'pajeet',
  'panjeet',
  'pajeets',
  'streetshitter',
  'street shitter',
  'street shitters',
  'designated shitting street',
  'designated shitting streets',
  'poo in loo',
  'poo in the loo',
  'poo loo',
  'poo poo',
  'superpower by 2020',
  'curry muncher',
  'curry munchers',
  'curry nigger',
  'curry niggers',
  'currymuncher',
  'currynigger',
  'dothead',
  'dotheads',
  'dot head',
  'dot heads',
  'sandnigger',
  'sandniggers',
  'sand nigger',
  'sand niggers',
  'raghead',
  'ragheads',
  'rag head',
  'rag heads',
  'towelhead',
  'towelheads',
  'towel head',
  'towel heads',
  'cow worshipper',
  'cow worshippers',
  'cow pisser',
  'cow pissers',
  'cow piss drinker',
  'patel motel',
  'bindi bitch',
  'tech support scammer',
  'scammer indian',
  'indian scammer',
  'smelly indian',
  'stinky indian',
  'dirty indian',
  'bloody indian',
  'dune coon',
  'dune coons',
  'coolie',
  'coolies',
  'hindoo',
  'curryland',
  'rapeland',
  'gangrape capital',

  // --- General racial slurs ---
  'nigger',
  'niggers',
  'nigga',
  'niggas',
  'niggaz',
  'niglet',
  'niglets',
  'nig nog',
  'nig nogs',
  'coon',
  'coons',
  'darkie',
  'darkies',
  'darky',
  'spic',
  'spics',
  'spick',
  'spicks',
  'wetback',
  'wetbacks',
  'beaner',
  'beaners',
  'chink',
  'chinks',
  'chinky',
  'gook',
  'gooks',
  'zipperhead',
  'zipperheads',
  'slope',
  'slopes',
  'slant eye',
  'slant eyes',
  'slanteye',
  'slanteyes',
  'jap',
  'japs',
  'kike',
  'kikes',
  'heeb',
  'heebs',
  'hymie',
  'hymies',
  'spook',
  'spade',
  'spades',
  'porch monkey',
  'porch monkeys',
  'jungle bunny',
  'jungle bunnies',
  'cracker',
  'crackers',
  'honky',
  'honkey',
  'honkies',
  'gringo',
  'gringos',
  'wop',
  'wops',
  'dago',
  'dagos',
  'gyp',
  'gypped',
  'redskin',
  'redskins',
  'squaw',
  'squaws',
  'halfbreed',
  'half breed',
  'half breeds',
  'camel jockey',
  'camel jockeys',
  'cameljockey',
  'goatfucker',
  'goat fucker',
  'goat fuckers',
  'kebab remover',
  'abort',

  // --- General hate / offensive phrases ---
  'go back to your country',
  'go back to india',
  'go back to pakistan',
  'go back where you came from',
  'white power',
  'white pride',
  'white supremacy',
  'heil hitler',
  'sieg heil',
  'gas the',
  'kill all',
  'death to',
  'lynch',
  'ethnic cleansing',
  'race war',
  'racial purity',
  'subhuman',
  'sub human',
  'untermensch',

  // --- Common offensive words ---
  'fag',
  'fags',
  'faggot',
  'faggots',
  'tranny',
  'trannies',
  'retard',
  'retards',
  'retarded',
]

// Escape special regex characters in a string
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Build regex patterns with word boundaries for each blocked term
const BLOCKED_PATTERNS: RegExp[] = BLOCKED_TERMS.map(
  (term) => new RegExp(`\\b${escapeRegex(term)}\\b`, 'i')
)

/**
 * Checks if text contains any blocked terms.
 * Returns the matched term if found, or null if clean.
 */
export function findBlockedContent(text: string): string | null {
  const normalized = text.toLowerCase()
  for (let i = 0; i < BLOCKED_PATTERNS.length; i++) {
    if (BLOCKED_PATTERNS[i].test(normalized)) {
      return BLOCKED_TERMS[i]
    }
  }
  return null
}

/**
 * Checks multiple form fields at once.
 * Returns true if all fields are clean.
 */
export function isContentClean(fields: string[]): boolean {
  return fields.every((field) => findBlockedContent(field) === null)
}
