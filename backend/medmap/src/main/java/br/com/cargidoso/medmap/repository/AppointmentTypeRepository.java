package br.com.cargidoso.medmap.repository;

import java.util.UUID;
import br.com.cargidoso.medmap.entity.AppointmentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentTypeRepository extends JpaRepository<AppointmentType, UUID> {

    @Query("SELECT COUNT(a) > 0 FROM Appointment a WHERE a.appointmentType.id = :appointmentTypeId")
    boolean isAppointmentTypeInUse(@Param("appointmentTypeId") UUID appointmentTypeId);
}