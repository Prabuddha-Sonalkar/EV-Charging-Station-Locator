package com.app.service;

import com.app.entity.Role;
import java.util.List;
import java.util.Optional;

public interface RoleService {

    Role saveRole(Role role);

    Optional<Role> getRoleById(Integer roleId);

    List<Role> getAllRoles();
}
