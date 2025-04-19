package br.com.cargidoso.medmap.dto.appointment_type;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class AppointmentTypeUpdateDTO {

    @NotBlank(message = "A Descrição é obrigatória")
    private String description;

    @NotNull(message = "O Preço padrão é obrigatório")
    @DecimalMin(value = "0.0", inclusive = false, message = "O Preço deve ser maior que zero")
    private BigDecimal defaultPrice;

    @NotNull(message = "A Duração padrão é obrigatória")
    @Min(value = 10, message = "A Duração mínima é 10 minutos")
    private Integer defaultDuration;

}