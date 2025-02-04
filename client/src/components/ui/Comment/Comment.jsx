import {
  Text,
  Group,
  Paper,
  Divider,
  rem,
  Flex,
  ActionIcon,
  Button,
  Textarea,
} from "@mantine/core";
import classes from "./Comment.module.css";
import { useAuthState } from "../../../contexts/AuthContext";
import IconEdit from "@tabler/icons-react/dist/esm/icons/IconEdit";
import IconMessage2X from "@tabler/icons-react/dist/esm/icons/IconMessage2X";
import { useEffect, useState } from "react";

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
};

export default function Comment({
  comment,
  handleDeleteComment,
  editMode,
  setEditMode,
  handleEditComment,
}) {
  const [editText, setEditText] = useState(comment.text);
  const user = useAuthState();

  const isUserCommentOwner = user.username === comment.user.username;

  useEffect(() => {
    setEditText(comment.text);
  }, [comment]);

  const onEditComment = (e) => {
    e.preventDefault();
    handleEditComment(comment.id, editText);
  };

  return (
    <Paper withBorder radius="md" className={classes.comment} maw={rem(400)}>
      <Group>
        <div>
          <Text fz="sm">{comment.user.name}</Text>
          <Text fz="xs" c="dimmed">
            {formatDate(comment.date)}
          </Text>
        </div>
      </Group>
      <Divider my={rem(10)} />
      <Flex>
        {editMode && isUserCommentOwner ? (
          <form onSubmit={onEditComment}>
            <Textarea
              data-testId="editCommentTextarea"
              required
              value={editText}
              onChange={(e) => setEditText(e.currentTarget.value)}
            />
            {/* <Button
              type="button"
              color="grey"
              size="compact-xs"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button> */}
            <Button type="submit" color="teal" size="compact-xs" mt={5} ml={2}>
              Confirm
            </Button>
          </form>
        ) : (
          <Text size="sm" className={classes.text}>
            {comment.text}
          </Text>
        )}
      </Flex>
      {isUserCommentOwner && (
        <Flex justify="space-between" mt={15}>
          <ActionIcon
            data-testId="editCommentButton"
            size="xs"
            variant="subtle"
            onClick={() => {
              if (editMode) setEditText(comment.text);
              setEditMode(!editMode);
            }}
          >
            <IconEdit stroke={2} />
          </ActionIcon>
          <ActionIcon
            data-testId="deleteCommentButton"
            size="xs"
            variant="subtle"
            color="red"
            onClick={handleDeleteComment}
          >
            <IconMessage2X stroke={2} />
          </ActionIcon>
        </Flex>
      )}
    </Paper>
  );
}
