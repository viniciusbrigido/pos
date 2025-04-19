import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  Button,
  Dialog,
  Portal,
  useDisclosure
} from '@chakra-ui/react';
import {
  getAllAppointments
} from '../services/appointmentService';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import Appointment from './Appointment';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Home() {

  const { userType } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);

  const [filterDate, setFilterDate] = useState('');

  const { onClose } = useDisclosure();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    getAllAppointments({}).then((response) => {
      setAppointments(Array.isArray(response.data) ? response.data : []);
    });
  }

  const handleOpen = (info) => {
    if (userType !== 'USER') return;
    setFilterDate(info.dateStr);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFilterDate('');
    loadAppointments();
    onClose();
  }

  return (
    <Box bg="white" p={4} rounded="md" boxShadow="md">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dateClick={handleOpen}
        events={appointments.map((appointment) => ({
            title: appointment.userPatient.name,
            date: appointment.date
        }))}
        locale="pt-br"
        locales={[ptBrLocale]}
        height="auto"
      />
      <Dialog.Root open={open} >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content style={{ width: '700px', maxWidth: '800px' }}>
              <Dialog.Body p={4}>
                <Appointment dateProp={filterDate}/>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="ghost" onClick={handleClose}>Cancelar</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
