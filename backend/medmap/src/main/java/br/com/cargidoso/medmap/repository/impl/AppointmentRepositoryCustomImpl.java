package br.com.cargidoso.medmap.repository.impl;

import br.com.cargidoso.medmap.dto.appointment.AppointmentFilterDTO;
import br.com.cargidoso.medmap.entity.*;
import br.com.cargidoso.medmap.repository.AppointmentRepositoryCustom;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.*;
import java.util.List;
import static java.util.Objects.nonNull;

public class AppointmentRepositoryCustomImpl implements AppointmentRepositoryCustom {

    private static final QAppointment APPOINTMENT = QAppointment.appointment;

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Appointment> findAllFilter(AppointmentFilterDTO filter) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        BooleanBuilder builder = new BooleanBuilder();

        if (nonNull(filter.getDate())) {
            LocalDate dateOnly = filter.getDate().toLocalDate();
            LocalDateTime startOfDay = dateOnly.atStartOfDay();
            LocalDateTime endOfDay = dateOnly.atTime(LocalTime.MAX);

            builder.and(APPOINTMENT.date.between(startOfDay, endOfDay));
        }

        User user = filter.getUser();
        if (nonNull(user)) {
            if (user.isPatient()) {
                builder.and(APPOINTMENT.userPatient.id.eq(user.getId()));
            } else {
                builder.and(APPOINTMENT.user.id.eq(user.getId()));
            }
        }

        return queryFactory
                .selectFrom(APPOINTMENT)
                .where(builder)
                .fetch();
    }
}
