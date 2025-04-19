package br.com.cargidoso.medmap.service.impl;

import br.com.cargidoso.medmap.config.JwtUtil;
import br.com.cargidoso.medmap.config.MedmapContext;
import br.com.cargidoso.medmap.dto.auth.*;
import br.com.cargidoso.medmap.dto.user.*;
import br.com.cargidoso.medmap.entity.User;
import br.com.cargidoso.medmap.exception.BusinessException;
import br.com.cargidoso.medmap.exception.NotFoundEntityException;
import br.com.cargidoso.medmap.repository.UserRepository;
import br.com.cargidoso.medmap.service.AuthService;
import br.com.cargidoso.medmap.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private UserRepository repository;
    private ModelMapper modelMapper;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;
    private AuthService authService;

    @Override
    public UserResponseDTO create(UserPersistDTO userPersistDTO) {
        User user = modelMapper.map(userPersistDTO, User.class);
        validateCpf(userPersistDTO.getCpf(), null);
        validateEmail(userPersistDTO.getEmail(), null);
        user.setPassword(passwordEncoder.encode(userPersistDTO.getPassword()));
        return toResponseDTO(repository.save(user));
    }

    @Override
    public User findById(UUID id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundEntityException("Usário não encontrado."));
    }

    @Override
    public UserResponseDTO findByIdDTO(UUID id) {
        return toResponseDTO(findById(id));
    }

    @Override
    public UserResponseDTO update(UUID id, UserUpdateDTO userUpdateDTO) {
        User user = findById(id);
        validateCpf(user.getCpf(), id);
        validateEmail(user.getEmail(), id);
        user.update(userUpdateDTO);
        return toResponseDTO(repository.save(user));
    }

    @Override
    public void delete(UUID id) {
        if (repository.isUserInUse(id)) {
            throw new BusinessException("Já existe um Atendimento com esse Usuário.");
        }
        repository.deleteById(id);
    }

    @Override
    public List<UserResponseDTO> findAll(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        User user = authService.getUserFromToken(token);

        return repository.findAllByFilter(user)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    public AuthResponseDTO login(LoginDTO login) {
        User user = authService.findByEmail(login.getEmail());

        if (!passwordEncoder.matches(login.getPassword(), user.getPassword())) {
            throw new NotFoundEntityException("E-mail ou senha inválidos.");
        }

        MedmapContext.setCurrentUser(user);
        String token = jwtUtil.generateToken(user);

        return AuthResponseDTO.fromUser(user, token);
    }

    @Override
    public void logout() {
        MedmapContext.clear();
    }

    @Override
    public void changePassword(String authHeader, ChangePasswordDTO changePasswordDTO) {
        String token = authHeader.replace("Bearer ", "");
        User user = authService.getUserFromToken(token);
        user.setPassword(passwordEncoder.encode(changePasswordDTO.getPassword()));
        user.setFirstAccess(false);
        repository.save(user);
    }

    @Override
    public AuthResponseDTO validateToken(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        User user = authService.getUserFromToken(token);

        return AuthResponseDTO.fromUser(user, token);
    }

    private void validateCpf(String cpf, UUID id) {
        Optional<User> existing = repository.findByCpfAndNotId(cpf, id);
        if (existing.isPresent()) {
            throw new BusinessException("Já existe um usuário cadastrado com este CPF.");
        }
    }

    private void validateEmail(String cpf, UUID id) {
        Optional<User> existing = repository.findByEmailAndNotId(cpf, id);
        if (existing.isPresent()) {
            throw new BusinessException("Já existe um usuário cadastrado com este E-mail.");
        }
    }

    private UserResponseDTO toResponseDTO(User user) {
        return modelMapper.map(user, UserResponseDTO.class);
    }
}
