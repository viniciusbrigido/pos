package br.com.cargidoso.medmap.repository;

import br.com.cargidoso.medmap.dto.expense.ExpenseFilterDTO;
import br.com.cargidoso.medmap.entity.Expense;
import java.util.List;

public interface ExpenseRepositoryCustom {

    List<Expense> findAllByFilter(ExpenseFilterDTO filter);
}
