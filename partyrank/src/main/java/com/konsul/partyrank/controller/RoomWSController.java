package com.konsul.partyrank.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.konsul.partyrank.model.Room;
import com.konsul.partyrank.repository.RoomRepository;

/*Lo ideal sería implementar todo con un sistema de Id Token autogenerados*/

@Controller
public class RoomWSController {
    @Autowired
    private RoomRepository roomRepository;
    

    @MessageMapping("/createRoom/{roomName}")
    @SendTo("/topic/roomCreation")
    public Object createRoom(@DestinationVariable String roomName, String password) {

        for (Room roomListable : roomRepository.findAll()) {
            System.out.println(roomListable);
        }
        Room room;
        if (roomRepository.findByRoomName(roomName) != null) {
            System.out.println("Ya creada");
            return "roomAlready";
        } else {
            System.out.println("NUEVA");
            room = new Room(roomName, password);
            return roomRepository.save(room);
        }

    }

    @MessageMapping("/joinRoom")
    @SendTo("/topic/joinTry")
    public boolean joinRoom(@Payload Map<String, String> payload) {
        String roomName = payload.get("roomName");
        String password = payload.get("password");

        System.out.println("room " + roomName + " pwd " + password);

        Room room = roomRepository.findByRoomName(roomName);
        
        if (room != null) {
            System.out.println(room.getRoomPwd().equals(password));
            if (room.getRoomPwd().equals(password)) {
                return true;
            }
        }
        return false;
    }


    @MessageMapping("/room/{roomName}/video")
    @SendTo("/topic/{roomName}")
    public String returnNextVideoIndex(@DestinationVariable String roomName, String request) {
        System.out.println(request);
        return request;
    }

    @MessageMapping("/room/{roomName}")
    @SendTo("/topic/{roomName}")
    public String cjecl(@DestinationVariable String roomName, String request) {
        System.out.println(request);
     
        return request;
    }
}
