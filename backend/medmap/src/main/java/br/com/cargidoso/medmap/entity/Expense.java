package br.com.cargidoso.medmap.entity;

import br.com.cargidoso.medmap.enumeration.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@Table(name = "expense")
public class Expense {

	@Id
	@GeneratedValue
	private UUID id;

    @ManyToOne
    private ExpenseType expenseType;

	private String description;
    private BigDecimal price;
    private LocalDateTime expenseDate;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    public void pay() {
        paymentStatus = PaymentStatus.CLOSED;
    }

    @PrePersist
    protected void onCreate() {
        paymentStatus = PaymentStatus.OPEN;
    }
}