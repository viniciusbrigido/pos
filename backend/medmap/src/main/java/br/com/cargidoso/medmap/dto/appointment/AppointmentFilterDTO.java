package br.com.cargidoso.medmap.dto.appointment;

import br.com.cargidoso.medmap.entity.User;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentFilterDTO {
    private LocalDateTime date;
    private User user;
}
