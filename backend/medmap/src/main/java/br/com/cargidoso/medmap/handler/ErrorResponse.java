package br.com.cargidoso.medmap.handler;

import lombok.*;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class ErrorResponse {
    private String status;
    private String message;
}