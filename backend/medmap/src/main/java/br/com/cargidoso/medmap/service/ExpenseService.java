package br.com.cargidoso.medmap.service;

import java.util.List;
import br.com.cargidoso.medmap.dto.expense.*;
import br.com.cargidoso.medmap.entity.*;
import java.util.UUID;

public interface ExpenseService {

	ExpenseResponseDTO create(ExpensePersistDTO expensePersistDTO);
	Expense findById(UUID id);
	ExpenseResponseDTO findByIdDTO(UUID id);
	ExpenseResponseDTO pay(UUID id);
	void delete(UUID id);
	List<ExpenseResponseDTO> findAllFilter(ExpenseFilterDTO filter);
}