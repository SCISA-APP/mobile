/**
 * Sorts executives by role priority.
 * Known roles are matched with fuzzy/lowercase includes so variations like
 * "Vice President (Finance)" or "Women's Commissioner" still rank correctly.
 * Unknown roles fall to the end, preserving their original relative order.
 */

const ROLE_PRIORITY: { match: string; rank: number }[] = [
  { match: 'president',             rank: 0 },  // catches "president" but not "vice president"
  { match: 'vice president',        rank: 1 },
  { match: 'vp',                    rank: 1 },
  { match: 'general secretary',     rank: 2 },
  { match: 'financial secretary',   rank: 3 },
  { match: 'organizing secretary',  rank: 4 },
  { match: 'organising secretary',  rank: 4 },  // alternate spelling
  { match: 'wocom',                 rank: 5 },
  { match: "women's commissioner",  rank: 5 },
  { match: 'women commissioner',    rank: 5 },
];

function getRoleRank(role: string): number {
  const lower = role.toLowerCase();

  // Check "vice president" before "president" to avoid false match
  for (const { match, rank } of ROLE_PRIORITY) {
    if (lower.includes(match)) return rank;
  }

  return 999; // unknown roles go last
}

export function sortExecutives<T extends { role: string }>(executives: T[]): T[] {
  return [...executives].sort((a, b) => getRoleRank(a.role) - getRoleRank(b.role));
}