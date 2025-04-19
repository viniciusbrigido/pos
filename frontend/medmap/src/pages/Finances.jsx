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
  Tabs,
  Grid,
  Flex,
  NativeSelect
} from '@chakra-ui/react';
import { withMask } from 'use-mask-input';
import {
  getAllExpenses,
  createExpense,
  payExpense
} from '../services/expenseService';
import {
    getAllExpenseTypes
} from '../services/expenseTypeService';
import {
  getAllRevenues
} from '../services/revenueService';
import {
  payAppointment
} from '../services/appointmentService';
import { Toaster, toaster } from '../components/ui/toaster';
import {
  parseDateFromString,
  formatPaymentStatus,
  formatToBRL,
  formatDate,
  showSuccessToast,
  parseInternalServerErrorToToast
} from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Finances() {

  useEffect(() => {
    load();
    loadExpenseTypes();
  }, []);

  const navigate = useNavigate();

  const initDateRef = useRef(null);
  const finalDateRef = useRef(null);

  const [errors, setErrors] = useState({});
  const { onClose } = useDisclosure();

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  const [initDate, setInitDate] = useState('');
  const [finalDate, setFinalDate] = useState('');

  const [expenses, setExpenses] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);

  const [expenseType, setExpenseType] = useState('');

  const load = () => {
    loadExpenses();
    loadRevenues();
  }

  const loadExpenses = () => {
    getAllExpenses(
        {
            initDate: parseDateFromString(initDate),
            finalDate: parseDateFromString(finalDate)
        }
    ).then((response) => {
      setExpenses(Array.isArray(response.data) ? response.data : []);
    });
  }

  const loadExpenseTypes = () => {
      getAllExpenseTypes().then((response) => {
          setExpenseTypes(Array.isArray(response.data) ? response.data : []);
      });
  }

  const loadRevenues = () => {
    getAllRevenues(
        {
            initDate: parseDateFromString(initDate),
            finalDate: parseDateFromString(finalDate),
        }
    ).then((response) => {
      setRevenues(Array.isArray(response.data) ? response.data : []);
    });
  }

  const handleAdd = async () => {
    const expense = {
      expenseTypeId: expenseType,
      description,
      price,
      expenseDate: parseDateFromString(expenseDate)
    };

    try {
      await createExpense(expense);
      onSuccessCreateOrUpdate();
      showSuccessToast(toaster, 'Despesa', false, 'f');
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      }
      parseInternalServerErrorToToast(toaster, error, 'Erro ao cadastrar/alterar Despesa.');
    }
  };

  const onSuccessCreateOrUpdate = () => {
    loadExpenses();
    handleClose();
  }

  const handleOpen = () => {
    if (!expenseTypes) {
      if (confirm('Não há Tipos de Despesa cadastrados. Gostaria de cadastrar?')) {
        navigate('/expense-type');
      }
      return;
    }
    setOpen(true);
    setExpenseType(expenseTypes[0]?.id);
  }

  const handleClose = () => {
    setDescription('');
    setPrice('');
    setExpenseDate('');
    setOpen(false);
    setErrors({});
    onClose();
  }

  const handlePayExpense = (id) => {
    if (confirm('Tem certeza que deseja pagar?')) {
      payExpense(id).then(() => loadExpenses());
    }
  }

  const handlePayAppointment = (id) => {
    if (confirm('Tem certeza que deseja pagar?')) {
      payAppointment(id).then(() => loadRevenues());
    }
  }

  return (
    <Box>
      <Toaster />

      <Text fontSize="xl" fontWeight="bold" mb={5} >Finanças</Text>

      <Field.Root required width="100%" isInvalid={!!errors.initDate}>
        <Grid templateColumns="1fr 1fr" gap={5}>
          <Box display="flex" flexDirection="column">
            <Field.Label>Data Início</Field.Label>
            <Input
              placeholder="00/00/0000"
              ref={withMask("99/99/9999", initDateRef)}
              value={initDate}
              onChange={(e) => setInitDate(e.target.value)}
            />
            {errors.initDate && (
              <Text color="red.500" fontSize="sm">{errors.initDate}</Text>
            )}
          </Box>

          <Box display="flex" flexDirection="column">
            <Field.Label>Data Final</Field.Label>
            <Input
              placeholder="00/00/0000"
              ref={withMask("99/99/9999", finalDateRef)}
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
            />
            {errors.finalDate && (
              <Text color="red.500" fontSize="sm">{errors.finalDate}</Text>
            )}
          </Box>
        </Grid>

      </Field.Root>

      <Flex justify="flex-end" mt={4}>
        <Button colorScheme="blue" onClick={load}>Buscar</Button>
      </Flex>

      <Tabs.Root defaultValue="receitas">
        <Tabs.List>
          <Tabs.Trigger value="receitas">
            Receitas
          </Tabs.Trigger>
          <Tabs.Trigger value="despesas">
            Despesas
          </Tabs.Trigger>
        </Tabs.List>


        <Tabs.Content value="despesas">
          <Box display="flex" mb={4} justifyContent="flex-end">
            <Button colorScheme="blue"  onClick={handleOpen}>Nova Despesa</Button>
          </Box>
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader textAlign="start">Descrição</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="start">Tipo de Despesa</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Data</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Status</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Pagar</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {expenses.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell textAlign="start">{item.description}</Table.Cell>
                  <Table.Cell textAlign="start">{item.expenseType.description}</Table.Cell>
                  <Table.Cell textAlign="center">{formatDate(item.date)}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <span
                    style={{
                      backgroundColor: item.paymentStatus === 'CLOSED' ? 'lightgreen' : 'yellow',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                    }}>
                  {formatPaymentStatus(item.paymentStatus)}</span></Table.Cell>
                  <Table.Cell textAlign="center">
                    {item.paymentStatus === 'CLOSED' ? (
                      <span title="Pago">✔</span>
                    ) : (
                      <button onClick={() => handlePayExpense(item.id)} style={{ cursor: 'pointer' }} title="Pagar">
                        💳
                      </button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Tabs.Content>

        <Tabs.Content value="receitas">
        <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Paciente</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Valor</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Data</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Status</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Pagar</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {revenues.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.appointment.user.name}</Table.Cell>
                  <Table.Cell textAlign="end">{formatToBRL(item.price)}</Table.Cell>
                  <Table.Cell textAlign="center">{formatDate(item.date)}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <span
                      style={{
                        backgroundColor: item.appointment.paymentStatus === 'CLOSED' ? 'lightgreen' : 'yellow',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                      }}
                    >
                      {formatPaymentStatus(item.appointment.paymentStatus)}
                    </span>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {item.appointment.paymentStatus === 'CLOSED' ? (
                      <span title="Pago">✔</span>
                    ) : (
                      <button onClick={() => handlePayAppointment(item.appointment.id)} style={{ cursor: 'pointer' }} title="Pagar">
                        💳
                      </button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Tabs.Content>
      </Tabs.Root>


      <Dialog.Root open={open} >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Nova despesa</Dialog.Title>
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
                      <Field.Label>Tipo de Despesa*</Field.Label>
                      <NativeSelect.Root>
                          <NativeSelect.Field
                              value={expenseType}
                              onChange={(e) => setExpenseType(e.target.value)}
                          >
                              {expenseTypes.map((item) => (
                                  <option key={item.id} value={item.id}>
                                      {item.description}
                                  </option>
                              ))}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                      </NativeSelect.Root>
                  </Field.Root>

                  <Field.Root width="450px">
                    <Field.Label>Preço (R$)*</Field.Label>
                    <NumberInput.Root
                      required
                      width="450px"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <NumberInput.Input />
                      {errors.price && <Text color="red.500" fontSize="sm">{errors.price}</Text>}
                    </NumberInput.Root>
                  </Field.Root>

                  <Field.Root
                    required
                    width="450px"
                  >
                    <Field.Label>Data*</Field.Label>
                    <Input
                      placeholder="00/00/0000"
                      ref={withMask("99/99/9999", finalDateRef)}
                      value={expenseDate}
                      onChange={(e) => setExpenseDate(e.target.value)}
                    />
                    {errors.expenseDate && <Text color="red.500" fontSize="sm">{errors.expenseDate}</Text>}
                  </Field.Root>

                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="ghost" onClick={handleClose}>Cancelar</Button>
                <Button colorScheme="blue" onClick={handleAdd}>Salvar</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton position="absolute" top={2} right={2} onClick={handleClose} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
