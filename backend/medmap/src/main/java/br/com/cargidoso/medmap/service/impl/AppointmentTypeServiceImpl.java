package br.com.cargidoso.medmap.service.impl;

import br.com.cargidoso.medmap.dto.appointment_type.*;
import br.com.cargidoso.medmap.exception.BusinessException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import br.com.cargidoso.medmap.service.*;
import br.com.cargidoso.medmap.repository.*;
import java.util.List;
import org.modelmapper.ModelMapper;
import br.com.cargidoso.medmap.entity.AppointmentType;
import br.com.cargidoso.medmap.exception.NotFoundEntityException;
import java.util.UUID;

@AllArgsConstructor
@Service
public class AppointmentTypeServiceImpl implements AppointmentTypeService {

	private AppointmentTypeRepository repository;
	private ModelMapper modelMapper;

	@Override
	public AppointmentTypeResponseDTO create(AppointmentTypePersistDTO appointmentTypePersistDTO) {
		AppointmentType appointmentType = modelMapper.map(appointmentTypePersistDTO, AppointmentType.class);
		return toResponseDTO(repository.save(appointmentType));
	}

	@Override
	public AppointmentType findById(UUID id) {
		return repository.findById(id).orElseThrow(() -> new NotFoundEntityException("Tipo de Atendimento não encontrado."));
	}

	@Override
	public AppointmentTypeResponseDTO findByIdDTO(UUID id) {
		return toResponseDTO(findById(id));
	}

	@Override
	public AppointmentTypeResponseDTO update(UUID id, AppointmentTypeUpdateDTO appointmentTypeUpdateDTO) {
		AppointmentType appointmentType = findById(id);
		appointmentType.update(appointmentTypeUpdateDTO);
		return toResponseDTO(repository.save(appointmentType));
	}

	@Override
	public void delete(UUID id) {
        if (repository.isAppointmentTypeInUse(id)) {
            throw new BusinessException("Já existe um Atendimento com esse Tipo.");
        }
		repository.deleteById(id);
	}

	@Override
	public List<AppointmentTypeResponseDTO> findAll() {
		return repository.findAll()
			.stream()
			.map(this::toResponseDTO)
			.toList();
	}

	private AppointmentTypeResponseDTO toResponseDTO(AppointmentType appointmentType) {
		return modelMapper.map(appointmentType, AppointmentTypeResponseDTO.class);
	}

}