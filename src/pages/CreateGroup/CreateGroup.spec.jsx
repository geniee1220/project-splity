import { render, screen } from '@testing-library/react';
import CreateGroup from '.';
import userEvent from '@testing-library/user-event';

const renderComponent = () => {
  render(<CreateGroup />);
  const input = screen.getByRole('input');
  const saveButton = screen.getByText('저장');
  const errorMessage = screen.queryByText('그룹 이름을 입력해주세요.');

  return { input, saveButton, errorMessage };
};

describe('그룹 생성 페이지', () => {
  test('그룹 입력 컴포넌트 렌더링 확인', () => {
    const { input, saveButton } = renderComponent();

    expect(input).not.toBeNull();

    expect(saveButton).toBeInTheDocument();
  });
  test('그룹 이름을 입력하지 않고 저장 버튼 클릭 시, 에러 메세지 노출', async () => {
    const { saveButton, errorMessage } = renderComponent();

    await userEvent.click(saveButton);

    expect(errorMessage).not.toBeNull();
  });

  test('그룹 이름을 입력한 이후에 저장 버튼 클릭 시, 저장 성공', async () => {
    const { input, saveButton, errorMessage } = renderComponent();

    await userEvent.type(input, '그룹 이름');
    await userEvent.click(saveButton);

    expect(errorMessage).toBeNull();
  });
});
