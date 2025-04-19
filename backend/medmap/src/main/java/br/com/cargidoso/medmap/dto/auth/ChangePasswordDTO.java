package br.com.cargidoso.medmap.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class ChangePasswordDTO {

    @NotBlank(message = "A Senha é obrigatória")
    private String password;

    @NotBlank(message = "A Confirmação da Senha é obrigatória")
    private String passwordConfirmation;
}
