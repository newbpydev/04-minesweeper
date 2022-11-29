//@ Imports
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

//@ To Test
import App from '../../src/App';

//* Tests
test('Renders main page correctly', async () => {
  // @ Setup
  render(<App />);
  const buttonCount = await screen.findByRole('button');
  const codeCount = await screen.queryByText(/The count is now: /);

  // @ Pre Expectations
  expect(buttonCount.innerHTML).toBe('count is 0');
  //# Instead of:
  //# expect(codeCount).toBeNull();
  // expect(codeCount).toBeNull();
  expect(codeCount).not.toBeInTheDocument();

  // @ Init
  await user.click(buttonCount);
  await user.click(buttonCount);

  const codeCount2 = await screen.queryByText(/The count is now: /);

  // @ Post Expectations
  // expect(true).toBeTruthy();
  expect(buttonCount.innerHTML).toBe('count is 2');
  expect(await screen.queryByText(/The count is now:/)).toBeInTheDocument();
});

// test("should render main page correctly", () => {
//   expect(true).toBeTruthy();
// });
