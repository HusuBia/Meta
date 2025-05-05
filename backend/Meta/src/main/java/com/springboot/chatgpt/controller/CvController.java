package com.springboot.chatgpt.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.chatgpt.model.CvData;
import com.springboot.chatgpt.service.CvPdfService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/cv")
public class CvController {

    private final CvPdfService cvPdfService;
    private final ObjectMapper objectMapper;

    public CvController(CvPdfService cvPdfService, ObjectMapper objectMapper) {
        this.cvPdfService = cvPdfService;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> generateCvWithImage(
            @RequestPart("cv") String cvJson,
            @RequestPart("image") MultipartFile imageFile) {
        //System.out.println("Received file: " + imageFile.getOriginalFilename());

        try {
            CvData data = objectMapper.readValue(cvJson, CvData.class);
            byte[] pdf = cvPdfService.generatePdf(data, imageFile);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=cv.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}