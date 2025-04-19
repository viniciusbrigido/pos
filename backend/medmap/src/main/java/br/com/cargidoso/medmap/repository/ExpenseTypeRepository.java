package br.com.cargidoso.medmap.repository;

import java.util.UUID;
import br.com.cargidoso.medmap.entity.ExpenseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseTypeRepository extends JpaRepository<ExpenseType, UUID> {

    @Query("SELECT COUNT(a) > 0 FROM Expense a WHERE a.expenseType.id = :expenseTypeId")
    boolean isExpenseTypeInUse(@Param("expenseTypeId") UUID expenseTypeId);
}