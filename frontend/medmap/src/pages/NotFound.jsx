import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box textAlign="center" py={20} px={6}>
      <Heading display="inline-block" as="h1" size="2xl" bgGradient="linear(to-r, teal.400, teal.600)" backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Página não encontrada
      </Text>
      <Text color={"gray.500"} mb={6}>
        A página que você está procurando não existe ou foi movida.
      </Text>

      <Link to="/">
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Voltar para o início
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
