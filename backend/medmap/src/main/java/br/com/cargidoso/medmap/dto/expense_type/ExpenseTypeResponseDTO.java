package br.com.cargidoso.medmap.dto.expense_type;

import br.com.cargidoso.medmap.enumeration.Frequency;
import lombok.*;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ExpenseTypeResponseDTO {

	private UUID id;

	private String description;
    private Frequency frequency;

}