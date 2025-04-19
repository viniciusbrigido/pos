package br.com.cargidoso.medmap.dto.expense;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ExpensePersistDTO {

    @NotNull(message = "O Tipo de Despesa é obrigatório")
    private UUID expenseTypeId;

    @NotBlank(message = "A Descrição é obrigatória")
	private String description;

    @DecimalMin(value = "0.0", inclusive = false, message = "O Preço deve ser maior que zero")
    @NotNull(message = "O Preço é obrigatório")
    private BigDecimal price;

    @NotNull(message = "A Data é obrigatória")
    private LocalDateTime expenseDate;

}