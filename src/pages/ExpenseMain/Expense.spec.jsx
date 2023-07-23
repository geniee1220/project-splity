import { RecoilRoot } from 'recoil';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpensiveMain from '.';

const renderComponent = () => {
  render(
    <RecoilRoot>
      <ExpensiveMain />
    </RecoilRoot>
  );

  const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descInput = screen.getByPlaceholderText(/비용에 대한/i);
  const amountInput = screen.getByPlaceholderText(/비용을 입력/i);
  const payerInput = screen.getByPlaceholderText(/결제한 사람/i);
  const addButton = screen.getByText('비용 추가하기');

  return {
    dateInput,
    descInput,
    amountInput,
    payerInput,
    addButton,
  };
};

describe('비용 정산 메인 페이지', () => {
  describe('비용 추가 컴포넌트 관련 테스트', () => {
    test('비용 입력 페이지 렌더링 확인', () => {
      const { dateInput, descInput, amountInput, payerInput, addButton } =
        renderComponent();

      expect(dateInput).toBeInTheDocument();
      expect(descInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      expect(payerInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });

    test('비용을 입력하지 않고 "추가"버튼 클릭 시, 에러 메세지 노출', async () => {
      const { addButton } = renderComponent();

      userEvent.click(addButton);

      const descErrorMessage = await screen.findByText(
        '결제 내용을 입력해주세요'
      );
      expect(descErrorMessage).toBeInTheDocument();

      const payerErrorMessage = await screen.findByText(
        '결제자를 선택해주세요'
      );
      expect(payerErrorMessage).toBeInTheDocument();

      const amountErrorMessage = await screen.findByText(
        '비용을 빈 칸으로 비워둘 수 없습니다'
      );
      expect(amountErrorMessage).toBeInTheDocument();
    });

    test('비용 추가에 필수적인 값들을 입력한 후 "추가"버튼 클릭 시, 값을 저장', async () => {
      const { descInput, amountInput, payerInput, addButton } =
        renderComponent();

      await userEvent.type(descInput, '비용 설명');
      await userEvent.type(amountInput, '10000');
      await userEvent.selectOptions(payerInput, '장유진');
      await userEvent.click(addButton);

      const descErrorMessage = screen.queryByText('결제 내용을 입력해주세요');
      expect(descErrorMessage).not.toBeInTheDocument();

      const payerErrorMessage = screen.queryByText('결제자를 선택해주세요');
      expect(payerErrorMessage).not.toBeInTheDocument();

      const amountErrorMessage = screen.queryByText('비용을 입력해주세요');
      expect(amountErrorMessage).not.toBeInTheDocument();
    });
  });
});
