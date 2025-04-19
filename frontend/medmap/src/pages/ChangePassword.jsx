import { useState } from 'react';
import { Box, Input, Button, Heading, VStack, Field, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toaster } from '../components/ui/toaster';
import { changePassword as changePasswordService } from '../services/authService';
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
  const [errors, setErrors] = useState({});

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { changeFirstAccess } = useAuth();
  const navigate = useNavigate();

  const handleChange = async () => {
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      toaster.create({
        type: 'error',
        title: 'Erro ao trocar de senha',
        description: 'As Senhas não conferem.',
      });
      return;
    }

    const changePasswordModel = {
      password,
      passwordConfirmation
    };

    changePasswordService(changePasswordModel).then((response) => {
      if (response) {
        changeFirstAccess();
        navigate('/about');
      }
    })
    .catch((error) => {
        if (error.response?.status === 400) {
          setErrors(error.response.data);
        }
        if (error.response?.status === 500) {
          toaster.create({
            type: 'error',
            title: 'Erro ao trocar de senha',
            description: error.response.data.message
          });
        }
    });
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Toaster />
      <Box bg="white" p={8} rounded="lg" boxShadow="lg" w="400px">
        <VStack spacing={4}>
          <Heading size="md">Troca de Senha</Heading>

          <Box bg="blue.50" p={4} borderRadius="md">
            <Heading size="md" color="blue.600">Primeiro Acesso</Heading>
            <Text fontSize="sm" color="gray.700" mt={2}>
              Como este é seu primeiro acesso, por segurança, solicitamos que você defina uma nova senha de acesso.
              Escolha uma senha forte e que você consiga lembrar.
            </Text>
          </Box>

          <Field.Root
             required
             width="370px"
          >
            <Field.Label>Senha*</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
          </Field.Root>

          <Field.Root
             required
             width="370px"
          >
            <Field.Label>Confirmação da Senha*</Field.Label>
            <Input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {errors.passwordConfirmation && <Text color="red.500" fontSize="sm">{errors.passwordConfirmation}</Text>}
          </Field.Root>

          <Button colorScheme="blue" w="full" onClick={handleChange}>
            Trocar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
