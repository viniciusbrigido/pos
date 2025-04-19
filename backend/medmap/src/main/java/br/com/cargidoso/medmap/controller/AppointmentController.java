package br.com.cargidoso.medmap.controller;

import br.com.cargidoso.medmap.dto.appointment.*;
import br.com.cargidoso.medmap.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("appointment")
public class AppointmentController {

    private AppointmentService service;

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> create(@RequestHeader("Authorization") String authHeader, @Valid @RequestBody AppointmentPersistDTO appointmentPersistDTO) {
        return ResponseEntity.ok(service.create(authHeader, appointmentPersistDTO));
    }

    @GetMapping("{id}")
    public ResponseEntity<AppointmentResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findByIdDTO(id));
    }

    @PutMapping("/pay/{id}")
    public ResponseEntity<AppointmentResponseDTO> pay(@PathVariable UUID id) {
        return ResponseEntity.ok(service.pay(id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("filter")
    public ResponseEntity<List<AppointmentResponseDTO>> findAllFilter(@RequestHeader("Authorization") String authHeader, @RequestBody AppointmentFilterDTO filter) {
        return ResponseEntity.ok(service.findAllFilter(authHeader, filter));
    }
}
