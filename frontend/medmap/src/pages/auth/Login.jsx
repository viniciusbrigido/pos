import { useState } from 'react';
import { Box, Input, Button, Heading, VStack, Text, Field } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Toaster, toaster } from '../../components/ui/toaster';
import { parseInternalServerErrorToToast } from '../../lib/utils';

export default function Login() {
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async () => {
    const loginResponse = await login(email, password);
    if (loginResponse.success) {
      if (loginResponse.firstAccess) {
        navigate('/change-password');
      } else {
        navigate('/about');
      }
      return;
    }
    if (loginResponse.response?.status === 400) {
       setErrors(loginResponse.response.data);
    }
    parseInternalServerErrorToToast(toaster, loginResponse, 'Erro ao Logar.');
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
          <Heading size="md">Login</Heading>

          <Field.Root
             required
             width="370px"
          >
            <Field.Label>E-mail*</Field.Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
          </Field.Root>

          <Field.Root
             required
             width="370px"
          >
            <Field.Label>Confirmação da Senha*</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
          </Field.Root>

          <Button colorScheme="blue" w="full" onClick={handleLogin}>
            Entrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
