package br.com.cargidoso.medmap.service.impl;

import br.com.cargidoso.medmap.dto.revenue.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import br.com.cargidoso.medmap.service.*;
import br.com.cargidoso.medmap.repository.*;
import java.util.List;
import org.modelmapper.ModelMapper;
import br.com.cargidoso.medmap.entity.Revenue;
import br.com.cargidoso.medmap.exception.NotFoundEntityException;
import java.util.UUID;

@AllArgsConstructor
@Service
public class RevenueServiceImpl implements RevenueService {

	private RevenueRepository repository;
	private ModelMapper modelMapper;

	@Override
	public RevenueResponseDTO create(RevenuePersistDTO revenuePersistDTO) {
		Revenue revenue = modelMapper.map(revenuePersistDTO, Revenue.class);
        revenue.setId(null);
		return toResponseDTO(repository.save(revenue));
	}

	@Override
	public Revenue findById(UUID id) {
		return repository.findById(id).orElseThrow(() -> new NotFoundEntityException("Receita não encontrada."));
	}

	@Override
	public RevenueResponseDTO findByIdDTO(UUID id) {
		return toResponseDTO(findById(id));
	}

    @Override
	public void delete(UUID id) {
		repository.deleteById(id);
	}

	@Override
	public List<RevenueResponseDTO> findAllFilter(RevenueFilterDTO filter) {
		return repository.findAllByFilter(filter)
			.stream()
			.map(this::toResponseDTO)
			.toList();
	}

	private RevenueResponseDTO toResponseDTO(Revenue revenue) {
		return modelMapper.map(revenue, RevenueResponseDTO.class);
	}

}