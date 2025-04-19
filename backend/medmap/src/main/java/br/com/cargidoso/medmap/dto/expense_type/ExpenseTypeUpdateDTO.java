package br.com.cargidoso.medmap.dto.expense_type;

import br.com.cargidoso.medmap.enumeration.Frequency;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ExpenseTypeUpdateDTO {

    @NotBlank(message = "A Descrição é obrigatória")
	private String description;

    @NotNull(message = "A Frequência é obrigatória")
    private Frequency frequency;

}