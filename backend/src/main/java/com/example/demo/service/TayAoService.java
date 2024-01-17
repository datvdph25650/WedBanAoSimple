package com.example.demo.service;

import com.example.demo.entity.TayAo;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TayAoService {

    List<TayAo> getAll();

    Page<TayAo> getPage(Integer pageNo);

    List<TayAo> getAllByStatus();

    TayAo add(TayAo tayAo);

    TayAo update(TayAo tayAo, UUID id);

    Optional<TayAo> detail(UUID id);

    void delete(UUID id);
}
