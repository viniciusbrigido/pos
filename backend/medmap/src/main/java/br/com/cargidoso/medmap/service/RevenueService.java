package br.com.cargidoso.medmap.service;

import java.util.List;
import br.com.cargidoso.medmap.dto.revenue.*;
import br.com.cargidoso.medmap.entity.*;
import java.util.UUID;

public interface RevenueService {

	RevenueResponseDTO create(RevenuePersistDTO revenuePersistDTO);
	Revenue findById(UUID id);
	RevenueResponseDTO findByIdDTO(UUID id);
	void delete(UUID id);
	List<RevenueResponseDTO> findAllFilter(RevenueFilterDTO filter);
}