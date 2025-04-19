package br.com.cargidoso.medmap.dto.revenue;

import br.com.cargidoso.medmap.dto.appointment.AppointmentResponseDTO;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class RevenueResponseDTO {

	private UUID id;

    private AppointmentResponseDTO appointment;

    private BigDecimal price;
    private LocalDateTime date;
}