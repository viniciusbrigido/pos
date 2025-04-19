import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CloseButton,
  useDisclosure,
  Text,
  Table,
  Dialog,
  VStack,
  Portal,
  Input,
  NativeSelect,
  Field
} from '@chakra-ui/react';
import {
    getAllExpenseTypes,
    createExpenseType,
    deleteExpenseType,
    updateExpenseType
} from '../services/expenseTypeService';
import { Toaster, toaster } from '../components/ui/toaster';
import { frequencyLabels } from '../enumerations/frequencyOptions';
import { parseInternalServerErrorToToast, showSuccessToast } from '../lib/utils';

export default function ExpenseType() {

  useEffect(() => {
    loadExpenseTypes();
  }, []);

  const [errors, setErrors] = useState({});
  const { onClose } = useDisclosure();

  const [idEdit, setIdEdit] = useState('');
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');

  const [expenseTypes, setExpenseTypes] = useState([]);

  const loadExpenseTypes = () => {
    getAllExpenseTypes().then((response) => {
      setExpenseTypes(Array.isArray(response.data) ? response.data : []);
    });
  }

  const handleAdd = async () => {
    const expenseType = {
      description,
      frequency
    };

    const request = idEdit
      ? updateExpenseType(idEdit, expenseType)
      : createExpenseType(expenseType);

    try {
      await request;
      onSuccessCreateOrUpdate();
      showSuccessToast(toaster, 'Tipo de Despesa', idEdit, 'f');
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      }
      parseInternalServerErrorToToast(toaster, error, 'Erro ao cadastrar/alterar Tipo de Despesa.');
    }
  };

  const onSuccessCreateOrUpdate = () => {
      loadExpenseTypes();
      handleClose();
      setErrors({});
  }

  const handleOpen = () => {
      setOpen(true);
      setFrequency('RANDOM');
  }

  const handleClose = () => {
    setIdEdit('');
    setDescription('');
    setFrequency('');
    setOpen(false);
    onClose();
  }

  const handleEdit = (item) => {
    setIdEdit(item.id);
    setOpen(true);
    setDescription(item.description);
    setFrequency(item.frequency);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      deleteExpenseType(id)
       .then(() => loadExpenseTypes())
       .catch((error) => {
         parseInternalServerErrorToToast(toaster, error, 'Erro ao excluir Tipo de Despesa.');
       });
    }
  };

  return (
    <Box>
      <Toaster />
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">Tipos de Despesa</Text>
        <Button colorScheme="blue" onClick={handleOpen}>Novo Tipo de Despesa</Button>
      </Box>

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Descrição</Table.ColumnHeader>
            <Table.ColumnHeader>Frequência</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Editar</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Excluir</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenseTypes.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>
                {frequencyLabels[item.frequency] || item.frequency}
              </Table.Cell>
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
                <Dialog.Title>Novo Tipo de Despesa</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack spacing={4}>

                  <Field.Root
                    required
                    width="450px"
                  >
                    <Field.Label>Descrição*</Field.Label>
                    <Input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <Text color="red.500" fontSize="sm">{errors.description}</Text>}
                  </Field.Root>

                  <Field.Root
                    required
                    width="450px"
                  >
                    <Field.Label>Frequência*</Field.Label>
                    <NativeSelect.Root
                      required
                      width="450px"
                    >
                      <NativeSelect.Field
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                      >
                        {Object.entries(frequencyLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="ghost" onClick={handleClose}>Cancelar</Button>
                <Button colorScheme="blue" onClick={handleAdd}>Salvar</Button>
              </Dialog.Footer>
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
