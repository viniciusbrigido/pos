package br.com.cargidoso.medmap.service;

import br.com.cargidoso.medmap.dto.appointment.*;
import br.com.cargidoso.medmap.entity.Appointment;
import java.util.List;
import java.util.UUID;

public interface AppointmentService {

    AppointmentResponseDTO create(String authHeader, AppointmentPersistDTO appointmentPersistDTO);
    AppointmentResponseDTO create(UUID userId, AppointmentPersistDTO appointmentPersistDTO);
    Appointment findById(UUID id);
    AppointmentResponseDTO findByIdDTO(UUID id);
    AppointmentResponseDTO pay(UUID id);
    void delete(UUID id);
    List<AppointmentResponseDTO> findAllFilter(String authHeader, AppointmentFilterDTO filter);
}
