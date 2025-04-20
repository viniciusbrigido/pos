package br.com.cargidoso.medmap.dto.user;

import br.com.cargidoso.medmap.dto.address.AddressDTO;
import br.com.cargidoso.medmap.enumeration.UserType;
import br.com.cargidoso.medmap.validator.ValidCpf;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class UserPersistDTO {

    @NotBlank(message = "O Nome é obrigatório")
    private String name;

    @NotBlank(message = "O CPF é obrigatório")
    @ValidCpf
    private String cpf;

    @NotBlank(message = "O Fone é obrigatório")
    private String phone;

    @NotBlank(message = "O E-mail é obrigatório")
    @Email(message = "O E-mail é inválido")
    private String email;

    @NotBlank(message = "A Senha é obrigatória")
    private String password;

    private UserType userType;

    private AddressDTO address;

    private String obs;
}
