package br.com.cargidoso.medmap.repository;

import br.com.cargidoso.medmap.entity.User;
import java.util.List;

public interface UserRepositoryCustom {
    List<User> findAllByFilter(User user);
}
