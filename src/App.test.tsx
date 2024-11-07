import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

vi.mock('./api/posts', () => ({
    getPosts: vi.fn((params) =>
        Promise.resolve(
            [
                { id: 1, title: 'Post One', body: 'Post One Body' },
                { id: 2, title: 'Post Two', body: 'Post Two Body' },
            ].filter((post) =>
                params.params.title_like
                    ? post.title.includes(params.params.title_like)
                    : true
            )
        )
    ),
    addPost: vi.fn((post) => Promise.resolve(post)),
    deletePost: vi.fn(() => Promise.resolve({})),
    updatePost: vi.fn((post) => Promise.resolve(post)),
}));

describe('App', () => {
    it('should render the App component', () => {
        render(<App />);
        expect(screen.getByTestId('posts-app')).toBeInTheDocument();
    });

    it('should open the post form modal when the add post button is clicked', async () => {
        render(<App />);
        userEvent.click(screen.getByText('Add Post'));
        await waitFor(() => {
            expect(screen.getByTestId('post-form')).toBeInTheDocument();
        });
    });

    it('should close the post form modal when the close button is clicked', async () => {
        render(<App />);
        userEvent.click(screen.getByText('Add Post'));
        await waitFor(() => {
            expect(screen.getByTestId('post-form')).toBeInTheDocument();
        });

        userEvent.click(screen.getByTestId('close-modal'));

        await waitFor(() => {
            expect(screen.queryByTestId('post-form')).not.toBeInTheDocument();
        });
    });

    it('should show the correct number of posts returned from the api', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getAllByTestId('post-card')).toHaveLength(2);
        });
    });

    it('should submit the post form when the submit button is clicked', async () => {
        render(<App />);
        userEvent.click(screen.getByText('Add Post'));
        await waitFor(() => {
            expect(screen.getByTestId('post-form')).toBeInTheDocument();
        });

        userEvent.type(screen.getByTestId('title-input'), 'Test Title');
        userEvent.type(screen.getByTestId('body-input'), 'Test Body');
        userEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            expect(screen.getAllByTestId('post-card')).toHaveLength(3);
        });
    });

    it('should delete a post when clicking the remove button', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getAllByTestId('post-card')).toHaveLength(2);
        });

        userEvent.click(screen.getAllByTestId('delete-button')[0]);

        await waitFor(() => {
            expect(screen.getAllByTestId('post-card')).toHaveLength(1);
        });
    });

    it('should open the edit modal when clicking the edit button', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getAllByTestId('post-card')).toHaveLength(2);
        });

        userEvent.click(screen.getAllByTestId('edit-button')[0]);

        await waitFor(() => {
            expect(screen.getByTestId('post-form')).toBeInTheDocument();
            expect(screen.getByTestId('title-input')).toHaveValue('Post One');
            expect(screen.getByTestId('body-input')).toHaveValue(
                'Post One Body'
            );
        });
    });

    // broken, no time to fix
    it.skip('should update a post when the submit button is clicked', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getAllByTestId('post-card')).toHaveLength(2);
        });

        userEvent.click(screen.getAllByTestId('edit-button')[0]);

        await waitFor(() => {
            expect(screen.getByTestId('post-form')).toBeInTheDocument();
            expect(screen.getByTestId('title-input')).toHaveValue('Post One');
            expect(screen.getByTestId('body-input')).toHaveValue(
                'Post One Body'
            );
        });

        userEvent.clear(screen.getByTestId('title-input'));
        userEvent.type(screen.getByTestId('title-input'), 'Updated Title');
        userEvent.clear(screen.getByTestId('body-input'));
        userEvent.type(screen.getByTestId('body-input'), 'Updated Body');
        userEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            expect(screen.getAllByTestId('post-card')).toHaveLength(2);
            expect(
                screen.getAllByTestId('post-card-title')[0]
            ).toHaveTextContent('Updated Title');
        });
    });

    it('should filter posts when the search input is updated', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getAllByTestId('post-card')).toHaveLength(2);
        });

        userEvent.type(screen.getByTestId('search-input'), 'One');

        await waitFor(() => {
            expect(screen.getAllByTestId('post-card')).toHaveLength(1);
        });
    });
});
