import { Spinner, Box, Text, VStack } from '@chakra-ui/react';

export default function LoadingSpinner() {
    return (
        <Box
            w="100vw"
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.50"
        >
            <VStack spacing={3}>
                 <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
                <Text color="gray.600">Carregando...</Text>
            </VStack>
        </Box>
    );
}
