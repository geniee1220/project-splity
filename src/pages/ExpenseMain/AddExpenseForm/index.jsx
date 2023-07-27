import React, { useEffect, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { groupMembersState } from '../../../state/groupState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { expenseState } from '../../../state/expenseState';
import { addExpenseModalState } from '../../../state/modalState';

function AddExpenseForm({ className, onSubmitHandler }) {
  const [members, setMembers] = useRecoilState(groupMembersState);
  const [expense, setExpense] = useRecoilState(expenseState);
  const [isAddExpenseForm, setIsAddExpenseForm] =
    useState(addExpenseModalState);

  // 결제 날짜
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  // 결제자
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const selectedValue = watch('payer', 'default');

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const onSubmit = async (data) => {
    const { desc, amount } = data;

    if (selectedValue === 'default') {
      return setError('payer', {
        type: 'vaildation',
        message: '결제자를 선택해주세요',
      });
    }

    const newExpense = {
      date: value.startDate,
      desc: desc,
      amount: amount,
      payer: selectedValue,
    };

    setExpense([...expense, newExpense]);

    // 저장 후, 폼 초기화
    setValue({
      startDate: null,
      endDate: null,
    });
    reset();
    onSubmitHandler();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full max-w-screen-sm m-auto -translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 p-8 border rounded bg-white	${className}`}
      textid="modal"
    >
      <h2 className="text-3xl text-center mb-6">결제내역 추가</h2>

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
        {...register('desc', { required: '결제 내용을 입력해주세요' })}
      />

      {/* 비용 입력 */}
      <div className="flex gap-4 mb-4">
        <input
          className="w-1/2 flex items-center input input-bordered rounded"
          type="number"
          placeholder="비용을 입력해주세요"
          {...register('amount', {
            required: '비용을 빈 칸으로 비워둘 수 없습니다',
          })}
        />

        {/* 결제자 선택 */}
        <select
          className={`w-1/2 select flex items-center text-base font-normal ${
            selectedValue === 'default' ? 'text-gray-400' : ''
          } input-bordered rounded `}
          value={selectedValue}
          {...register('payer')}
        >
          <option value="default" disabled hidden>
            결제한 사람은?
          </option>
          {members.map((member, index) => (
            <option key={index} value={member}>
              {member}
            </option>
          ))}
        </select>
      </div>

      {errors.desc && (
        <p className="text-red-500 text-sm mt-2">{errors.desc.message}</p>
      )}
      {errors.amount && (
        <p className="text-red-500 text-sm mt-2">{errors.amount.message}</p>
      )}
      {errors.payer && (
        <p className="text-red-500 text-sm mt-2">{errors.payer.message}</p>
      )}

      {/* 비용 추가 버튼 */}
      <div className="w-full mt-10">
        <button className="btn btn-block btn-primary px-4 min-w-[100px] rounded">
          비용 정산하기
        </button>
      </div>
    </form>
  );
}

export default AddExpenseForm;
