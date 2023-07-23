import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { groupMembersState } from '../../../state/groupState';
import { useRecoilState } from 'recoil';

function AddExpenseForm() {
  const [members, setMembers] = useRecoilState(groupMembersState);

  const [selectedValue, setSelectedValue] = useState('default');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="w-full max-w-screen-sm m-auto -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 p-8 border rounded">
      <h2 className="text-3xl text-center mb-6">비용 정산하기</h2>

      {/* 결제 날짜 선택 */}
      <div className="flex items-center input input-bordered rounded mb-4 pr-0">
        <Datepicker
          asSingle={true}
          useRange={false}
          value={value}
          placeholder={'결제한 날짜를 선택해주세요'}
          inputClassName="w-full focus:ring-0 focus:outline-none "
          onChange={handleValueChange}
        />
      </div>

      {/* 비용 설명 입력 */}
      <input
        className="w-full flex items-center input input-bordered rounded mb-4"
        placeholder="비용에 대한 설명을 입력해주세요"
      />

      {/* 비용 입력 */}
      <div className="flex gap-4 mb-4">
        <input
          className="w-1/2 flex items-center input input-bordered rounded"
          type="number"
          placeholder="비용을 입력해주세요"
        />

        {/* 결제자 선택 */}
        <select
          className={`w-1/2 select flex items-center text-base font-normal ${
            selectedValue === 'default' ? 'text-gray-400' : ''
          } input-bordered rounded `}
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="default" disabled hidden>
            결제한 사람은?
          </option>

          {members.map((member) => (
            <option value={member}>{member}</option>
          ))}
        </select>
      </div>
      <div className="w-full mt-10">
        <button className="btn btn-block btn-primary px-4 min-w-[100px] rounded">
          비용 추가하기
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm;
