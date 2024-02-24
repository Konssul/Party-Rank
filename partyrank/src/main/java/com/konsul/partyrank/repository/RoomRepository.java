package com.konsul.partyrank.repository;

import com.konsul.partyrank.model.Room;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    Room findByRoomName(String roomName);
    List<Room> findAll();

}
