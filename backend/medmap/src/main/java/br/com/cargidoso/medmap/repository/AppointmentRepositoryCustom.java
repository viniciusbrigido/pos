package br.com.cargidoso.medmap.repository;

import br.com.cargidoso.medmap.dto.appointment.AppointmentFilterDTO;
import br.com.cargidoso.medmap.entity.Appointment;
import java.util.List;

public interface AppointmentRepositoryCustom {

    List<Appointment> findAllFilter(AppointmentFilterDTO filter);
}
