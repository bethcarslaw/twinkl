import { useEffect, useState } from 'react';
import { SearchInput } from './components/SearchInput';
import { Post } from '@/types/post';
import { getPosts, updatePost, deletePost, addPost } from '@/api/posts';
import { PostList } from './components/PostList';
import { PostForm } from './components/PostForm';

const App = () => {
    const [searchValue, setSearchValue] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [limit, setLimit] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPost, setEditPost] = useState<Post | undefined>();

    const handleGetPosts = async () => {
        try {
            setIsLoading(true);
            setError('');
            const result = await getPosts({
                params: {
                    ...(searchValue ? { title_like: searchValue } : {}),
                    _limit: limit,
                },
            });

            if (result) {
                setPosts(result);
            }
        } catch (error) {
            setError(
                'An error occurred while fetching posts, please try again later.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostUpdate = async (post: Post) => {
        try {
            const result = await updatePost(post.id, post);

            if (result) {
                // normally would re-call API here to get updated data
                setPosts((prevPosts) =>
                    prevPosts.map((p) => (p.id === post.id ? post : p))
                );
            }
        } catch (error) {
            setError(
                'An error occurred while updating the post, please try again later.'
            );
        }
    };

    const handlePostDelete = async (id: number) => {
        try {
            setIsLoading(true);
            const result = await deletePost(id);

            if (result) {
                // normally would re-call API here to get updated data
                setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
            }
        } catch (error) {
            setError(
                'An error occurred while deleting the post, please try again later.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostAdd = async (post: Post) => {
        try {
            setIsLoading(true);
            const result = await addPost(post);

            if (result) {
                // normally would re-call API here to get updated data
                setPosts((prevPosts) => [result, ...prevPosts]);
            }
        } catch (error) {
            setError(
                'An error occurred while adding the post, please try again later.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditPost(undefined);
    };

    const handleSetEditPost = (post: Post) => {
        setEditPost(post);
        setIsModalOpen(true);
    };

    useEffect(() => {
        handleGetPosts();
    }, [searchValue, limit]);

    return (
        <div
            className="container max-w-screen-xl m-auto pb-4"
            data-testid="posts-app"
        >
            <div className="mb-4">
                <SearchInput value={searchValue} onChange={setSearchValue} />
            </div>

            <div className="flex justify-center mt-4">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsModalOpen(true)}
                    data-testid="add-post-button"
                >
                    Add Post
                </button>
            </div>

            {posts && !isLoading && posts.length > 0 && (
                <PostList
                    posts={posts}
                    onPostDelete={handlePostDelete}
                    onPostUpdate={(post) => handleSetEditPost(post)}
                />
            )}

            {isLoading && <p data-testid="loading-text">Loading...</p>}

            {error && (
                <p className="text-red-500" data-testid="error-text">
                    {error}
                </p>
            )}

            {posts.length >= limit && (
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setLimit(limit + 5)}
                        data-testid="load-more-button"
                    >
                        Load More
                    </button>
                </div>
            )}

            {isModalOpen && (
                <PostForm
                    isOpen
                    onClose={() => handleCloseModal()}
                    onSubmit={editPost ? handlePostUpdate : handlePostAdd}
                    post={editPost}
                />
            )}
        </div>
    );
};

export default App;
