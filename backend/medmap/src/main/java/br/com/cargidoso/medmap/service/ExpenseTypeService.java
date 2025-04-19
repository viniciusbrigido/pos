package br.com.cargidoso.medmap.service;

import java.util.List;
import br.com.cargidoso.medmap.dto.expense_type.*;
import br.com.cargidoso.medmap.entity.*;
import java.util.UUID;

public interface ExpenseTypeService {

	ExpenseTypeResponseDTO create(ExpenseTypePersistDTO expenseTypePersistDTO);
	ExpenseType findById(UUID id);
	ExpenseTypeResponseDTO findByIdDTO(UUID id);
	ExpenseTypeResponseDTO update(UUID id, ExpenseTypeUpdateDTO expenseTypeUpdateDTO);
	void delete(UUID id);
	List<ExpenseTypeResponseDTO> findAll();
}