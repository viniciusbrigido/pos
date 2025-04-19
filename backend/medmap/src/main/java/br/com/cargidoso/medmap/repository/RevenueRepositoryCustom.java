package br.com.cargidoso.medmap.repository;

import br.com.cargidoso.medmap.dto.revenue.RevenueFilterDTO;
import br.com.cargidoso.medmap.entity.Revenue;
import java.util.List;

public interface RevenueRepositoryCustom {

    List<Revenue> findAllByFilter(RevenueFilterDTO filter);
}
