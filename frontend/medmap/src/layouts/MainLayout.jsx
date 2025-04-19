import {
  Box,
  Flex,
  VStack,
  Text,
  IconButton,
  Button,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const SidebarItem = ({ icon, label, to }) => (
  <Button
    as={Link}
    to={to}
    leftIcon={icon}
    variant='ghost'
    justifyContent='flex-start'
    w='100%'
    borderRadius='md'
    _hover={{ bg: 'gray.100' }}
  >
    {label}
  </Button>
);

export default function MainLayout() {
  const navigate = useNavigate();

  const { userType, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Flex minH="100vh">
      <Box w="250px" bg="gray.50" p={4} borderRight="1px" borderColor="gray.200">
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            MedMap
          </Text>

          <SidebarItem label="Sobre" to="/about" />

          {userType !== 'ADMIN' && (
            <SidebarItem label="Home" to="/home" />
          )}

          {userType === 'USER' && (
            <>
              <SidebarItem label="Tipo de Atendimento" to="/appointment-type" />
              <SidebarItem label="Tipo de Despesa" to="/expense-type" />
              <SidebarItem label="Atendimento" to="/appointment" />
              <SidebarItem label="Finanças" to="/finances" />
              <SidebarItem label="Paciente" to="/patient" />
            </>
          )}

          {userType === 'ADMIN' && (
            <SidebarItem label="Usuário" to="/user" />
          )}

          <SidebarItem label="Perfil" to="/profile" />
        </VStack>
      </Box>

      <Box flex="1">
        <Flex
          as="header"
          bg="white"
          p={4}
          borderBottom="1px"
          borderColor="gray.200"
          align="center"
        >
          <Text fontSize="lg" fontWeight="bold">
            Painel Administrativo
          </Text>
          <Spacer />
          <HStack spacing={2}>
            <IconButton
              aria-label="Sair"
              onClick={handleLogout}
            >
              <FiLogOut />
            </IconButton>
          </HStack>
        </Flex>

        <Box as="main" p={6}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
