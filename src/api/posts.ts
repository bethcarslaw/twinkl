import { Post } from '@/types/post';
import { axiosInstance } from '@/util/fetch';
import { AxiosRequestConfig } from 'axios';

const getPosts = async (params?: AxiosRequestConfig) => {
    try {
        const response = await axiosInstance.get<Post[]>('/posts', params);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const addPost = async (data: Post) => {
    try {
        const response = await axiosInstance.post('/posts', data);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const deletePost = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/posts/${id}`);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
const updatePost = async (id: number, data: Post) => {
    try {
        const response = await axiosInstance.put(`/posts/${id}`, data);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { getPosts, addPost, deletePost, updatePost };
