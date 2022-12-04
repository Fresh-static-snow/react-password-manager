export type LocalStorageKey = 'userEmail';

const getItem = (args: { key: LocalStorageKey }) => {
  return localStorage.getItem(args.key) as string;
};

const setItem = (args: { key: LocalStorageKey; value: string }) => {
  localStorage.setItem(args.key, args.value);
};

const removeItem = (args: { key: LocalStorageKey }) => {
  localStorage.removeItem(args.key);
};

const getItemsKeys = () => Object.keys(localStorage);

export const localStorageUtil = { setItem, getItem, removeItem, getItemsKeys };
