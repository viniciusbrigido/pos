package br.com.cargidoso.medmap.controller;

import br.com.cargidoso.medmap.dto.auth.*;
import br.com.cargidoso.medmap.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthController {

    private UserService service;

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO login) {
        return ResponseEntity.ok(service.login(login));
    }

    @PostMapping("logout")
    public ResponseEntity<Void> logout() {
        service.logout();
        return ResponseEntity.ok().build();
    }

    @PostMapping("change-password")
    public ResponseEntity<Void> changePassword(@RequestHeader("Authorization") String authHeader, @Valid @RequestBody ChangePasswordDTO changePasswordDTO) {
        service.changePassword(authHeader, changePasswordDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate")
    public ResponseEntity<AuthResponseDTO> validateToken(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(service.validateToken(authHeader));
    }

}
