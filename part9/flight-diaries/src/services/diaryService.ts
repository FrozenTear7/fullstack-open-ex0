import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from './../types';
import diaries from '../../data/diaries';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(
    ({ comment: _comment, ...nonSensitiveDiaryEntry }) => nonSensitiveDiaryEntry
  );
};

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById,
};
