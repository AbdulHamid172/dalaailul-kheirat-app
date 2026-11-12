import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  FONT_SIZE: 'dalail_font_size',
  BOOKMARKS: 'dalail_bookmarks',
  LAST_READ: 'dalail_last_read',
  THEME: 'dalail_theme',
  COMPLETED: 'dalail_completed',
};

export async function getFontSize(): Promise<'sm' | 'md' | 'lg' | 'xl'> {
  const v = await AsyncStorage.getItem(KEYS.FONT_SIZE);
  if (v === 'sm' || v === 'md' || v === 'lg' || v === 'xl') return v;
  return 'md';
}

export async function setFontSize(size: 'sm' | 'md' | 'lg' | 'xl') {
  await AsyncStorage.setItem(KEYS.FONT_SIZE, size);
}

export async function getBookmarks(): Promise<number[]> {
  const raw = await AsyncStorage.getItem(KEYS.BOOKMARKS);
  try { return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export async function toggleBookmark(passageId: number): Promise<number[]> {
  const current = await getBookmarks();
  const next = current.includes(passageId)
    ? current.filter((id) => id !== passageId)
    : [...current, passageId];
  await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(next));
  return next;
}

export async function isBookmarked(passageId: number): Promise<boolean> {
  const current = await getBookmarks();
  return current.includes(passageId);
}

export async function getLastRead(): Promise<number | null> {
  const v = await AsyncStorage.getItem(KEYS.LAST_READ);
  return v ? Number(v) : null;
}

export async function setLastRead(chapterId: number) {
  await AsyncStorage.setItem(KEYS.LAST_READ, String(chapterId));
}

export async function getCompletedChapters(): Promise<number[]> {
  const raw = await AsyncStorage.getItem(KEYS.COMPLETED);
  try { return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export async function markChapterComplete(chapterId: number): Promise<number[]> {
  const current = await getCompletedChapters();
  if (current.includes(chapterId)) return current;
  const next = [...current, chapterId];
  await AsyncStorage.setItem(KEYS.COMPLETED, JSON.stringify(next));
  return next;
}

export async function unmarkChapterComplete(chapterId: number): Promise<number[]> {
  const current = await getCompletedChapters();
  const next = current.filter((id) => id !== chapterId);
  await AsyncStorage.setItem(KEYS.COMPLETED, JSON.stringify(next));
  return next;
}