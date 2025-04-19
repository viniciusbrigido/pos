package br.com.cargidoso.medmap.entity;

import br.com.cargidoso.medmap.dto.expense_type.ExpenseTypeUpdateDTO;
import br.com.cargidoso.medmap.enumeration.Frequency;
import jakarta.persistence.*;
import lombok.*;
import static java.util.Optional.*;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@Table(name = "expense_type")
public class ExpenseType {

	@Id
	@GeneratedValue
	private UUID id;

    @Column(nullable = false)
	private String description;

    @Enumerated(EnumType.STRING)
    private Frequency frequency;

	public void update(ExpenseTypeUpdateDTO expenseTypeUpdateDTO) {
		description = ofNullable(expenseTypeUpdateDTO.getDescription()).orElse(description);
        frequency = ofNullable(expenseTypeUpdateDTO.getFrequency()).orElse(frequency);
	}

}