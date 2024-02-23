package com.konsul.partyrank.repository;

import com.konsul.partyrank.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByRoomName(String roomName);
}
