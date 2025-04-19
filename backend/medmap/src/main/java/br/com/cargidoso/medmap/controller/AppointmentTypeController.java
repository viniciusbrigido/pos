package br.com.cargidoso.medmap.controller;

import br.com.cargidoso.medmap.dto.appointment_type.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import br.com.cargidoso.medmap.service.AppointmentTypeService;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("appointment_type")
public class AppointmentTypeController {

	private AppointmentTypeService service;

    @PostMapping
    public ResponseEntity<AppointmentTypeResponseDTO> create(@Valid @RequestBody AppointmentTypePersistDTO appointmentTypePersistDTO) {
        return ResponseEntity.ok(service.create(appointmentTypePersistDTO));
    }

    @GetMapping("{id}")
    public ResponseEntity<AppointmentTypeResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findByIdDTO(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentTypeResponseDTO> update(@PathVariable UUID id, @Valid @RequestBody AppointmentTypeUpdateDTO appointmentTypeUpdateDTO) {
        return ResponseEntity.ok(service.update(id, appointmentTypeUpdateDTO));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<AppointmentTypeResponseDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

}