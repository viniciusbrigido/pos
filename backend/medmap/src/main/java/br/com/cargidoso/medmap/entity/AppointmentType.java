package br.com.cargidoso.medmap.entity;

import br.com.cargidoso.medmap.dto.appointment_type.AppointmentTypeUpdateDTO;
import jakarta.persistence.*;
import lombok.*;
import static java.util.Optional.*;
import java.math.BigDecimal;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@Table(name = "appointment_type")
public class AppointmentType {

	@Id
	@GeneratedValue
	private UUID id;

    @Column(nullable = false)
	private String description;

    @Column(nullable = false)
    private BigDecimal defaultPrice;

    @Column(nullable = false)
    private Integer defaultDuration;

	public void update(AppointmentTypeUpdateDTO appointmentTypeUpdateDTO) {
		description = ofNullable(appointmentTypeUpdateDTO.getDescription()).orElse(description);
        defaultPrice = ofNullable(appointmentTypeUpdateDTO.getDefaultPrice()).orElse(defaultPrice);
        defaultDuration = ofNullable(appointmentTypeUpdateDTO.getDefaultDuration()).orElse(defaultDuration);
	}

}