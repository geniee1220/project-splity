import React from 'react';
import AddExpenseForm from './AddExpenseForm';

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
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>10000</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
                <td>10000</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
                <td>10000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExpenseMain;
