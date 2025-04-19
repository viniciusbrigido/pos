package br.com.cargidoso.medmap.entity;

import br.com.cargidoso.medmap.enumeration.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.List;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    private User user;

    @ManyToOne
    private User userPatient;

    @ManyToOne
    private AppointmentType appointmentType;

    private LocalDateTime date;

    private Integer duration;
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private boolean recurring;
    private Integer recurrenceCount;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Revenue> revenues;

    public boolean isClosed() {
        return PaymentStatus.CLOSED.equals(paymentStatus);
    }

    @PrePersist
    protected void onCreate() {
        paymentStatus = PaymentStatus.OPEN;
    }

    public void pay() {
        paymentStatus = PaymentStatus.CLOSED;
    }
}
