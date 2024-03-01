package com.konsul.partyrank.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.konsul.partyrank.model.User;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username); 
    
    @Modifying()
    @Query("update User u set u.username=:username, u.email=:email where u.id = :id")
    void updateUser(@Param(value = "id") Integer id,   @Param(value = "username") String username, @Param(value = "email") String email);

}
