package com.springboot.chatgpt.service;

import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import com.springboot.chatgpt.dto.CvData;
import com.springboot.chatgpt.dto.EducationEntry;
import com.springboot.chatgpt.dto.ExperienceEntry;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;

@Service
public class CvPdfService {

    public byte[] generatePdf(CvData data, MultipartFile imageFile) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document doc = new Document(pdf);

        Table layout = new Table(UnitValue.createPercentArray(new float[]{1, 2}));
        layout.setWidth(UnitValue.createPercentValue(100));

        Cell leftCol = new Cell();
        leftCol.setBackgroundColor(ColorConstants.DARK_GRAY);
        leftCol.setPadding(10);
        leftCol.setBorder(Border.NO_BORDER);

        try {
            if (imageFile != null && !imageFile.isEmpty()) {
                ImageData imageData = ImageDataFactory.create(imageFile.getBytes());
                Image image = new Image(imageData).setWidth(100).setAutoScale(true).setMarginBottom(10);
                leftCol.add(image);
            }
        } catch (Exception e) {
            System.err.println("Eroare la afisarea imaginii: " + e.getMessage());
        }

        leftCol.add(new Paragraph("Personal details").setBold().setFontColor(ColorConstants.WHITE));
        leftCol.add(infoLineWhite("Name", data.getFullName()));
        leftCol.add(infoLineWhite("Email", data.getEmail()));
        leftCol.add(infoLineWhite("Phone", data.getPhone()));
        leftCol.add(infoLineWhite("Address", data.getAddress()));
        leftCol.add(infoLineWhite("Birthdate", data.getDateOfBirth()));
        leftCol.add(infoLineWhite("Nationality", data.getNationality()));

        leftCol.add(new Paragraph("\nLanguages").setBold().setFontColor(ColorConstants.WHITE));
        for (String lang : data.getLanguages()) {
            leftCol.add(new Paragraph("• " + lang).setFontColor(ColorConstants.WHITE));
        }

        leftCol.add(new Paragraph("\nSoft Skills").setBold().setFontColor(ColorConstants.WHITE));
        for (String skill : data.getSoftSkills()) {
            leftCol.add(new Paragraph("• " + skill).setFontColor(ColorConstants.WHITE));
        }

        Cell rightCol = new Cell();
        rightCol.setBorder(Border.NO_BORDER);
        rightCol.setPadding(15);

        rightCol.add(new Paragraph(data.getFullName())
                .setBold()
                .setFontSize(18)
                .setTextAlignment(TextAlignment.LEFT));

        rightCol.add(new Paragraph("\n"));

        rightCol.add(sectionTitle("Professional experience"));
        for (ExperienceEntry exp : data.getExperience()) {
            rightCol.add(new Paragraph(exp.getJobTitle() + " - " + exp.getEmployer()).setBold());
            rightCol.add(new Paragraph(exp.getStartDate() + " - " + exp.getEndDate()));
            rightCol.add(new Paragraph(exp.getDescription()).setMarginBottom(10));
        }

        rightCol.add(sectionTitle("Education"));
        for (EducationEntry edu : data.getEducation()) {
            rightCol.add(new Paragraph(edu.getDegree() + " - " + edu.getInstitution()).setBold());
            rightCol.add(new Paragraph(edu.getStartDate() + " - " + edu.getEndDate()));
            rightCol.add(new Paragraph(edu.getDescription()).setMarginBottom(10));
        }

        rightCol.add(sectionTitle("Digital skills"));
        for (String skill : data.getDigitalSkills()) {
            rightCol.add(drawSkillBar(skill, 4));
        }

        layout.addCell(leftCol);
        layout.addCell(rightCol);

        doc.add(layout);
        doc.close();
        return out.toByteArray();
    }

    private Paragraph sectionTitle(String title) {
        return new Paragraph(title)
                .setBold()
                .setFontSize(14)
                .setFontColor(ColorConstants.BLUE)
                .setMarginTop(10);
    }

    private Paragraph infoLineWhite(String label, String value) {
        return new Paragraph()
                .add(new Text(label + ": ").setBold().setFontColor(ColorConstants.WHITE))
                .add(new Text(value).setFontColor(ColorConstants.WHITE))
                .setFontSize(10);
    }

    private Paragraph drawSkillBar(String skill, int level) {
        Paragraph p = new Paragraph(skill).setFontSize(10);
        for (int i = 1; i <= 5; i++) {
            Text dot = new Text(" ● ");
            dot.setFontColor(i <= level ? ColorConstants.DARK_GRAY : ColorConstants.LIGHT_GRAY);
            p.add(dot);
        }
        return p.setMarginBottom(5);
    }
}