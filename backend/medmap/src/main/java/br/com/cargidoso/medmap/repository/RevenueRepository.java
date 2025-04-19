package br.com.cargidoso.medmap.repository;

import java.util.UUID;
import br.com.cargidoso.medmap.entity.Revenue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevenueRepository extends JpaRepository<Revenue, UUID>, RevenueRepositoryCustom {
}