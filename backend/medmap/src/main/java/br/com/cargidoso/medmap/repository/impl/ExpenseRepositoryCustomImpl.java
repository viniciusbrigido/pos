package br.com.cargidoso.medmap.repository.impl;

import br.com.cargidoso.medmap.dto.expense.ExpenseFilterDTO;
import br.com.cargidoso.medmap.entity.Expense;
import br.com.cargidoso.medmap.entity.QExpense;
import br.com.cargidoso.medmap.repository.ExpenseRepositoryCustom;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import static java.util.Objects.*;

public class ExpenseRepositoryCustomImpl implements ExpenseRepositoryCustom {

    private static final QExpense EXPENSE = QExpense.expense;

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Expense> findAllByFilter(ExpenseFilterDTO filter) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        BooleanBuilder builder = new BooleanBuilder();

        if (nonNull(filter.getInitDate())) {
            builder.and(EXPENSE.expenseDate.goe(filter.getInitDate()));
        }

        if (nonNull(filter.getFinalDate())) {
            builder.and(EXPENSE.expenseDate.loe(filter.getFinalDate()));
        }

        return queryFactory
                .selectFrom(EXPENSE)
                .where(builder)
                .fetch();
    }
}
