package com.example.backend.exception;

public record ErrorResponse(
    String timestamp,
    int status,
    String error,
    String message,
    String path
) {}
