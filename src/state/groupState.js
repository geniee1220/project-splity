import { atom } from 'recoil';

export const groupNameState = atom({
  key: 'groupNameState',
  default: undefined,
});

export const groupMembersState = atom({
  key: 'groupMembersState',
  default: [],
});
