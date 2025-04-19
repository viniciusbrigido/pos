package br.com.cargidoso.medmap.repository;

import java.util.Optional;
import java.util.UUID;
import br.com.cargidoso.medmap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>, UserRepositoryCustom {

    @Query("SELECT u FROM User u WHERE u.cpf = :cpf AND (:id IS NULL OR u.id <> :id)")
    Optional<User> findByCpfAndNotId(@Param("cpf") String cpf, @Param("id") UUID id);

    @Query("SELECT u FROM User u WHERE u.email = :email AND (:id IS NULL OR u.id <> :id)")
    Optional<User> findByEmailAndNotId(@Param("email") String email, @Param("id") UUID id);

    @Query("SELECT COUNT(a) > 0 FROM Appointment a WHERE a.user.id = :userId")
    boolean isUserInUse(@Param("userId") UUID userId);

    Optional<User> findByEmail(String email);

}