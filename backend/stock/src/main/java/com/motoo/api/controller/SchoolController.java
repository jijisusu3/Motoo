package com.motoo.api.controller;

import com.motoo.api.service.SchoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SchoolController {
    private final SchoolService schoolService;

    @GetMapping("/api2/school")
    public ResponseEntity<?> ReadSchool(){
        return ResponseEntity.ok(schoolService.getSchoolList());
    }
}
