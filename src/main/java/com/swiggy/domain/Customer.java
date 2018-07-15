package com.swiggy.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lng")
    private Double lng;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "customer_restaurant",
               joinColumns = @JoinColumn(name="customers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="restaurants_id", referencedColumnName="id"))
    private Set<Restaurant> restaurants = new HashSet<>();

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

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getLat() {
        return lat;
    }

    public Customer lat(Double lat) {
        this.lat = lat;
        return this;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public Customer lng(Double lng) {
        this.lng = lng;
        return this;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Set<Restaurant> getRestaurants() {
        return restaurants;
    }

    public Customer restaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
        return this;
    }

    public Customer addRestaurant(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.getCustomers().add(this);
        return this;
    }

    public Customer removeRestaurant(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.getCustomers().remove(this);
        return this;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", lat=" + getLat() +
            ", lng=" + getLng() +
            "}";
    }
}
