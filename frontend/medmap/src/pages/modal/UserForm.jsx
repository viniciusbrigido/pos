import {
  Field,
  Input,
  HStack,
  VStack,
  Accordion,
  Span,
  Text, Button
} from '@chakra-ui/react';
import { withMask } from 'use-mask-input';
import { useEffect, useRef, useState } from 'react';
import { onlyNumbers, parseInternalServerErrorToToast, showSuccessToast } from '../../lib/utils.js';
import { createUser, updateUser } from '../../services/userService.js';
import { Toaster, toaster } from '../../components/ui/toaster.jsx';
import { getAddressByZipCode } from '../../services/viaCepService.js';

export default function UserForm({
  user,
  changePassword,
  onCancel,
  onSave,
  userType,
  entityLabel
}) {

  useEffect(() => {
    if (user) {
      loadUser();
    }

  }, [user, changePassword, onCancel, onSave]);

  const cpfRef = useRef(null);
  const phoneRef = useRef(null);
  const zipCodeRef = useRef(null);

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [number, setNumber] = useState('');

  const [errors, setErrors] = useState({});

  const loadUser = () => {
    if (!user) {
      return;
    }
    setName(user.name || '');
    setCpf(user.cpf || '');
    setPhone(user.phone || '');
    setEmail(user.email || '');
    setZipCode(user.address?.zipCode || '');
    setStreet(user.address?.street || '');
    setNeighborhood(user.address?.neighborhood || '');
    setCity(user.address?.city || '');
    setNumber(user.address?.number || '');
  }

  const handleZipCodeChange = (value) => {
    const cleanZipCode = onlyNumbers(value);
    setZipCode(cleanZipCode);

    if (cleanZipCode.length === 8) {
      getAddressByZipCode(cleanZipCode)
        .then((response) => {
          const data = response.data;
          setStreet(data.logradouro || '');
          setNeighborhood(data.bairro || '');
          setCity(data.localidade && data.uf ? `${data.localidade}/${data.uf}` : '');
        })
        .catch(() => {
          setStreet('');
          setNeighborhood('');
          setCity('');
        });
    }
  };

  const onSuccessCreateOrUpdate = () => {
    loadUser();
    setErrors({});
    onSave?.();
  }

  const handleAdd = async () => {
    const userSaved = {
      name,
      cpf: onlyNumbers(cpf),
      phone: onlyNumbers(phone),
      email,
      userType: user?.id ? user.userType : userType,
      password: user?.id ? user.password : password,
      address: {
        zipCode: onlyNumbers(zipCode),
        street,
        neighborhood,
        city,
        number
      }
    };

    const request = user
      ? updateUser(user?.id, userSaved)
      : createUser(userSaved);

    try {
      await request;
      onSuccessCreateOrUpdate();
      showSuccessToast(toaster, entityLabel, user?.id, 'm');
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      }
      parseInternalServerErrorToToast(toaster, error, `Erro ao cadastrar/alterar ${entityLabel}.`);
    }
  };

  return (
    <VStack spacing={4}>
      <Toaster />
      <Field.Root required width="450px">
        <Field.Label>Nome*</Field.Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <Text color="red.500" fontSize="sm">{errors.name}</Text>}
      </Field.Root>

      <HStack width="450px">
        <Field.Root required width="225px" isInvalid={!!errors.cpf}>
          <Field.Label>CPF*</Field.Label>
          <Input
            ref={withMask("999.999.999-99", cpfRef)}
            value={cpf}
            disabled={user?.id}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
          />
          {errors.cpf && <Text color="red.500" fontSize="sm">{errors.cpf}</Text>}
        </Field.Root>


        <Field.Root required width="225px" isInvalid={!!errors.phone}>
          <Field.Label>Fone*</Field.Label>
          <Input
            ref={withMask("(99) 99999-9999", phoneRef)}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(99) 99999-9999"
          />
          {errors.phone && <Text color="red.500" fontSize="sm">{errors.phone}</Text>}
        </Field.Root>
      </HStack>

      <Field.Root required width="450px" isInvalid={!!errors.email}>
        <Field.Label>E-mail*</Field.Label>
        <Input
          type="email"
          disabled={user?.id}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
      </Field.Root>

      {changePassword && (
        <Field.Root required width="450px">
          <Field.Label>Senha*</Field.Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
        </Field.Root>
      )}

      <Accordion.Root collapsible defaultValue={["b"]} width="450px">
        <Accordion.Item>
          <Accordion.ItemTrigger>
            <Span flex="1">Endereço</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <VStack spacing={4}>
                <HStack width="450px">
                  <Field.Root required width="150px">
                    <Field.Label>CEP</Field.Label>
                    <Input
                      ref={withMask("99999-999", zipCodeRef)}
                      value={zipCode}
                      onChange={(e) => handleZipCodeChange(e.target.value)}
                      placeholder="Digite o CEP"
                    />
                    {errors.zipCode && <Text color="red.500" fontSize="sm">{errors.zipCode}</Text>}
                  </Field.Root>

                  <Field.Root required width="100%">
                    <Field.Label>Rua</Field.Label>
                    <Input value={street} onChange={(e) => setStreet(e.target.value)} />
                  </Field.Root>
                </HStack>

                <HStack width="450px">
                  <Field.Root required width="100%">
                    <Field.Label>Bairro</Field.Label>
                    <Input value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                  </Field.Root>

                  <Field.Root required width="100%">
                    <Field.Label>Cidade</Field.Label>
                    <Input value={city} onChange={(e) => setCity(e.target.value)} />
                  </Field.Root>

                  <Field.Root required width="100%">
                    <Field.Label>Número</Field.Label>
                    <Input value={number} onChange={(e) => setNumber(e.target.value)} />
                  </Field.Root>
                </HStack>
              </VStack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
      <HStack width="450px" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={handleAdd}>
          Salvar
        </Button>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </HStack>
    </VStack>
  );
}
