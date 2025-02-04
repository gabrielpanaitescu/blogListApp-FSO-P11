import { useRef, useState } from "react";
import Togglable from "./Togglable";
import { useBlogs } from "../../hooks/query/useBlogs";
import { Button, Flex, Skeleton, Stack, Textarea, Title } from "@mantine/core";
import Comment from "./Comment/Comment";

const BlogComments = ({ blog }) => {
  const [text, setText] = useState("");
  const blogCommentsRef = useRef();
  const {
    addBlogCommentMutation,
    deleteBlogCommentMutation,
    editBlogCommentMutation,
  } = useBlogs();
  const [editMode, setEditMode] = useState(false);

  const [isBlurred, setIsBlurred] = useState(false);

  const handlePostComment = (e) => {
    setIsBlurred(true);
    e.preventDefault();
    blogCommentsRef.current.toggleVisibility();
    addBlogCommentMutation.mutate(
      { id: blog.id, text },
      {
        onSuccess: () => {
          setText("");
          setIsBlurred(false);
        },
      }
    );
  };

  const handleDeleteComment = (commentId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete the comment?"
    );

    if (!confirmation) return;

    setIsBlurred(true);

    const payload = {
      blogId: blog.id,
      commentId,
    };
    deleteBlogCommentMutation.mutate(payload, {
      onSuccess: () => {
        setIsBlurred(false);
      },
    });
  };

  const handleEditComment = (commentId, editText) => {
    setIsBlurred(true);

    const payload = {
      text: editText,
      blogId: blog.id,
      commentId,
    };
    editBlogCommentMutation.mutate(payload, {
      onSuccess: () => {
        setEditMode(false);
        setIsBlurred(false);
      },
    });
  };

  return (
    <Stack>
      <Title order={4}>Comments</Title>
      <Togglable buttonLabel="new" ref={blogCommentsRef}>
        <form onSubmit={handlePostComment}>
          <Stack align="start">
            <Textarea
              data-testId="addCommentTextarea"
              description="Type your comment and press post!"
              placeholder="This blog was awesome...."
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" color="teal" size="compact-sm">
              Post
            </Button>
          </Stack>
        </form>
      </Togglable>
      <Flex direction="column" gap="sm">
        {blog.comments.map((comment, index) =>
          isBlurred ? (
            <Skeleton key={index} h={100} w={400} animate={true} />
          ) : (
            <Comment
              key={index}
              comment={comment}
              handleDeleteComment={() => handleDeleteComment(comment.id)}
              handleEditComment={handleEditComment}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )
        )}
      </Flex>
    </Stack>
  );
};
export default BlogComments;
