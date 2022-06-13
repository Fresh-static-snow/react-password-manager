import { useEffect, useState } from "react";
import {
  Group,
  Text,
  Grid,
  Button,
  ActionIcon,
  PasswordInput,
  Stack,
  TextInput,
  Modal,
} from "@mantine/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Trash,
  Edit,
  GripVertical,
  Search,
  X,
  Id,
  Lock,
  World,
  Plus,
} from "tabler-icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { IDashBoardProps } from "./DashBoard.props";
import PasswordService from "../../services/password.service";
import { useAuth } from "../../hooks/use-auth";
import { IPassword } from "../../models/types";

interface ID extends IPassword {
  id: string;
}

export const DashBoard = ({}: IDashBoardProps): JSX.Element => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { email } = useAuth();
  const [passwordsArray, setPasswordsArray] = useState<ID[] | any>([]);
  const [passwordId, setPasswordId] = useState("");
  const [opened, setOpened] = useState(false);
  const [filter, setFilter] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IPassword>({
    defaultValues: { site: "", name: "", password: "" },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IPassword> = async (newPassword) => {
    if (passwordId !== undefined && passwordId !== "") {
      await PasswordService.updatePassword(passwordId, newPassword, email!);
      setPasswordId("");
      reset();
    } else {
      await PasswordService.addPassword(newPassword, email!);
      reset();
    }
    setOpened(false);
    getPasswords();
  };

  const handleOnDragEnd = (result: {
    from?: number;
    to?: number;
    destination?: any;
    source?: any;
  }): void => {
    if (!result.destination) return;
    const items = Array.from(passwordsArray);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setPasswordsArray(items);
  };

  const getPasswords = async () => {
    const data = await PasswordService.getAllPasswords(email!);
    setPasswordsArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteHandler = async (id: string) => {
    await PasswordService.deletePassword(id, email!);
    getPasswords();
  };

  const getPasswordIdHandler = (id: string) => {
    setPasswordId(id);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        getPasswords();
      } else {
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (passwordId !== undefined && passwordId !== "") {
      (async () => {
        try {
          const docSnap = await PasswordService.getPassword(passwordId, email!);
          reset(docSnap.data());
        } catch (err) {
          alert(err);
        }
      })();
    }
  }, [passwordId]);

  const fields = passwordsArray
    .filter((item: any) => {
      return item?.site.includes(filter) || item.name.includes(filter);
    })
    .map((item: any, index: any) => (
      <Draggable key={item.id} index={index} draggableId={item.site}>
        {(provided) => (
          <Group
            ref={provided.innerRef}
            mt="xs"
            {...(filter ? {} : provided.draggableProps)}
          >
            <Grid sx={{ width: "100%" }} columns={24}>
              <Grid.Col
                span={2}
                {...(filter ? {} : provided.dragHandleProps)}
                sx={() => ({
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                })}
              >
                {filter ? <X size={18} /> : <GripVertical size={18} />}
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  value={item.site}
                  readOnly
                  icon={<World size={16} />}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput value={item.name} readOnly icon={<Id size={16} />} />
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
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ActionIcon
                  color="blue"
                  variant="filled"
                  onClick={() => {
                    getPasswordIdHandler(item.id);
                    setOpened(true);
                  }}
                >
                  <Edit size={16} />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col
                span={2}
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ActionIcon
                  color="red"
                  variant="outline"
                  onClick={() => {
                    deleteHandler(item.id);
                  }}
                >
                  <Trash size={16} />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          </Group>
        )}
      </Draggable>
    ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setPasswordId("");
          reset();
        }}
        title="Enter password!"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              required
              autoComplete="disabled"
              placeholder="https://example.com"
              label="Site"
              icon={<World size={16} />}
              {...register("site")}
              error={!!errors.site && errors.site?.message}
            />
            <TextInput
              required
              autoComplete="disabled"
              placeholder="example@mail.com"
              label="Username"
              icon={<Id size={16} />}
              {...register("name")}
              error={!!errors.name && errors.name?.message}
            />
            <PasswordInput
              required
              autoComplete="disabled"
              placeholder="********"
              label="Password"
              icon={<Lock size={16} />}
              {...register("password")}
              error={!!errors.password && errors.password?.message}
            />
          </Stack>
          <Group position="right" mt="md">
            <Button type="submit" disabled={!isValid}>
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <Stack
        sx={{
          maxWidth: 750,
        }}
        mt="xl"
        mx="auto"
      >
        <Text align="center" weight={"bolder"}>
          Password List
        </Text>
        <Grid mt="md">
          <Grid.Col span={6}>
            <Group>
              <Button
                onClick={() => {
                  setOpened(true);
                }}
                leftIcon={<Plus size={16} />}
              >
                Add
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col
            span={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <TextInput
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              placeholder="Search"
              icon={<Search size={16} />}
              sx={{ maxWidth: "250px" }}
            />
          </Grid.Col>
        </Grid>
        {fields.length > 0 ? (
          <Group mt="xs">
            <Grid sx={{ width: "100%" }} columns={24}>
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
