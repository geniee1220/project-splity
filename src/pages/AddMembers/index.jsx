import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { groupMembersState } from '../../state/groupState';

import { useForm } from 'react-hook-form';

import { addMember, deleteMember } from '../../utils/member';

import CenteredOverlayForm from '../../components/CenteredOverlayForm';
import { useNavigate } from 'react-router-dom';

function AddMembers() {
  const navigate = useNavigate();
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const [members, setMembers] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    setFocus,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const handleFormKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // 태그 추가
  const handleKeyUp = (event) => {
    const inputTag = watch('memberName');
    const newMembers = addMember(
      members,
      inputTag,
      event,
      setValue,
      setFocus,
      setError
    );
    setMembers(newMembers);
  };

  // 태그 삭제 버튼 클릭 시 태그 삭제
  const handleTagDelete = (member) => {
    setMembers(deleteMember(members, member));
  };

  const onSubmit = async (data) => {
    if (members.length === 0) {
      setError('memberName', {
        type: 'vaildation',
        message: '멤버 이름은 빈 칸으로 비워둘 수 없습니다',
      });
      return;
    }

    setGroupMembers(members);
    navigate('/expense');
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="min-h-screen relative bg-blue-100">
      <CenteredOverlayForm>
        {/* 폼 */}
        <form
          className="card-body "
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleFormKeyDown}
        >
          <div className="w-full max-w-lg flex flex-col mt-16">
            <p className="w-full text-4xl font-medium text-center leading-snug">
              Splity 시작하기
            </p>

            {/* 멤버 입력 */}
            <div className="mt-10">
              <p className="text-sm text-gray-600">
                멤버 목록 {members.length}
              </p>

              {members.map((member, index) => (
                <div
                  key={index}
                  className="inline-flex items-center mt-2 bg-blue-500 bg-opacity-10 mr-2 px-2 rounded"
                >
                  <span className="text-sm font-medium text-gray-700 mr-1">
                    {member}
                  </span>
                  <button
                    className="btn btn-ghost btn-sm pl-0 pr-0"
                    onClick={() => handleTagDelete(member)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-x"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ff0000"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <input
              type="text"
              data-testid="input-member-names"
              placeholder="더치 페이 그룹 멤버의 이름을 입력해주세요"
              className="input input-bordered w-full mt-4"
              spellCheck="false"
              autoComplete="off"
              onKeyUp={handleKeyUp}
              {...register('memberName')}
            />

            {errors.memberName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.memberName.message}
              </p>
            )}
          </div>
          <div className="card-actions justify-end mt-auto">
            <button className="btn btn-primary px-4 min-w-[100px] mt-4">
              저장
            </button>
          </div>
        </form>
      </CenteredOverlayForm>
    </div>
  );
}

export default AddMembers;
