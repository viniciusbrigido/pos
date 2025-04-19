package br.com.cargidoso.medmap.util;

import br.com.caelum.stella.validation.CPFValidator;
import java.util.Objects;

public class Util {

    private Util() {
        throw new IllegalStateException("Utility class");
    }

    public static boolean isCpfValid(String cpf) {
        CPFValidator cpfValidator = new CPFValidator();
        try {
            cpfValidator.assertValid(cpf);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    public static String formatCpf(String cpf) {
        if (Objects.isNull(cpf)) return "";

        String cleanCpf = cpf.replaceAll("\\D", "");

        if (cleanCpf.length() != 11) {
            throw new IllegalArgumentException("O CPF deve conter 11 dígitos.");
        }

        return cleanCpf.replaceAll("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
    }

    public static String normalizeCpf(String cpf) {
        return cpf.replaceAll("\\D+", "");
    }
}
