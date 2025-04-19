package br.com.cargidoso.medmap.controller;

import br.com.cargidoso.medmap.dto.expense_type.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import br.com.cargidoso.medmap.service.ExpenseTypeService;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("expense_type")
public class ExpenseTypeController {

	private ExpenseTypeService service;

    @PostMapping
    public ResponseEntity<ExpenseTypeResponseDTO> create(@Valid @RequestBody ExpenseTypePersistDTO expenseTypePersistDTO) {
        return ResponseEntity.ok(service.create(expenseTypePersistDTO));
    }

    @GetMapping("{id}")
    public ResponseEntity<ExpenseTypeResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findByIdDTO(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseTypeResponseDTO> update(@PathVariable UUID id, @Valid @RequestBody ExpenseTypeUpdateDTO expenseTypeUpdateDTO) {
        return ResponseEntity.ok(service.update(id, expenseTypeUpdateDTO));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<ExpenseTypeResponseDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

}