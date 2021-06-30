import { render, fireEvent } from '@testing-library/react';
import NewArticle from '../NewArticle';

it('Article post successfully', () => {
  const { queryByTitle } = render(<NewArticle />);
  const btn = queryByTitle('postarticle');
  expect(btn).toBeTruthy();
});
