package br.com.cargidoso.medmap.config;

import br.com.cargidoso.medmap.dto.address.AddressDTO;
import br.com.cargidoso.medmap.dto.appointment_type.AppointmentTypePersistDTO;
import br.com.cargidoso.medmap.dto.expense_type.ExpenseTypePersistDTO;
import br.com.cargidoso.medmap.dto.user.UserPersistDTO;
import br.com.cargidoso.medmap.enumeration.Frequency;
import br.com.cargidoso.medmap.enumeration.UserType;
import br.com.cargidoso.medmap.service.*;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@AllArgsConstructor
@Component
public class DataInitializer {

    private UserService userService;
    private AppointmentTypeService appointmentTypeService;
    private ExpenseTypeService expenseTypeService;

    @PostConstruct
    public void initStation() {
        userService.create(UserPersistDTO
                .builder()
                .name("Vinicius")
                .cpf("56518027037")
                .phone("48999999999")
                .email("admin")
                .password("admin")
                .userType(UserType.ADMIN)
                .address(AddressDTO
                        .builder()
                        .street("Rua Santos Dumont")
                        .number("343")
                        .neighborhood("Centro")
                        .city("Tubarão")
                        .zipCode("88701610")
                        .build())
                .build());

        userService.create(UserPersistDTO
                .builder()
                .name("Lucas")
                .cpf("96053324000")
                .phone("48888888888")
                .email("user@user")
                .password("123")
                .userType(UserType.USER)
                .address(AddressDTO
                        .builder()
                        .street("Rua Santos Dumont")
                        .number("344")
                        .neighborhood("Centro")
                        .city("Tubarão")
                        .zipCode("88701610")
                        .build())
                .build());

        userService.create(UserPersistDTO
                .builder()
                .name("Paciente")
                .cpf("91032554096")
                .phone("48888888888")
                .email("paciente@paciente")
                .password("123")
                .userType(UserType.PATIENT)
                .address(AddressDTO
                        .builder()
                        .street("Rua Santos Dumont")
                        .number("345")
                        .neighborhood("Centro")
                        .city("Tubarão")
                        .zipCode("88701610")
                        .build())
                .build());

        expenseTypeService.create(ExpenseTypePersistDTO
                .builder()
                .description("Tipo Despesa 1")
                .frequency(Frequency.DAILY)
                .build());

        expenseTypeService.create(ExpenseTypePersistDTO
                .builder()
                .description("Tipo Despesa 2")
                .frequency(Frequency.ANNUAL)
                .build());

        expenseTypeService.create(ExpenseTypePersistDTO
                .builder()
                .description("Tipo Despesa 3")
                .frequency(Frequency.MONTHLY)
                .build());

        appointmentTypeService.create(AppointmentTypePersistDTO
                .builder()
                .description("Tipo de Serviço 1")
                .defaultPrice(BigDecimal.TEN)
                .defaultDuration(30)
                .build());

        appointmentTypeService.create(AppointmentTypePersistDTO
                .builder()
                .description("Tipo de Serviço 2")
                .defaultPrice(BigDecimal.TEN)
                .defaultDuration(30)
                .build());
    }

}
