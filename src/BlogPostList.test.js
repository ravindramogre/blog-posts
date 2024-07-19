import React from 'react';
import { render, screen } from '@testing-library/react';
import NoPage from './components/NoPage';
import BlogPostList from './components/BlogPostList';
import BlogPostItem from './components/BlogPostItem';

it('checking datasource value', async () => {
  render(<BlogPostList />);
  const datasource = await screen.findByTestId("datasource");
  expect(datasource).toBeInTheDocument();
});

it('checking record', async () => {
  render(<BlogPostItem />);
  const record = await screen.findByTestId("record");
  expect(record).toBeInTheDocument();
});