import React, { useEffect, useState } from 'react';
import AddExpenseForm from './AddExpenseForm';
import ExpenseTable from '../../components/ExpenseTable';
import Logo from '../../components/Logo';
import { useRecoilState } from 'recoil';
import {
  addExpenseModalState,
  settlementSummaryModalState,
} from '../../state/modalState';
import SettlementSummary from './SettlementSummery';

function ExpenseMain() {
  const [isAddExpenseForm, setIsAddExpenseForm] =
    useRecoilState(addExpenseModalState);
  const [isSettlementSummary, setIsSettlementSummary] = useRecoilState(
    settlementSummaryModalState
  );

  return (
    <main>
      <div className="w-full  max-w-7xl m-auto mt-10">
        <div className="flex text-3xl text-center m-auto mb-6">
          {/* {groupNameState} */}
          <Logo
            width="180"
            height="69"
            style={{
              margin: 'auto',
            }}
          />
        </div>

        <div>
          {/* 비용 추가 모달 컴포넌트 */}
          <AddExpenseForm
            className={isAddExpenseForm ? 'visible' : 'invisible'}
            onSubmitHandler={() => setIsAddExpenseForm(!isAddExpenseForm)}
          />

          {/* 정산 결과 모달 컴포넌트  */}
          <SettlementSummary
          // onSubmitHandler={() => setIsSettlementSummary(!isSettlementSummary)}
          />

          <div className="flex w-full justify-end mb-6">
            <button
              className="btn btn-primary px-4 min-h-[40px] max-h-0 min-w-[100px] mr-4 rounded"
              onClick={() => setIsAddExpenseForm(!isAddExpenseForm)}
            >
              결제내역 추가하기
            </button>
          </div>
        </div>
        <div>
          {/* TODO : 그룹명 헤더 렌더링 */}
          {/* TODO : 비용 리스트 컴포넌트 렌더링 */}
          <ExpenseTable />
        </div>
      </div>
    </main>
  );
}

export default ExpenseMain;
