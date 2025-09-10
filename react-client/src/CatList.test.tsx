// CatList.test.tsx
jest.mock('axios', () => ({
  get: jest.fn(),
}));

import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { CatList } from './CatList';

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CatList component', () => {
  it('renders cats from API', async () => {
    // Arrange: mock API response
    mockedAxios.get.mockResolvedValueOnce({
      data: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
    });

    render(<CatList />);

    // Assert: loading state first
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait until cats appear
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });
});