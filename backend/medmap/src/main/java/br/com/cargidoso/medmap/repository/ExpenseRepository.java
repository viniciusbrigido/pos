package br.com.cargidoso.medmap.repository;

import java.util.UUID;
import br.com.cargidoso.medmap.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID>, ExpenseRepositoryCustom {
}