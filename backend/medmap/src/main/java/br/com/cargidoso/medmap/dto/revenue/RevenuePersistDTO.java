package br.com.cargidoso.medmap.dto.revenue;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class RevenuePersistDTO {

    @NotNull(message = "O Atendimento é obrigatório")
    private UUID appointmentId;

    @NotNull(message = "O Preço padrão é obrigatório")
    @DecimalMin(value = "0.0", inclusive = false, message = "O Preço deve ser maior que zero")
    private BigDecimal price;

    @NotNull(message = "A Data é obrigatória")
    private LocalDateTime date;
}