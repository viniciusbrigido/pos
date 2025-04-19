package br.com.cargidoso.medmap.controller;

import br.com.cargidoso.medmap.dto.revenue.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import br.com.cargidoso.medmap.service.RevenueService;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("revenue")
public class RevenueController {

	private RevenueService service;

    @PostMapping
    public ResponseEntity<RevenueResponseDTO> create(@Valid @RequestBody RevenuePersistDTO revenuePersistDTO) {
        return ResponseEntity.ok(service.create(revenuePersistDTO));
    }

    @GetMapping("{id}")
    public ResponseEntity<RevenueResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findByIdDTO(id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("filter")
    public ResponseEntity<List<RevenueResponseDTO>> findAll(@RequestBody RevenueFilterDTO filter) {
        return ResponseEntity.ok(service.findAllFilter(filter));
    }

}