import { waitFor } from '@testing-library/react';
import { renderApp } from '../config/jest/testHelpers';

test('renders app component and displays auth page', async () => {
    const { getByTestId } = renderApp();
    const authPage = await waitFor(() => getByTestId('auth-page'));

    expect(authPage).toBeInTheDocument();
});

// test("renders components", async () => {
//   const { getByTestId } = renderApp();
//   const authPage = await waitFor(() => getByTestId("auth-page"));

//   expect(authPage).toBeInTheDocument();

// });
