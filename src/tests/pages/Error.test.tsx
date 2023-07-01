import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Error from '../../pages/Error';

describe('When the page is rendered', () => {
  it('should render the <Error /> component', async () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );

    expect(await screen.findByText('404 Not Found!')).toBeInTheDocument();

  });
});
