package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String gender;
    private String phone;
    private String address;
    private String image;
    private String role;


    public String getEmail() {
        return email;
    }


    public String getUsername() {
        return username;
    }


    public CharSequence getPassword() {
        return password;
    }


    public String getGender() {
        return gender;
    }



    public String getFullName() {
        return fullName;
    }


    public String getPhone() {
        return phone;
    }


    public String getAddress() {
        return address;
    }



    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }



}
