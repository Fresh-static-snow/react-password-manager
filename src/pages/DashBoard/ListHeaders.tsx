import { Grid, Group, Text } from '@mantine/core';

export const ListHeaders = () => (
  <Group mt="xs">
    <Grid sx={{ width: '100%' }} columns={24}>
      <Grid.Col span={2}></Grid.Col>
      <Grid.Col span={6}>
        <Text weight={500} size="sm" align="center">
          Site
        </Text>
      </Grid.Col>
      <Grid.Col span={6}>
        <Text weight={500} size="sm" align="center">
          Username
        </Text>
      </Grid.Col>
      <Grid.Col span={6}>
        <Text weight={500} size="sm" align="center">
          Password
        </Text>
      </Grid.Col>
      <Grid.Col span={2}></Grid.Col>
      <Grid.Col span={2}></Grid.Col>
    </Grid>
  </Group>
);
