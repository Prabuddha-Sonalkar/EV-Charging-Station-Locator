//package com.app.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import com.app.entity.User;
//import java.util.Optional;
//
//public interface UserRepository extends JpaRepository<User, Integer> {
//    Optional<User> findByEmail(String email);
//}


package com.app.repository;

import com.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByEmail(String email);
}
