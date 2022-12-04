import {
  ActionIcon,
  Grid,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { memo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Edit,
  Trash,
  Lock,
  World,
  X,
  GripVertical,
  Id,
} from 'tabler-icons-react';
import { ModalWindow } from '../../components';
import { useActions } from '../../hooks/redux';
import { PasswordItemProps } from './DashBoard.types';

export const PasswordItem = memo(
  ({ item, index, filter, removeHandler, refetch }: PasswordItemProps) => {
    const { setWebsitePassword } = useActions();
    const [open, setOpen] = useState(false);

    return (
      <>
        <Draggable index={index} draggableId={item.website}>
          {(provided) => (
            <Group
              ref={provided.innerRef}
              mt="xs"
              {...(filter ? {} : provided.draggableProps)}
            >
              <Grid sx={{ width: '100%' }} columns={24}>
                <Grid.Col
                  span={2}
                  {...(filter ? {} : provided.dragHandleProps)}
                  sx={() => ({
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  })}
                >
                  {filter ? <X size={18} /> : <GripVertical size={18} />}
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    value={item.website}
                    readOnly
                    icon={<World size={16} />}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    value={item.user}
                    readOnly
                    icon={<Id size={16} />}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <PasswordInput
                    value={item.password}
                    readOnly
                    icon={<Lock size={16} />}
                  />
                </Grid.Col>
                <Grid.Col
                  span={2}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <ActionIcon
                    color="blue"
                    variant="filled"
                    onClick={() => {
                      setWebsitePassword({
                        website: item.website,
                        password: item.password,
                        user: item.user,
                      });
                      setOpen(true);
                    }}
                  >
                    <Edit size={16} />
                  </ActionIcon>
                </Grid.Col>
                <Grid.Col
                  span={2}
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <ActionIcon
                    color="red"
                    variant="filled"
                    onClick={removeHandler}
                  >
                    <Trash size={16} />
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            </Group>
          )}
        </Draggable>

        <ModalWindow
          open={open}
          onClose={() => setOpen(false)}
          id={item.id}
          refetch={refetch}
        />
      </>
    );
  }
);
