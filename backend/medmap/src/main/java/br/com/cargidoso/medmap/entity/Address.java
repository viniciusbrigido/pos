package br.com.cargidoso.medmap.entity;

import br.com.cargidoso.medmap.dto.address.AddressDTO;
import jakarta.persistence.Embeddable;
import lombok.*;
import static java.util.Optional.ofNullable;

@Embeddable
@Getter @Setter
public class Address {
    private String street;
    private String number;
    private String neighborhood;
    private String city;
    private String zipCode;

    public void update(AddressDTO addressDTO) {
        street = ofNullable(addressDTO.getStreet()).orElse(street);
        number = ofNullable(addressDTO.getNumber()).orElse(number);
        neighborhood = ofNullable(addressDTO.getNeighborhood()).orElse(neighborhood);
        city = ofNullable(addressDTO.getCity()).orElse(city);
        zipCode = ofNullable(addressDTO.getZipCode()).orElse(zipCode);
    }
}
