import { Post } from '@/types/post';
import { PostCard } from './PostCard';

type PostListProps = {
    posts: Post[];
    onPostDelete: (id: number) => void;
    onPostUpdate: (post: Post) => void;
};

const PostList = ({ posts, onPostDelete, onPostUpdate }: PostListProps) => {
    return (
        <div data-testid="post-list">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    onPostDelete={onPostDelete}
                    onPostUpdate={onPostUpdate}
                />
            ))}
        </div>
    );
};

export { PostList, type PostListProps };
