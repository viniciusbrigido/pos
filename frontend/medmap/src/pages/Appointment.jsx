import { useState, useEffect, useRef } from 'react';
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
  Field,
  NativeSelect,
  Checkbox
} from '@chakra-ui/react';
import {
    getAllAppointments,
    createAppointment,
    deleteAppointment
} from '../services/appointmentService';
import { withMask } from 'use-mask-input';
import {
    getAllUsers
} from '../services/userService';
import {
    getAllAppointmentTypes
} from '../services/appointmentTypeService';
import { Toaster, toaster } from '../components/ui/toaster';
import {
  parseInternalServerErrorToToast,
  formatToBRL,
  parseDateTimeFromString,
  formatDateTime,
  showSuccessToast
} from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Appointment({ dateProp }) {

  useEffect(() => {
    loadAppointments(dateProp);
    loadUsers();
    loadAppointmentTypes();
  }, [dateProp]);

  const navigate = useNavigate();
  const { userType } = useAuth();

  const initDateRef = useRef(null);

  const [errors, setErrors] = useState({});
  const { onClose } = useDisclosure();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [recurrenceCount, setRecurrenceCount] = useState('');

  const [user, setUser] = useState([]);
  const [appointmentType, setAppointmentType] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);

  const loadAppointments = (filterDate) => {
    getAllAppointments(
      { date: filterDate ? `${filterDate}T00:00:00` : null }
    ).then((response) => {
      setAppointments(Array.isArray(response.data) ? response.data : []);
    });
  }

  const loadUsers = () => {
    getAllUsers().then((response) => {
      setUsers(Array.isArray(response.data) ? response.data : []);
    });
  }

  const loadAppointmentTypes = () => {
    getAllAppointmentTypes().then((response) => {
      setAppointmentTypes(Array.isArray(response.data) ? response.data : []);
    });
  }

  const handleAdd = async () => {
    const appointment = {
      userPatientId: user,
      appointmentTypeId: appointmentType,
      date: parseDateTimeFromString(date),
      duration,
      price,
      recurring,
      recurrenceCount
    };

    try {
      await createAppointment(appointment);
      onSuccessCreateOrUpdate();
      showSuccessToast(toaster, 'Atendimento', false, 'm');
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      }
      parseInternalServerErrorToToast(toaster, error, 'Erro ao cadastrar/alterar Atendimento.');
    }
  };

  const onSuccessCreateOrUpdate = () => {
      loadAppointments({});
      handleClose();
      setErrors({});
  }

  const handleOpen = () => {
    if (!appointmentTypes.length) {
      if (confirm('Não há Tipos de Atendimento cadastrados. Gostaria de cadastrar?')) {
        navigate('/appointment-type');
      }
      return;
    }
    if (!users.length && userType === 'ADMIN') {
      if (confirm('Não há Usuários cadastrados. Gostaria de cadastrar?')) {
        navigate('/user');
      }
      return;
    }

    setOpen(true);
    setDate(formatDateTime(new Date()));
    setAppointmentType(appointmentTypes[0]?.id);
    setUser(users[0]?.id);
  }

  const handleClose = () => {
    setDate('');
    setDuration('');
    setPrice('');
    setRecurring(false);
    setRecurrenceCount('');
    setOpen(false);
    onClose();
    loadAppointments(dateProp);
  }

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      deleteAppointment(id)
        .then(() => loadAppointments({}))
        .catch((error) => {
          parseInternalServerErrorToToast(toaster, error, 'Erro ao excluir Atendimento.');
        });
    }
  };

  return (
    <Box>
      <Toaster />
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">Atendimento</Text>
        <Button colorScheme="blue" onClick={handleOpen}>Novo Atendimento</Button>
      </Box>

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Paciente</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Preço</Table.ColumnHeader>
            <Table.ColumnHeader>Tipo</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Excluir</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {appointments.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.userPatient.name}</Table.Cell>
              <Table.Cell textAlign="end">{formatToBRL(item.price)}</Table.Cell>
              <Table.Cell>{item.appointmentType.description}</Table.Cell>
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
                <Dialog.Title>Novo Atendimento</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack spacing={4}>

                  <Field.Root
                    required
                    width="450px"
                  >
                    <Field.Label>Paciente*</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                      >
                        {users.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>


                  <Field.Root
                    required
                    width="450px"
                  >
                    <Field.Label>Tipo de Atendimento*</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={appointmentType}
                        onChange={(e) => setAppointmentType(e.target.value)}
                      >
                        {appointmentTypes.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.description}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>


                  <Field.Root
                    required
                    width="450px"
                  >
                    <Field.Label>Data*</Field.Label>
                    <Input
                      placeholder="00/00/0000 00:00"
                      ref={withMask("99/99/9999 99:99", initDateRef)}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && <Text color="red.500" fontSize="sm">{errors.date}</Text>}
                  </Field.Root>


                  <Field.Root width="450px">
                    <Field.Label>Duração (min)*</Field.Label>
                    <NumberInput.Root
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      width="100%"
                    >
                      <NumberInput.Input />
                      {errors.duration && <Text color="red.500" fontSize="sm">{errors.duration}</Text>}
                    </NumberInput.Root>
                  </Field.Root>


                  <Field.Root width="450px">
                    <Field.Label>Preço (R$)*</Field.Label>
                    <NumberInput.Root
                      required
                      width="100%"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <NumberInput.Input />
                      {errors.price && <Text color="red.500" fontSize="sm">{errors.price}</Text>}
                    </NumberInput.Root>
                  </Field.Root>


                  <Checkbox.Root
                    pt={4}
                    width="450px"
                    checked={recurring}
                    onCheckedChange={(e) => setRecurring(e.checked)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Recorrência</Checkbox.Label>
                  </Checkbox.Root>


                  <Field.Root width="450px">
                    <Field.Label>Quantidade de recorrência (dias)*</Field.Label>
                    <NumberInput.Root
                      required
                      width="100%"
                      value={recurrenceCount}
                      onChange={(e) => setRecurrenceCount(e.target.value)}
                      disabled={!recurring}
                    >
                      <NumberInput.Input />
                      {errors.recurrenceCount && <Text color="red.500" fontSize="sm">{errors.recurrenceCount}</Text>}
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
