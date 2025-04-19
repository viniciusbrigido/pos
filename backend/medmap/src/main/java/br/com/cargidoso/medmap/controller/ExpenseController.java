package br.com.cargidoso.medmap.controller;

import br.com.cargidoso.medmap.dto.expense.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import br.com.cargidoso.medmap.service.ExpenseService;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("expense")
public class ExpenseController {

	private ExpenseService service;

    @PostMapping
    public ResponseEntity<ExpenseResponseDTO> create(@Valid @RequestBody ExpensePersistDTO expensePersistDTO) {
        return ResponseEntity.ok(service.create(expensePersistDTO));
    }

    @GetMapping("{id}")
    public ResponseEntity<ExpenseResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findByIdDTO(id));
    }

    @PutMapping("/pay/{id}")
    public ResponseEntity<ExpenseResponseDTO> pay(@PathVariable UUID id) {
        return ResponseEntity.ok(service.pay(id));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("filter")
    public ResponseEntity<List<ExpenseResponseDTO>> findAll(@RequestBody ExpenseFilterDTO filter) {
        return ResponseEntity.ok(service.findAllFilter(filter));
    }

}