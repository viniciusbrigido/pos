package br.com.cargidoso.medmap.service;

import java.util.List;

import br.com.cargidoso.medmap.dto.appointment_type.*;
import br.com.cargidoso.medmap.entity.*;
import java.util.UUID;

public interface AppointmentTypeService {

	AppointmentTypeResponseDTO create(AppointmentTypePersistDTO appointmentTypePersistDTO);
	AppointmentType findById(UUID id);
	AppointmentTypeResponseDTO findByIdDTO(UUID id);
	AppointmentTypeResponseDTO update(UUID id, AppointmentTypeUpdateDTO appointmentTypeUpdateDTO);
	void delete(UUID id);
	List<AppointmentTypeResponseDTO> findAll();
}