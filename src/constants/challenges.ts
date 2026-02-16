/**
 * Challenge ID → kullanıcıya gösterilecek isim (challenges tablosu ile uyumlu)
 */
export const CHALLENGE_NAMES: Record<string, string> = {
  'C-01': 'Günlük Harcama',
  'C-02': 'Kategori Avcısı',
  'C-03': 'Elektronik Bonus',
  'C-04': 'Haftalık Aktif',
}

export function getChallengeName(id: string): string {
  return CHALLENGE_NAMES[id] ?? id
}

export function getChallengeNames(ids: string[]): string[] {
  return (ids ?? []).map(getChallengeName)
}
