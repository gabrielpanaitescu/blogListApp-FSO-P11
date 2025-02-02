import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import blogService from "../../services/blog";
import { notifications } from "@mantine/notifications";

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const invalidateBlogs = () => {
    return queryClient.invalidateQueries({ queryKey: ["Blog"] });
  };

  const getBlogs = useQuery({
    queryKey: ["Blog"],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Info",
        message: `Failed to fetch blogs ${error.message}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (_returnedBlog) => {
      invalidateBlogs();
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Info",
        message: `Failed to add blog ${error.message}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (returnedBlog) => {
      const blogs = queryClient.getQueryData(["Blog"]) ?? [];
      queryClient.setQueryData(
        ["Blog"],
        blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      );
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Info",
        message: `Failed to update blog. Error: ${error.message}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteItem,
    onSuccess: () => {
      invalidateBlogs();
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Info",
        message: `Failed to delete blog ${error.message}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    },
  });

  const addBlogCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: () => {
      invalidateBlogs();
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Info",
        message: `Failed to add comment. ${error.message}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    },
  });

  const deleteBlogCommentMutation = useMutation({
    mutationFn: blogService.deleteComment,
    onSuccess: () => {
      invalidateBlogs();
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Info",
        message: `Failed to delete comment. ${error.message}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    },
  });

  const editBlogCommentMutation = useMutation({
    mutationFn: blogService.editComment,
    onSuccess: () => {
      invalidateBlogs();
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        title: "Info",
        message: `Failed to edit comment. ${error.message}`,
        position: "top-center",
        autoClose: 5000,
        color: "red",
      });
    },
  });

  return {
    blogs: getBlogs.data || [],
    isGetBlogsPending: getBlogs.isPending,
    isGetBlogsError: getBlogs.isError,
    isGetBlogsLoading: getBlogs.isLoading,
    isGetBlogsFetching: getBlogs.isFetching,
    getBlogsStatus: getBlogs.status,
    getBlogsFetchStatus: getBlogs.fetchStatus,
    getBlogsError: getBlogs.error,
    createBlogMutation,
    updateBlogMutation,
    deleteBlogMutation,
    addBlogCommentMutation,
    deleteBlogCommentMutation,
    editBlogCommentMutation,
  };
};
