package br.com.cargidoso.medmap.service.impl;

import br.com.cargidoso.medmap.config.JwtUtil;
import br.com.cargidoso.medmap.entity.User;
import br.com.cargidoso.medmap.exception.NotFoundEntityException;
import br.com.cargidoso.medmap.repository.UserRepository;
import br.com.cargidoso.medmap.service.AuthService;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private UserRepository repository;
    private ModelMapper modelMapper;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    public User getUserFromToken(String token) {
        Claims claims = jwtUtil.extractClaims(token);
        String email = claims.getSubject();
        return findByEmail(email);
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new NotFoundEntityException("E-mail ou senha inválidos."));
    }

}
