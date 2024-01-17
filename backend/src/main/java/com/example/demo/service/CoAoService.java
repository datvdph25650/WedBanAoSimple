package com.example.demo.service;

import com.example.demo.entity.CoAo;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CoAoService {

    List<CoAo> getAll();

    Page<CoAo> getPage(Integer pageNo);

    List<CoAo> getAllByStatus();

    CoAo add(CoAo coAo);

    CoAo update(CoAo coAo, UUID id);

    Optional<CoAo> detail(UUID id);

    void delete(UUID id);
}
