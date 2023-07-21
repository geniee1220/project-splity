import { useRecoilState } from 'recoil';
import { groupNameState } from '../../state/groupState';

import CenteredOverlayForm from '../../components/CenteredOverlayForm';

function CreateGroup() {
  const [groupName, setGroupName] = useRecoilState(groupNameState);

  return (
    <div className="min-h-screen relative bg-blue-100">
      {/* <CenteredOverlayForm></CenteredOverlayForm> */}
      <div className="w-full max-w-screen-lg m-auto -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 p-4">
        <div className="card card-side bg-base-100 shadow-xl">
          <figure className="max-w-screen-sm">
            <img
              src="https://images.unsplash.com/photo-1646343961743-ef39d2b02c21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGlsbHVzdHJhdGlvbiUyMHllbGxvd3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              alt="Cover"
            />
          </figure>
          <div className="card-body">
            <form className="w-full max-w-lg flex flex-col m-auto">
              <p className="w-full text-4xl font-medium text-center leading-snug">
                Splity 시작하기
              </p>
              <input
                type="text"
                placeholder="더치 페이 그룹의 이름을 입력해주세요"
                className="input input-bordered w-full mt-10"
                spellCheck="false"
                required
              />
            </form>
            <div className="card-actions justify-end">
              <button className="btn btn-primary px-4 min-w-[100px]">
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
