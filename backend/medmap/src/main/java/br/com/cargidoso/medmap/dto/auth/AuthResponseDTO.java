package br.com.cargidoso.medmap.dto.auth;

import br.com.cargidoso.medmap.dto.address.AddressDTO;
import br.com.cargidoso.medmap.entity.User;
import br.com.cargidoso.medmap.enumeration.UserType;
import lombok.*;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class AuthResponseDTO {

    private UUID id;
    private boolean success;
    private UserType userType;
    private boolean firstAccess;
    private String name;
    private String email;
    private String token;
    private String cpf;
    private String phone;
    private AddressDTO address;

    public static AuthResponseDTO fromUser(User user, String token) {
        return builder()
                .success(true)
                .userType(user.getUserType())
                .firstAccess(user.isFirstAccess())
                .name(user.getName())
                .email(user.getEmail())
                .id(user.getId())
                .cpf(user.getCpf())
                .phone(user.getPhone())
                .address(AddressDTO.fromAddress(user.getAddress()))
                .token(token)
                .build();
    }
}
