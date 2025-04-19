package br.com.cargidoso.medmap.dto.expense;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ExpenseFilterDTO {
    private LocalDateTime initDate;
    private LocalDateTime finalDate;
}
