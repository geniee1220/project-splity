import { useRecoilValue } from 'recoil';
import { expenseState } from '../../../state/expenseState';
import { groupMembersState } from '../../../state/groupState';

import { BiDownload } from 'react-icons/bi';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useRef } from 'react';

function SettlementSummary({ className }) {
  const modalRef = useRef(null);
  const expenses = useRecoilValue(expenseState);
  const members = useRecoilValue(groupMembersState);

  const downloadImageHandler = () => {
    if (modalRef.current === null) return;
    toPng(modalRef.current, {})
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'settlement-summery.jpeg';
        link.href = dataUrl;

        link.click();
      })
      .catch(function (error) {
        console.error('error', error);
      });
  };

  const totalAmountExpense = expenses.reduce((prevAmount, curExpense) => {
    return Number(prevAmount) + Number(curExpense.amount);
  }, 0);

  console.log(totalAmountExpense);

  const groupMembersCount = members.length;
  const splitAmount = totalAmountExpense / groupMembersCount;

  const calculateMinimumTransactionAmount = (
    expenses,
    members,
    amountPerPerson
  ) => {
    const minTransactionAmount = [];

    if (amountPerPerson === 0) {
      return minTransactionAmount;
    }

    // 1. 각 멤버별로 지출한 금액을 계산
    const membersToPay = {};
    members.forEach((member) => {
      membersToPay[member] = amountPerPerson;
    });

    // 2. 각 멤버별로 받아야 하는 금액을 계산
    // 음수는 받아야 하는 금액, 양수는 남아있는 금액
    expenses.forEach(({ payer, amount }) => {
      membersToPay[payer] -= amount;
    });

    // 3. 각 멤버별로 받아야 하는 금액을 기준으로 정렬
    const sortedMembersToPay = Object.keys(membersToPay)
      .map((member) => ({
        member: member,
        amount: membersToPay[member],
      }))
      .sort((a, b) => {
        return a.amount - b.amount;
      });

    let left = 0;
    let right = sortedMembersToPay.length - 1;

    while (left < right) {
      while (left < right && sortedMembersToPay[left].amount === 0) {
        left++;
      }
      while (left < right && sortedMembersToPay[right].amount === 0) {
        right--;
      }

      const toReceive = sortedMembersToPay[left];
      const toSend = sortedMembersToPay[right];
      const amountToReceive = Math.abs(toReceive.amount);
      const amountToSend = Math.abs(toSend.amount);

      if (amountToSend > amountToReceive) {
        minTransactionAmount.push({
          sender: toSend.member,
          receiver: toReceive.member,
          amount: Math.round(amountToReceive),
        });

        toReceive.amount = 0;
        toSend.amount -= amountToReceive;
        left++;
      } else {
        minTransactionAmount.push({
          sender: toSend.member,
          receiver: toReceive.member,
          amount: Math.round(amountToSend),
        });
        toSend.amount = 0;
        toReceive.amount += amountToSend;
        right--;
      }
    }

    return minTransactionAmount;
  };

  const minimumTransactionAmount = calculateMinimumTransactionAmount(
    expenses,
    members,
    splitAmount
  );

  return (
    <div
      className={`w-full max-w-screen-sm m-auto p-8 border bg-white	rounded ${className}`}
      textid="modal"
    >
      <h2 className="text-3xl text-center mb-6">비용 정산</h2>

      {totalAmountExpense > 0 && groupMembersCount > 0 && (
        <>
          <div ref={modalRef}>
            <span>
              {groupMembersCount}명이 총 {totalAmountExpense}원 지출
            </span>
            <br />
            <span>한 사람 당 {Math.round(splitAmount)} 원</span>
            <br />
            <ul>
              {minimumTransactionAmount.map(
                ({ sender, receiver, amount }, index) => (
                  <li key={`transaction-${index}`}>
                    {sender}님이 {receiver}님에게 {amount}원을 지불해야 합니다.
                  </li>
                )
              )}
            </ul>
          </div>
          <button
            className="btn btn-block mt-5"
            data-testid="downloadButton"
            onClick={downloadImageHandler}
          >
            <BiDownload />
            정산결과 이미지로 다운받기
          </button>
        </>
      )}
    </div>
  );
}

export default SettlementSummary;
