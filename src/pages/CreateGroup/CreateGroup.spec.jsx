import { RecoilRoot } from 'recoil';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateGroup from '.';

const renderComponent = () => {
  render(
    <RecoilRoot>
      <CreateGroup />
    </RecoilRoot>
  );

  const input = screen.getByPlaceholderText(
    '더치 페이 그룹의 이름을 입력해주세요'
  );
  const saveButton = screen.getByText('저장');
  const checkErrorMessage = () =>
    screen.queryByText('그룹 이름은 빈 칸으로 비워둘 수 없습니다');

  return { input, saveButton, checkErrorMessage };
};

describe('그룹 생성 페이지', () => {
  test('그룹 입력 컴포넌트 렌더링 확인', () => {
    const { input, saveButton } = renderComponent();

    expect(input).not.toBeNull();
    expect(saveButton).not.toBeNull();
  });

  test('그룹 이름을 입력하지 않은 상태에서 저장 버튼 클릭 시, 저장 실패', async () => {
    const { saveButton, checkErrorMessage } = renderComponent();

    userEvent.click(saveButton);

    await waitFor(() => {
      const errorMessage = checkErrorMessage();
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('그룹 이름을 입력한 이후에 저장 버튼 클릭 시, 저장 성공', async () => {
    const { input, saveButton, checkErrorMessage } = renderComponent();

    await userEvent.type(input, '그룹 이름');
    await userEvent.click(saveButton);

    await waitFor(() => {
      const errorMessage = checkErrorMessage();
      expect(errorMessage).toBeNull();
    });
  });
});
