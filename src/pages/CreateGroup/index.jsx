import { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { groupNameState } from '../../state/groupState';

import { useForm } from 'react-hook-form';

import CenteredOverlayForm from '../../components/CenteredOverlayForm';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';

function CreateGroup() {
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // 디버깅용 코드
  useEffect(() => {
    console.log(groupName);
  }, [groupName, setGroupName]);

  const onSubmit = async (data) => {
    console.log(data.groupName);

    API.post('groupsApi', '/groups', {
      body: {
        groupName: data.groupName,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate('/members');
  };

  return (
    <div className="min-h-screen relative bg-blue-100">
      <CenteredOverlayForm>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full max-w-lg flex flex-col mt-16">
            <p className="w-full text-4xl font-medium text-center leading-snug">
              Splity 시작하기
            </p>
            <input
              type="text"
              placeholder="더치 페이 그룹의 이름을 입력해주세요"
              className="input input-bordered w-full mt-10"
              spellCheck="false"
              autoComplete="off"
              {...register('groupName', {
                required: '그룹 이름은 빈 칸으로 비워둘 수 없습니다',
              })}
            />

            {errors.groupName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.groupName.message}
              </p>
            )}
          </div>
          <div className="card-actions justify-end mt-auto">
            <button className="btn btn-primary px-4 min-w-[100px]">저장</button>
          </div>
        </form>
      </CenteredOverlayForm>
    </div>
  );
}

export default CreateGroup;
