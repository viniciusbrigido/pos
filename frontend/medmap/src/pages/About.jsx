import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export default function About() {
  return (
    <Box maxW="4xl" mx="auto" p={8} bg="white" boxShadow="md" borderRadius="xl">
      <VStack align="start" spacing={6}>
        <Heading as="h1" size="xl" color="blue.600">
          Sobre o MedMap
        </Heading>

        <Text fontSize="md" color="gray.700">
          O <strong>MedMap</strong> é uma plataforma desenvolvida para facilitar a gestão de pacientes e o acompanhamento médico em clínicas e hospitais.
          Nossa missão é simplificar o dia a dia dos profissionais de saúde, promovendo mais eficiência e qualidade no atendimento.
        </Text>

        <Text fontSize="md" color="gray.700">
          Este sistema foi criado com foco em usabilidade, segurança e flexibilidade. Estamos constantemente trabalhando em novas funcionalidades e melhorias.
        </Text>

        <Heading as="h2" size="md" pt={4}>
          Equipe de Desenvolvimento
        </Heading>

        <Text fontSize="md" color="gray.700">
          O projeto foi idealizado e desenvolvido por uma equipe dedicada de desenvolvedores apaixonados por tecnologia e saúde digital.
        </Text>

        <Text fontSize="sm" color="gray.500" pt={6}>
          &copy; {new Date().getFullYear()} MedMap - Todos os direitos reservados.
        </Text>
      </VStack>
    </Box>
  );
}
