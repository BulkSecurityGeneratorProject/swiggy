package com.swiggy.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "slug")
    private String slug;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lng")
    private Double lng;

    @ManyToMany(mappedBy = "restaurants")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Customer> customers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Restaurant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public Restaurant slug(String slug) {
        this.slug = slug;
        return this;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public Double getLat() {
        return lat;
    }

    public Restaurant lat(Double lat) {
        this.lat = lat;
        return this;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public Restaurant lng(Double lng) {
        this.lng = lng;
        return this;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public Restaurant customers(Set<Customer> customers) {
        this.customers = customers;
        return this;
    }

    public Restaurant addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.getRestaurants().add(this);
        return this;
    }

    public Restaurant removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.getRestaurants().remove(this);
        return this;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Restaurant restaurant = (Restaurant) o;
        if (restaurant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", slug='" + getSlug() + "'" +
            ", lat=" + getLat() +
            ", lng=" + getLng() +
            "}";
    }
}
