package com.example.rekrutacjepstrg3.simplelibrary.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.rekrutacjepstrg3.simplelibrary.domain.Checkout;

@Repository
public interface CheckoutRepository extends PagingAndSortingRepository<Checkout, Long> {

	Optional<Checkout> findFirstByBookIdOrderByCheckoutDateDesc(long bookId);

}
