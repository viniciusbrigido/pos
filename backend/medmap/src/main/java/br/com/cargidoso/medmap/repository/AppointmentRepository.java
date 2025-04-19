package br.com.cargidoso.medmap.repository;

import br.com.cargidoso.medmap.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID>, AppointmentRepositoryCustom {
}
