import { Container, ActionIcon, Text } from "@mantine/core";
import IconBrandGithub from "@tabler/icons-react/dist/esm/icons/IconBrandGithub";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text>Full stack open 2024</Text>
        <ActionIcon
          size="sm"
          color="gray"
          variant="subtle"
          component="a"
          href="https://github.com/gabrielpanaitescu"
        >
          <IconBrandGithub size={28} />
        </ActionIcon>
      </Container>
    </div>
  );
}
