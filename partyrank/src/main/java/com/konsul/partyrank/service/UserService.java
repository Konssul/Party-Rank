package com.konsul.partyrank.service;
import org.springframework.stereotype.Service;

import com.konsul.partyrank.dto.UserDTO;
import com.konsul.partyrank.dto.request.UserRequest;
import com.konsul.partyrank.dto.response.UserResponse;
import com.konsul.partyrank.model.Role;
import com.konsul.partyrank.model.User;
import com.konsul.partyrank.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository; 

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {
       
        User user = User.builder()
        .id(userRequest.getId())
        .firstname(userRequest.getFirstname())
        .lastname(userRequest.getLastname())
        .country(userRequest.getCountry())
        .role(Role.USER)
        .build();
        
        userRepository.updateUser(user.id, user.getFirstname(), user.getLastname(), user.getCountry());

        return new UserResponse("El usuario se registró satisfactoriamente");
    }

    public UserDTO getUser(Integer id) {
        User user= userRepository.findById(id).orElse(null);
       
        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
            .id(user.id)
            .username(user.getUsername())
            .firstname(user.getFirstname())
            .lastname(user.getLastname())
            .country(user.getCountry())
            .build();
            return userDTO;
        }
        return null;
    }
}
