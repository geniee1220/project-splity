import { RecoilRoot } from 'recoil';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpensiveMain from '.';
import { groupMembersState } from '../../state/groupState';

const renderComponent = () => {
  render(
    <RecoilRoot
      initializeState={(snap) => {
        snap.set(groupMembersState, ['장유진']);
      }}
    >
      <ExpensiveMain />
    </RecoilRoot>
  );

  const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descInput = screen.getByPlaceholderText(/비용에 대한/i);
  const amountInput = screen.getByPlaceholderText(/비용을 입력/i);
  const payerInput = screen.getByDisplayValue(/결제한 사람/i);
  const addButton = screen.getByText('결제내역 추가');

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

      const amountErrorMessage = await screen.findByText(
        '비용을 빈 칸으로 비워둘 수 없습니다'
      );
      expect(amountErrorMessage).toBeInTheDocument();
    });

    test('결제자만 선택되지 않고 "추가"버튼 클릭 시, 에러 메세지 노출', async () => {
      const { descInput, amountInput, addButton } = renderComponent();

      // 결제자는 결제 내용과 비용이 입력되고, 결제자가 선택되지 않았을 때만 에러 메세지 노출
      await userEvent.type(descInput, '비용 설명');
      await userEvent.type(amountInput, '10000');

      userEvent.click(addButton);

      const payerErrorMessage = await screen.findByText(
        '결제자를 선택해주세요'
      );
      expect(payerErrorMessage).toBeInTheDocument();
    });

    test('비용 추가에 필수적인 값들을 입력한 후 "추가"버튼 클릭 시, 값을 저장', async () => {
      const { descInput, amountInput, payerInput, addButton } =
        renderComponent();

      await userEvent.type(descInput, '비용 설명');
      await userEvent.type(amountInput, '10000');
      await userEvent.selectOptions(payerInput, '장유진');
      userEvent.click(addButton);

      await waitFor(() => {
        const descErrorMessage = screen.queryByText('결제 내용을 입력해주세요');
        expect(descErrorMessage).not.toBeInTheDocument();
      });

      await waitFor(() => {
        const amountErrorMessage = screen.queryByText(
          '비용을 빈 칸으로 비워둘 수 없습니다'
        );
        expect(amountErrorMessage).not.toBeInTheDocument();
      });

      await waitFor(() => {
        const payerErrorMessage = screen.queryByText('결제자를 선택해주세요');
        expect(payerErrorMessage).not.toBeInTheDocument();
      });
    });
  });

  describe('비용 리스트 컴포넌트 관련 테스트', () => {
    test('비용 리스트 컴포넌트 렌더링 확인', () => {
      renderComponent();
      const expenseListComponent = screen.getByTestId('expenseList');
      expect(expenseListComponent).toBeInTheDocument();
    });
  });

  describe('비용 입력 시나리오', () => {
    const addNewExpense = async () => {
      const { dateInput, descInput, amountInput, payerInput, addButton } =
        renderComponent();
      await userEvent.type(dateInput, '2023-07-24');
      await userEvent.type(descInput, '설명');
      await userEvent.type(amountInput, '10000');
      await userEvent.selectOptions(payerInput, '장유진');
      await userEvent.click(addButton);
    };
    test('비용 데이터가 존재할 경우 정산 리스트에 날짜, 내용, 결제자, 금액 데이터 노출', async () => {
      await addNewExpense();
      const expenseListComponent = screen.getByTestId('expenseList');
      const dateValue = within(expenseListComponent).getByText('2023-07-24');
      expect(dateValue).toBeInTheDocument();

      const descValue = within(expenseListComponent).getByText('설명');
      expect(descValue).toBeInTheDocument();

      const payerValue = within(expenseListComponent).getByText('장유진');
      expect(payerValue).toBeInTheDocument();

      const amountValue = within(expenseListComponent).getByText('10000 원');
      expect(amountValue).toBeInTheDocument();
    });
  });
});
