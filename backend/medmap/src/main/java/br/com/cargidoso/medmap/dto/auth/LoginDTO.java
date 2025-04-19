package br.com.cargidoso.medmap.dto.auth;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class LoginDTO {

    @NotBlank(message = "O E-mail é obrigatório")
    private String email;

    @NotBlank(message = "A Senha é obrigatória")
    private String password;
}
