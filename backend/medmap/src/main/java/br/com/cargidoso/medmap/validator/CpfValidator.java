package br.com.cargidoso.medmap.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import static br.com.cargidoso.medmap.util.Util.*;
import static java.util.Objects.*;

public class CpfValidator implements ConstraintValidator<ValidCpf, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (isNull(value)) return true;

        try {
            return isCpfValid(value);
        } catch (Exception e) {
            return false;
        }
    }
}
