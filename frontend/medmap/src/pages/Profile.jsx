import { Box, VStack } from '@chakra-ui/react';
import {
  validateToken as validateTokenService
} from '../services/authService';
import { useEffect, useState } from 'react';
import UserForm from './modal/UserForm.jsx';

export default function Profile() {

  const [user, setUser] = useState(null);

  const validateToken = async () => {
    try {
      const response = await validateTokenService();
      setUser(response.data)
    } catch (error) {
      console.error('Erro ao validar token', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    validateToken();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
    >
      <Box
        p={8}
        bg="white"
        boxShadow="md"
        borderRadius="xl"
        width="500px"
      >
        <VStack spacing={4}>
          <UserForm
            onSave={validateToken}
            user={user}
            changeObs={user?.userType === 'PATIENT'}
            changePassword={false}
            entityLabel={'Perfil'}
          />
        </VStack>
      </Box>
    </Box>
  );
}
