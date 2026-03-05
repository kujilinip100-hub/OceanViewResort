package com.oceanview.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationRepository repository;

    @GetMapping
    public List<Reservation> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Reservation create(@RequestBody Reservation reservation) {
        return repository.save(reservation);
    }

    @GetMapping("/{id}")
    public Reservation getById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }
}
