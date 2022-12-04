import { useCallback, useEffect, useState } from 'react';
import { Stack, Text } from '@mantine/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { PasswordWithId } from './DashBoard.types';
import { ListHeaders } from './ListHeaders';
import { DashBoardHeader } from './DashBoardHeader';
import { PasswordItem } from './PasswordItem';
import { usePasswordService } from '../../hooks/usePasswordService';

export const DashBoard = (): JSX.Element => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState<PasswordWithId[]>([]);
  const [filter, setFilter] = useState('');
  const { get, remove } = usePasswordService();

  const getHandler = useCallback(async () => {
    const data = await get();
    const dataWithId = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as PasswordWithId[];
    setPasswords(dataWithId);
  }, [get]);

  const removeHandler = useCallback(
    async (id: string) => {
      await remove(id);
      getHandler();
    },
    [getHandler, remove]
  );

  useEffect(() => {
    getHandler();
    console.log('first');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleOnDragEnd = (result: {
    from?: number;
    to?: number;
    destination?: any;
    source?: any;
  }): void => {
    if (!result.destination) return;
    const items = Array.from(passwords);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setPasswords(items);
  };

  const fields = passwords
    .filter((item: PasswordWithId) => {
      return item.website.includes(filter) || item.user.includes(filter);
    })
    .map((item: PasswordWithId, index: number) => (
      <PasswordItem
        item={item}
        index={index}
        key={item.id}
        filter={filter}
        removeHandler={() => removeHandler(item.id)}
        refetch={() => getHandler()}
      />
    ));

  return (
    <>
      <Stack mt="xl" mx="auto">
        <DashBoardHeader
          setFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
          refetch={() => getHandler()}
        />

        {fields.length > 0 ? (
          <ListHeaders />
        ) : (
          <Text mt="xl" align="center">
            You don't have any password yet. Click the button to add.
          </Text>
        )}

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div
                id="dnd-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fields}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Stack>
    </>
  );
};
