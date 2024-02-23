package com.konsul.partyrank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.konsul.partyrank.model.Room;
import com.konsul.partyrank.repository.RoomRepository;




@Controller
public class RoomWSController {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/createRoom")
    public Room createRoom(Room room) {
        // Lógica para crear una nueva sala en la base de datos
        // ...
        if(roomRepository.findByRoomName(room.getRoomName()) != null){
            return null;
        }

        messagingTemplate.convertAndSend("/topic/rooms", room);
        return roomRepository.save(room);

    }

    @MessageMapping("/buscarSala")
    public void buscarSala(String roomName) {
        // Lógica para buscar una sala por su ID

        Room room = roomRepository.findByRoomName(roomName);

        //if(){}
        messagingTemplate.convertAndSendToUser(roomName, "/queue/sala", room);
    }
}
