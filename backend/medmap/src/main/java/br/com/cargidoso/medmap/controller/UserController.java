package br.com.cargidoso.medmap.controller;

import br.com.cargidoso.medmap.dto.user.*;
import br.com.cargidoso.medmap.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("user")
public class UserController {

    private UserService service;

    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@Valid @RequestBody UserPersistDTO userPersistDTO) {
        return ResponseEntity.ok(service.create(userPersistDTO));
    }

    @GetMapping("{id}")
    public ResponseEntity<UserResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findByIdDTO(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<UserResponseDTO> update(@PathVariable UUID id, @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        return ResponseEntity.ok(service.update(id, userUpdateDTO));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> findAll(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(service.findAll(authHeader));
    }
}
