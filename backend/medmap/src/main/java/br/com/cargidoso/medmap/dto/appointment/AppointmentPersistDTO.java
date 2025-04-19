package br.com.cargidoso.medmap.dto.appointment;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class AppointmentPersistDTO {

    @NotNull(message = "O Paciente é obrigatório")
    private UUID userPatientId;

    @NotNull(message = "O Tipo de Atendimento é obrigatório")
    private UUID appointmentTypeId;

    @NotNull(message = "A Data é obrigatória")
    private LocalDateTime date;

    @NotNull(message = "A Duração é obrigatória")
    private Integer duration;

    @DecimalMin(value = "0.0", inclusive = false, message = "O Preço deve ser maior que zero")
    @NotNull(message = "O Preço é obrigatório")
    private BigDecimal price;

    private boolean recurring;
    private Integer recurrenceCount;
}
