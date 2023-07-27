import { atomFamily, atom } from 'recoil';

export const modalState = atomFamily({
  key: 'modalState',
  default: false,
});

export const addExpenseModalState = atom({
  key: 'addExpenseModalState',
  default: false,
});

export const settlementSummaryModalState = atom({
  key: 'settlementSummaryModalState',
  default: false,
});
