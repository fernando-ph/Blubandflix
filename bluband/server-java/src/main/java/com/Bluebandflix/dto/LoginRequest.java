package com.Bluebandflix.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;

    public Object getUsername() {
        return username;
    }

    public void setUsername(Object username) {
        this.username = (String) username;
    }

    public Object getPassword() {
        return password;
    }

    public void setPassword(Object password) {
        this.password = (String) password;
    }
}
