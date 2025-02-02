import { Title, Text, Stack } from "@mantine/core";

const CustomText = ({ children }) => (
  <Text style={{ wordBreak: "normal" }}>{children}</Text>
);

export default function Home() {
  return (
    <Stack>
      <Title order={1}>Home</Title>
      <CustomText>
        <strong>Welcome to Blog App</strong>, a vibrant platform where users can
        share their favorite blogs by adding links for others to discover!
      </CustomText>
      <CustomText>
        Explore a diverse collection of blog names, complete with direct access
        to each post.
      </CustomText>
      <CustomText>
        Engage with the community by liking the blogs you love, fostering a
        collaborative environment where everyone can express their appreciation
        for great content.
      </CustomText>
      <CustomText>
        Join us to connect, share, and explore the world of blogging together!
      </CustomText>
    </Stack>
  );
}
