//package com.app.service;
//
//import com.app.entity.User;
//import java.util.List;
//import java.util.Optional;
//
//public interface UserService {
//
//    User saveUser(User user);
//
//    Optional<User> getUserById(Integer userId);
//
//    List<User> getAllUsers();
//}


package com.app.service;

import com.app.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {

    User saveUser(User user);

    Optional<User> getUserById(Integer userId);

    List<User> getAllUsers();
}
