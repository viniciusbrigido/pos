package br.com.cargidoso.medmap.service.impl;

import br.com.cargidoso.medmap.dto.appointment.*;
import br.com.cargidoso.medmap.dto.revenue.RevenuePersistDTO;
import br.com.cargidoso.medmap.entity.Appointment;
import br.com.cargidoso.medmap.entity.User;
import br.com.cargidoso.medmap.exception.BusinessException;
import br.com.cargidoso.medmap.exception.NotFoundEntityException;
import br.com.cargidoso.medmap.repository.AppointmentRepository;
import br.com.cargidoso.medmap.service.*;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AppointmentServiceImpl implements AppointmentService {

    private AppointmentTypeService appointmentTypeService;
    private UserService userService;
    private RevenueService revenueService;
    private AppointmentRepository repository;
    private ModelMapper modelMapper;
    private AuthService authService;

    @Override
    public AppointmentResponseDTO create(String authHeader, AppointmentPersistDTO appointmentPersistDTO) {
        String token = authHeader.replace("Bearer ", "");
        UUID userId = authService.getUserFromToken(token).getId();
        return create(userId, appointmentPersistDTO);
    }

    @Override
    public AppointmentResponseDTO create(UUID userId, AppointmentPersistDTO appointmentPersistDTO) {
        Appointment appointment = prepareAppointment(userId, appointmentPersistDTO);
        Appointment persistedAppointment = repository.save(appointment);
        saveRevenue(persistedAppointment);
        return toResponseDTO(persistedAppointment);
    }

    private Appointment prepareAppointment(UUID userId, AppointmentPersistDTO dto) {
        Appointment appointment = modelMapper.map(dto, Appointment.class);
        appointment.setUser(userService.findById(userId));
        appointment.setUserPatient(userService.findById(dto.getUserPatientId()));
        appointment.setAppointmentType(appointmentTypeService.findById(dto.getAppointmentTypeId()));
        appointment.setId(null);
        return appointment;
    }

    private void saveRevenue(Appointment appointment) {
        RevenuePersistDTO revenuePersistDTO = RevenuePersistDTO.builder()
                .appointmentId(appointment.getId())
                .price(appointment.getPrice())
                .date(appointment.getDate())
                .build();
        revenueService.create(revenuePersistDTO);
    }

    @Override
    public Appointment findById(UUID id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundEntityException("Atendimento não encontrado."));
    }

    @Override
    public AppointmentResponseDTO findByIdDTO(UUID id) {
        return toResponseDTO(findById(id));
    }

    @Override
    public AppointmentResponseDTO pay(UUID id) {
        Appointment appointment = findById(id);
        appointment.pay();
        return toResponseDTO(repository.save(appointment));
    }

    @Override
    public void delete(UUID id) {
        Appointment appointment = findById(id);
        if (appointment.isClosed()) {
            throw new BusinessException("Pagamento já efetuado. Não é possível excluir.");
        }
        repository.deleteById(id);
    }

    @Override
    public List<AppointmentResponseDTO> findAllFilter(String authHeader, AppointmentFilterDTO filter) {
        String token = authHeader.replace("Bearer ", "");
        filter.setUser(authService.getUserFromToken(token));

        return repository.findAllFilter(filter)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    private AppointmentResponseDTO toResponseDTO(Appointment appointment) {
        return modelMapper.map(appointment, AppointmentResponseDTO.class);
    }
}
