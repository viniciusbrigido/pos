package br.com.cargidoso.medmap.dto.user;

import br.com.cargidoso.medmap.dto.address.AddressDTO;
import br.com.cargidoso.medmap.enumeration.UserType;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class UserResponseDTO {

    private UUID id;

    private String name;
    private String cpf;
    private String phone;
    private String email;
    private String password;
    private LocalDateTime registrationDate;
    private UserType userType;
    private AddressDTO address;
}
