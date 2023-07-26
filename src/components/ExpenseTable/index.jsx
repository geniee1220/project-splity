import React from 'react';
import { useRecoilState } from 'recoil';
import { expenseState } from '../../state/expenseState';

function ExpenseTable() {
  const [expense, setExpense] = useRecoilState(expenseState);

  return (
    <div className="overflow-x-auto">
      <table className="table" data-testid="expenseList">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((item, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.date}</td>
                <td>{item.desc}</td>
                <td>{item.payer}</td>
                <td>{item.amount} 원</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
