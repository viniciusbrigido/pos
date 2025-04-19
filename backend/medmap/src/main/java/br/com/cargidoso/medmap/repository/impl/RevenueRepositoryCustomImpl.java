package br.com.cargidoso.medmap.repository.impl;

import br.com.cargidoso.medmap.dto.revenue.RevenueFilterDTO;
import br.com.cargidoso.medmap.entity.*;
import br.com.cargidoso.medmap.repository.RevenueRepositoryCustom;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import static java.util.Objects.nonNull;

public class RevenueRepositoryCustomImpl implements RevenueRepositoryCustom {

    private static final QRevenue REVENUE = QRevenue.revenue;

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Revenue> findAllByFilter(RevenueFilterDTO filter) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        BooleanBuilder builder = new BooleanBuilder();

        if (nonNull(filter.getInitDate())) {
            builder.and(REVENUE.date.goe(filter.getInitDate()));
        }

        if (nonNull(filter.getFinalDate())) {
            builder.and(REVENUE.date.loe(filter.getFinalDate()));
        }

        return queryFactory
                .selectFrom(REVENUE)
                .where(builder)
                .fetch();
    }
}
