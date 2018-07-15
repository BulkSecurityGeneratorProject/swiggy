package com.swiggy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.swiggy.domain.Slot;

import com.swiggy.domain.enumeration.SlotStatus;
import com.swiggy.repository.SlotRepository;
import com.swiggy.web.rest.errors.BadRequestAlertException;
import com.swiggy.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Slot.
 */
@RestController
@RequestMapping("/api")
public class SlotResource {

    private final Logger log = LoggerFactory.getLogger(SlotResource.class);

    private static final String ENTITY_NAME = "slot";

    private final SlotRepository slotRepository;

    public SlotResource(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    /**
     * POST  /slots : Create a new slot.
     *
     * @param slot the slot to create
     * @return the ResponseEntity with status 201 (Created) and with body the new slot, or with status 400 (Bad Request) if the slot has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/slots")
    @Timed
    public ResponseEntity<Slot> createSlot(@RequestBody Slot slot) throws URISyntaxException {
        log.debug("REST request to save Slot : {}", slot);
        if (slot.getId() != null) {
            throw new BadRequestAlertException("A new slot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Slot result = slotRepository.save(slot);
        return ResponseEntity.created(new URI("/api/slots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /slots : Updates an existing slot.
     *
     * @param slot the slot to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated slot,
     * or with status 400 (Bad Request) if the slot is not valid,
     * or with status 500 (Internal Server Error) if the slot couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/slots")
    @Timed
    public ResponseEntity<Slot> updateSlot(@RequestBody Slot slot) throws URISyntaxException {
        log.debug("REST request to update Slot : {}", slot);
        if (slot.getId() == null) {
            return createSlot(slot);
        }
        Slot result = slotRepository.save(slot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, slot.getId().toString()))
            .body(result);
    }

    /**
     * GET  /slots : get all the slots.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of slots in body
     */
    @GetMapping("/slots")
    @Timed
    public List<Slot> getAllSlots() {
        log.debug("REST request to get all Slots");
        return slotRepository.findAll();
        }

    /**
     * GET  /slots/:id : get the "id" slot.
     *
     * @param id the id of the slot to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the slot, or with status 404 (Not Found)
     */
    @GetMapping("/slots/{id}")
    @Timed
    public ResponseEntity<Slot> getSlot(@PathVariable Long id) {
        log.debug("REST request to get Slot : {}", id);
        Slot slot = slotRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(slot));
    }

    @GetMapping("/slots/{id}/{status}")
    @Timed
    public ResponseEntity<Slot> updateSlot(@PathVariable Long id, @PathVariable String status) {
        log.debug("REST request to get Slot : {}", id);
        Slot slot = slotRepository.findOne(id);
        slot.setStatus(SlotStatus.valueOf(status));
        slotRepository.save(slot);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(slot));
    }

    /**
     * DELETE  /slots/:id : delete the "id" slot.
     *
     * @param id the id of the slot to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/slots/{id}")
    @Timed
    public ResponseEntity<Void> deleteSlot(@PathVariable Long id) {
        log.debug("REST request to delete Slot : {}", id);
        slotRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
