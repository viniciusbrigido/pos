package br.com.cargidoso.medmap.dto.address;

import br.com.cargidoso.medmap.entity.Address;
import lombok.*;
import static java.util.Objects.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
public class AddressDTO {
    private String street;
    private String number;
    private String neighborhood;
    private String city;
    private String zipCode;

    public static AddressDTO fromAddress(Address address) {
        if (isNull(address)) {
            return null;
        }
        return AddressDTO
                .builder()
                .street(address.getStreet())
                .number(address.getNumber())
                .neighborhood(address.getNeighborhood())
                .city(address.getCity())
                .zipCode(address.getZipCode())
                .build();
    }
}
