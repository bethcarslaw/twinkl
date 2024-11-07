import { Post } from '@/types/post';
import { useState } from 'react';

type PostFormProps = {
    onSubmit: (post: Post) => void;
    post?: Post;
    isOpen: boolean;
    onClose: () => void;
};

const PostForm = ({ onSubmit, post, isOpen, onClose }: PostFormProps) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [body, setBody] = useState(post ? post.body : '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async () => {
        setIsSubmitting(true);
        await onSubmit({ ...post, title, body } as Post);
        onClose();
        setIsSubmitting(false);
    };

    return (
        <>
            {isOpen && (
                <>
                    <div
                        className="fixed w-screen h-screen bg-black opacity-80 top-0 left-0 backdrop-blur-md"
                        onClick={onClose}
                        data-testid="close-modal"
                    ></div>

                    <div
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md"
                        data-testid="post-form"
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleFormSubmit();
                            }}
                            className="bg-white p-4 mb-4"
                        >
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="font-bold text-xl mb-2 w-full"
                                placeholder="Title"
                                data-testid="title-input"
                            />
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="text-gray-600 w-full"
                                placeholder="Body"
                                data-testid="body-input"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 :disabled:opacity-50 :disabled:cursor-not-allowed"
                                data-testid="submit-button"
                            >
                                {isSubmitting ? '...' : 'Save'}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export { PostForm, type PostFormProps };
