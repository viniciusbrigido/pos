package br.com.cargidoso.medmap.dto.expense;

import br.com.cargidoso.medmap.dto.expense_type.ExpenseTypeResponseDTO;
import br.com.cargidoso.medmap.enumeration.PaymentStatus;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ExpenseResponseDTO {

	private UUID id;

    private ExpenseTypeResponseDTO expenseType;

    private String description;
    private BigDecimal price;
    private LocalDateTime expenseDate;
    private PaymentStatus paymentStatus;

}