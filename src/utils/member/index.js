// 태그 등록
import { FieldError } from 'react-hook-form';

export function addMember(tags, inputTag, event, setValue, setFocus, setError) {
  const regExp = /[{}[\]\/?.;:|)*~`!^\\_+<>@#$%&=('"-]/g;

  // 엔터, 스페이스바, 콤마 입력 시 태그 추가
  const allowEventKey =
    inputTag !== '' &&
    (event.key === 'Enter' || inputTag.endsWith(' ') || inputTag.endsWith(','));

  if (regExp.test(inputTag)) {
    setError('memberName', {
      type: 'validate',
      message: '올바르지 않은 이름 양식입니다',
    });
    return tags;
  }

  // 태그 추가
  if (inputTag !== '' && allowEventKey) {
    let trimmedTag = inputTag.trim();

    if (trimmedTag.includes(',')) {
      trimmedTag = trimmedTag.split(',').join('');
    }

    if (trimmedTag.endsWith(',')) {
      trimmedTag = trimmedTag.slice(0, -1);
    }

    if (!tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setValue('memberName', '');
      setFocus('memberName');
      return newTags;
    } else {
      setError('memberName', {
        type: 'duplicated',
        message: '이미 추가된 멤버입니다.',
      });
    }
  }

  return tags;
}

// 태그 삭제
export function deleteMember(tags, tagToDelete) {
  return tags.filter((tag) => tag !== tagToDelete);
}
