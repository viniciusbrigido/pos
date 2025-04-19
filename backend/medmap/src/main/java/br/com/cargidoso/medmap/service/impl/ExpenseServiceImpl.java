package br.com.cargidoso.medmap.service.impl;

import br.com.cargidoso.medmap.dto.expense.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import br.com.cargidoso.medmap.service.*;
import br.com.cargidoso.medmap.repository.*;
import java.util.List;
import org.modelmapper.ModelMapper;
import br.com.cargidoso.medmap.entity.Expense;
import br.com.cargidoso.medmap.exception.NotFoundEntityException;
import java.util.UUID;

@AllArgsConstructor
@Service
public class ExpenseServiceImpl implements ExpenseService {

	private ExpenseRepository repository;
    private ExpenseTypeService expenseTypeService;
	private ModelMapper modelMapper;

	@Override
	public ExpenseResponseDTO create(ExpensePersistDTO expensePersistDTO) {
		Expense expense = modelMapper.map(expensePersistDTO, Expense.class);
        expense.setExpenseType(expenseTypeService.findById(expensePersistDTO.getExpenseTypeId()));
        expense.setId(null);
		return toResponseDTO(repository.save(expense));
	}

	@Override
	public Expense findById(UUID id) {
		return repository.findById(id).orElseThrow(() -> new NotFoundEntityException("Despesa não encontrada."));
	}

	@Override
	public ExpenseResponseDTO findByIdDTO(UUID id) {
		return toResponseDTO(findById(id));
	}

	@Override
	public ExpenseResponseDTO pay(UUID id) {
		Expense expense = findById(id);
		expense.pay();
		return toResponseDTO(repository.save(expense));
	}

	@Override
	public void delete(UUID id) {
		repository.deleteById(id);
	}

	@Override
	public List<ExpenseResponseDTO> findAllFilter(ExpenseFilterDTO filter) {
		return repository.findAllByFilter(filter)
			.stream()
			.map(this::toResponseDTO)
			.toList();
	}

	private ExpenseResponseDTO toResponseDTO(Expense expense) {
		return modelMapper.map(expense, ExpenseResponseDTO.class);
	}

}