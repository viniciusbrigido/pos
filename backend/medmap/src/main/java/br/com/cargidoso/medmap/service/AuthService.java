package br.com.cargidoso.medmap.service;

import br.com.cargidoso.medmap.entity.User;

public interface AuthService {

    User getUserFromToken(String token);
    User findByEmail(String email);
}