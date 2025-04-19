package br.com.cargidoso.medmap.dto.appointment;

import br.com.cargidoso.medmap.dto.appointment_type.AppointmentTypeResponseDTO;
import br.com.cargidoso.medmap.dto.user.UserResponseDTO;
import br.com.cargidoso.medmap.enumeration.PaymentStatus;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class AppointmentResponseDTO {

    private UUID id;

    private UserResponseDTO user;
    private UserResponseDTO userPatient;
    private AppointmentTypeResponseDTO appointmentType;

    private LocalDateTime date;
    private Integer duration;
    private BigDecimal price;

    private PaymentStatus paymentStatus;

    private boolean recurring;
    private Integer recurrenceCount;
}
