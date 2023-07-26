import React from 'react';
import AddExpenseForm from './AddExpenseForm';
import ExpenseTable from '../../components/ExpenseTable';

function ExpenseMain() {
  return (
    <div>
      <h2>Splity 그룹 내역</h2>
      <div>
        {/* TODO : 비용 추가 폼 */}
        <AddExpenseForm />
        {/* TODO : 정산 결과 컴포넌트 렌더링TODO :  */}
      </div>
      <div>
        {/* TODO : 그룹명 헤더 렌더링 */}
        {/* TODO : 비용 리스트 컴포넌트 렌더링 */}
        <ExpenseTable />
      </div>
    </div>
  );
}

export default ExpenseMain;
