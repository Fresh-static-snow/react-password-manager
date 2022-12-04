import { Button, Grid, Group, Stack, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { Plus, Search } from 'tabler-icons-react';
import { ModalWindow } from '../../components';
import { useActions } from '../../hooks/redux';
import { DashBoardHeaderProps } from './DashBoard.types';

export const DashBoardHeader = ({
  setFilter,
  refetch,
}: DashBoardHeaderProps) => {
  const [open, setOpen] = useState(false);
  const { setWebsitePassword } = useActions();

  return (
    <>
      <Stack>
        <Text align="center" weight={'bolder'}>
          Password List
        </Text>
        <Grid mt="md">
          <Grid.Col span={6}>
            <Group>
              <Button
                onClick={() => {
                  setWebsitePassword({ website: '', password: '', user: '' });
                  setOpen(true);
                }}
                leftIcon={<Plus size={16} />}
              >
                Add
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col
            span={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <TextInput
              onChange={setFilter}
              placeholder="Search"
              icon={<Search size={16} />}
              sx={{ maxWidth: '250px' }}
            />
          </Grid.Col>
        </Grid>
      </Stack>
      <ModalWindow
        open={open}
        onClose={() => setOpen(false)}
        refetch={refetch}
      />
    </>
  );
};
