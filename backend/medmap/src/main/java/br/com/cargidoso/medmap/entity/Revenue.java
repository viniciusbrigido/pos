package br.com.cargidoso.medmap.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@Table(name = "revenue")
public class Revenue {

	@Id
	@GeneratedValue
	private UUID id;

    @ManyToOne
    private Appointment appointment;

    private BigDecimal price;
    private LocalDateTime date;

}