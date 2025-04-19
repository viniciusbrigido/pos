import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  useDisclosure,
  Text,
  Table,
  Dialog,
  Portal,
  CloseButton
} from '@chakra-ui/react';
import {
    getAllUsers,
    deleteUser
} from '../services/userService';
import { Toaster, toaster } from '../components/ui/toaster';
import { formatCpf, formatPhone, parseInternalServerErrorToToast } from '../lib/utils';
import UserForm from './modal/UserForm.jsx';

export default function User({
  userType = 'USER',
  entityLabel = 'Usuário'
}) {

  useEffect(() => {
    loadUsers();
  }, []);

  const { onClose } = useDisclosure();
  const [open, setOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const loadUsers = () => {
    getAllUsers().then((response) => {
      setUsers(Array.isArray(response.data) ? response.data : []);
    });
  }

  const onSuccessCreateOrUpdate = () => {
    loadUsers();
    handleClose();
  }

  const handleClose = () => {
    setUser(null)
    setOpen(false);
    onClose();
  }

  const handleEdit = (item) => {
    setUser(item);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      deleteUser(id)
       .then(() => loadUsers())
       .catch((error) => {
         parseInternalServerErrorToToast(toaster, error, `Erro ao excluir ${entityLabel}.`);
       });
    }
  };

  return (
    <Box>
      <Toaster />
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">{entityLabel}s</Text>
        <Button colorScheme="blue" onClick={() => setOpen(true)}>Novo {entityLabel}</Button>
      </Box>

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nome</Table.ColumnHeader>
            <Table.ColumnHeader>CPF</Table.ColumnHeader>
            <Table.ColumnHeader>Fone</Table.ColumnHeader>
            <Table.ColumnHeader>E-mail</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Editar</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Excluir</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{formatCpf(item.cpf)}</Table.Cell>
              <Table.Cell>{formatPhone(item.phone)}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>

              <Table.Cell textAlign="center">
                <button onClick={() => handleEdit(item)} style={{cursor: 'pointer'}}>✏️</button>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <button onClick={() => handleDelete(item.id)} style={{cursor: 'pointer'}}>🗑️</button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Dialog.Root open={open} >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Novo {entityLabel}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <UserForm
                  user={user}
                  changePassword={!user?.id}
                  onCancel={handleClose}
                  onSave={onSuccessCreateOrUpdate}
                  userType={userType}
                  entityLabel={entityLabel}
                />
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton position="absolute" top={2} right={2} onClick={handleClose}/>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
