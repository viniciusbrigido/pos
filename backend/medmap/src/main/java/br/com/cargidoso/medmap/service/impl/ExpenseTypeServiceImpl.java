package br.com.cargidoso.medmap.service.impl;

import br.com.cargidoso.medmap.dto.expense_type.*;
import br.com.cargidoso.medmap.exception.BusinessException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import br.com.cargidoso.medmap.service.*;
import br.com.cargidoso.medmap.repository.*;
import java.util.List;
import org.modelmapper.ModelMapper;
import br.com.cargidoso.medmap.entity.ExpenseType;
import br.com.cargidoso.medmap.exception.NotFoundEntityException;
import java.util.UUID;

@AllArgsConstructor
@Service
public class ExpenseTypeServiceImpl implements ExpenseTypeService {

	private ExpenseTypeRepository repository;
	private ModelMapper modelMapper;

	@Override
	public ExpenseTypeResponseDTO create(ExpenseTypePersistDTO expenseTypePersistDTO) {
		ExpenseType expenseType = modelMapper.map(expenseTypePersistDTO, ExpenseType.class);
		return toResponseDTO(repository.save(expenseType));
	}

	@Override
	public ExpenseType findById(UUID id) {
		return repository.findById(id).orElseThrow(() -> new NotFoundEntityException("Tipo de Despesa não encontrada."));
	}

	@Override
	public ExpenseTypeResponseDTO findByIdDTO(UUID id) {
		return toResponseDTO(findById(id));
	}

	@Override
	public ExpenseTypeResponseDTO update(UUID id, ExpenseTypeUpdateDTO expenseTypeUpdateDTO) {
		ExpenseType expenseType = findById(id);
		expenseType.update(expenseTypeUpdateDTO);
		return toResponseDTO(repository.save(expenseType));
	}

	@Override
	public void delete(UUID id) {
        if (repository.isExpenseTypeInUse(id)) {
            throw new BusinessException("Já existe uma Despesa com esse Tipo.");
        }
		repository.deleteById(id);
	}

	@Override
	public List<ExpenseTypeResponseDTO> findAll() {
		return repository.findAll()
			.stream()
			.map(this::toResponseDTO)
			.toList();
	}

	private ExpenseTypeResponseDTO toResponseDTO(ExpenseType expenseType) {
		return modelMapper.map(expenseType, ExpenseTypeResponseDTO.class);
	}

}