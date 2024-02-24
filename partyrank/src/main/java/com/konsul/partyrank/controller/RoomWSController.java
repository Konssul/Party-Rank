package com.konsul.partyrank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
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
   
    @MessageMapping("/createRoom/{roomName}")
    @SendTo("/topic/{roomName}")
    public Object createRoom(@DestinationVariable String roomName, String password) {

        for (Room roomListable : roomRepository.findAll()) {
               System.out.println(roomListable);
        }
        Room room;
        if(roomRepository.findByRoomName(roomName) != null){
            System.out.println("Ya creada");
            return "roomAlready";
        }else{
            System.out.println("NUEVA");
            room = new Room(roomName, password);
            return roomRepository.save(room);
        }
        
        

        
    }

    @MessageMapping("/buscarSala")
    public void buscarSala(String roomName) {
       

        Room room = roomRepository.findByRoomName(roomName);

     
        messagingTemplate.convertAndSendToUser(roomName, "/queue/sala", room);
    }
}
