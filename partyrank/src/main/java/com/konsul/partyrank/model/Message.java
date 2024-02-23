package com.konsul.partyrank.model;


public class Message {

    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private Status status;



    
    public Message(String senderName, String receiverName, String message, String date, Status status) {
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.message = message;
        this.date = date;
        this.status = status;
    }
    

    public Message() {
    }


    @Override
    public String toString() {
        return "Message [senderName=" + senderName + ", receiverName=" + receiverName + ", message=" + message + ", date="
                + date + ", status=" + status + "]";
    }

    public String getSenderName() {
        return this.senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getReceiverName() {
        return this.receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

}
