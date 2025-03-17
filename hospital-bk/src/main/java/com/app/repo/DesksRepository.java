package com.app.repo;
import com.app.model.Desks;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface DesksRepository extends JpaRepository<Desks, Long> {

}
