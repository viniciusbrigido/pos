package br.com.cargidoso.medmap.entity;

import br.com.cargidoso.medmap.dto.user.UserUpdateDTO;
import br.com.cargidoso.medmap.enumeration.UserType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;
import static java.util.Optional.ofNullable;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Entity
@Table(name = "user_final")
public class User {

	@Id
	@GeneratedValue
	private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(length = 11, nullable = false)
    private String cpf;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean firstAccess;

    @Column(nullable = false, updatable = false)
    private LocalDateTime registrationDate;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Embedded
    private Address address;

    private String obs;

    public void update(UserUpdateDTO userUpdateDTO) {
        name = ofNullable(userUpdateDTO.getName()).orElse(name);
        phone = ofNullable(userUpdateDTO.getPhone()).orElse(phone);
        obs = ofNullable(userUpdateDTO.getObs()).orElse(obs);
        address.update(userUpdateDTO.getAddress());
    }

    public boolean isAdmin() {
        return UserType.ADMIN.equals(userType);
    }

    public boolean isPatient() {
        return UserType.PATIENT.equals(userType);
    }

    public boolean isUser() {
        return UserType.USER.equals(userType);
    }

    @PrePersist
    protected void onCreate() {
        registrationDate = LocalDateTime.now();
        firstAccess = !isAdmin();
    }

}