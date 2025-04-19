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
  NumberInput,
  Field
} from '@chakra-ui/react';
import {
    getAllAppointmentTypes,
    createAppointmentType,
    deleteAppointmentType,
    updateAppointmentType
} from '../services/appointmentTypeService';
import { Toaster, toaster } from '../components/ui/toaster';
import { formatToBRL, parseInternalServerErrorToToast, showSuccessToast } from '../lib/utils';

export default function AppointmentType() {

  useEffect(() => {
    loadAppointmentTypes();
  }, []);

  const [errors, setErrors] = useState({});
  const { onClose } = useDisclosure();

  const [idEdit, setIdEdit] = useState('');
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');
  const [defaultDuration, setDefaultDuration] = useState('');

  const [appointmentTypes, setAppointmentTypes] = useState([]);

  const loadAppointmentTypes = () => {
    getAllAppointmentTypes().then((response) => {
      setAppointmentTypes(Array.isArray(response.data) ? response.data : []);
    });
  }

  const handleAdd = async () => {
    const appointmentType = {
      description,
      defaultPrice,
      defaultDuration
    };

    const request = idEdit
      ? updateAppointmentType(idEdit, appointmentType)
      : createAppointmentType(appointmentType);

    try {
      await request;
      onSuccessCreateOrUpdate();
      showSuccessToast(toaster, 'Tipo de Atendimento', idEdit, false, 'm');
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      }
      parseInternalServerErrorToToast(toaster, error, 'Erro ao cadastrar/alterar o Tipo de Atendimento.');
    }
  };

  const onSuccessCreateOrUpdate = () => {
      loadAppointmentTypes();
      handleClose();
      setErrors({});
  }

  const handleClose = () => {
    setIdEdit('');
    setDescription('');
    setDefaultPrice('');
    setDefaultDuration('');
    setOpen(false);
    onClose();
  }

  const handleEdit = (item) => {
    setIdEdit(item.id);
    setOpen(true);
    setDescription(item.description);
    setDefaultPrice(item.defaultPrice);
    setDefaultDuration(item.defaultDuration);
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      deleteAppointmentType(id)
        .then(() => loadAppointmentTypes())
        .catch((error) => {
          parseInternalServerErrorToToast(toaster, error, 'Erro ao excluir o Tipo de Atendimento.');
        });
    }
  };

  return (
    <Box>
      <Toaster />
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">Tipos de Atendimento</Text>
        <Button colorScheme="blue" onClick={() => setOpen(true)}>Novo Tipo de Atendimento</Button>
      </Box>

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Descrição</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Preço Padrão</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Duração Padrão (min)</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Editar</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Excluir</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {appointmentTypes.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell textAlign="end">{formatToBRL(item.defaultPrice)}</Table.Cell>
              <Table.Cell textAlign="end">{item.defaultDuration}</Table.Cell>
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
                <Dialog.Title>Novo Tipo de Atendimento</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack spacing={4}>

                  <Field.Root>
                    <Field.Label>Descrição*</Field.Label>
                    <Input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      width="450px"
                    />
                    {errors.description && <Text color="red.500" fontSize="sm">{errors.description}</Text>}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Preço Padrão (R$)*</Field.Label>
                    <NumberInput.Root
                      required
                      width="450px"
                      value={defaultPrice}
                      onChange={(e) => setDefaultPrice(e.target.value)}
                    >
                      <NumberInput.Input />
                      {errors.defaultPrice && <Text color="red.500" fontSize="sm">{errors.defaultPrice}</Text>}
                    </NumberInput.Root>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Duração Padrão (min)*</Field.Label>
                    <NumberInput.Root
                      required
                      width="450px"
                      value={defaultDuration}
                      onChange={(e) => setDefaultDuration(e.target.value)}
                      onKeyDown={(e) => {
                          if (e.key === ',' || e.key === '.') {
                            e.preventDefault();
                          }
                        }}
                    >
                      <NumberInput.Input />
                      {errors.defaultDuration && <Text color="red.500" fontSize="sm">{errors.defaultDuration}</Text>}
                    </NumberInput.Root>
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