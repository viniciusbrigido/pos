package br.com.cargidoso.medmap.dto.revenue;

import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class RevenueFilterDTO {
    private LocalDateTime initDate;
    private LocalDateTime finalDate;
}
