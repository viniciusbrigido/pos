package br.com.cargidoso.medmap.service;

import br.com.cargidoso.medmap.dto.auth.*;
import br.com.cargidoso.medmap.dto.user.*;
import br.com.cargidoso.medmap.entity.User;
import java.util.List;
import java.util.UUID;

public interface UserService {

    UserResponseDTO create(UserPersistDTO userPersistDTO);
    User findById(UUID id);
    UserResponseDTO findByIdDTO(UUID id);
    UserResponseDTO update(UUID id, UserUpdateDTO userUpdateDTO);
    void delete(UUID id);
    List<UserResponseDTO> findAll(String authHeader);
    AuthResponseDTO login(LoginDTO login);
    void logout();
    void changePassword(String authHeader, ChangePasswordDTO changePasswordDTO);
    AuthResponseDTO validateToken(String authHeader);
}
