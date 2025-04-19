package br.com.cargidoso.medmap.dto.appointment_type;

import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class AppointmentTypeResponseDTO {

	private UUID id;

	private String description;
    private BigDecimal defaultPrice;
    private Integer defaultDuration;

}