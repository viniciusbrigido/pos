package br.com.cargidoso.medmap.dto.user;

import br.com.cargidoso.medmap.dto.address.AddressDTO;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class UserUpdateDTO {

    @NotBlank(message = "O Nome é obrigatório")
    private String name;

    @NotBlank(message = "O Fone é obrigatório")
    private String phone;

    private AddressDTO address;

    private String obs;
}
