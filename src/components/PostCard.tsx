import { Post } from '@/types/post';

type PostProps = {
    post: Post;
    onPostDelete: (id: number) => void;
    onPostUpdate: (post: Post) => void;
};

const PostCard = ({ post, onPostDelete, onPostUpdate }: PostProps) => (
    <div
        className="bg-white shadow-md rounded p-4 mb-4 flex w-full justify-between align-center"
        data-testid="post-card"
    >
        <div className="flex-1">
            <h2 className="text-xl font-bold" data-testid="post-card-title">
                {post.title}
            </h2>
            <p data-testid="post-card-body">{post.body}</p>
        </div>
        <div className="w-[100px] flex flex-col ml-8">
            <button
                className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50 disabled:cursor-not-allowed mb-2"
                onClick={() => onPostUpdate(post)}
                data-testid="edit-button"
            >
                Edit
            </button>
            <button
                className="block w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => onPostDelete(post.id)}
                data-testid="delete-button"
            >
                Remove
            </button>
        </div>
    </div>
);

export { PostCard, type PostProps };
