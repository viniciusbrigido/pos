package br.com.cargidoso.medmap.repository.impl;

import br.com.cargidoso.medmap.entity.*;
import br.com.cargidoso.medmap.enumeration.UserType;
import br.com.cargidoso.medmap.repository.UserRepositoryCustom;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import static java.util.Objects.*;

public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    private static final QUser USER = QUser.user;

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<User> findAllByFilter(User user) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(USER.userType.ne(UserType.ADMIN));

        if (nonNull(user)) {
            if (user.isUser()) {
                builder.and(USER.userType.eq(UserType.PATIENT));
            } else if (user.isAdmin()) {
                builder.and(USER.userType.eq(UserType.USER));
            }
        }

        return queryFactory
                .selectFrom(USER)
                .where(builder)
                .fetch();
    }
}
