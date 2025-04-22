package com.springboot.chatgpt.service;

import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.UnitValue;
import com.itextpdf.layout.property.VerticalAlignment;
import com.springboot.chatgpt.dto.CvData;
import com.springboot.chatgpt.dto.EducationEntry;
import com.springboot.chatgpt.dto.ExperienceEntry;
import com.springboot.chatgpt.dto.ProjectsEntry;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@Service
public class CvPdfService {

    public byte[] generatePdf(CvData data, MultipartFile imageFile) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document doc = new Document(pdf);

            PdfFont font = PdfFontFactory.createFont(
                    "src/main/resources/fonts/DejaVuSans.ttf",
                    "Identity-H",
                    PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED
            );
            doc.setFont(font);

            Table header = new Table(UnitValue.createPercentArray(new float[]{1, 3}));
            header.setWidth(UnitValue.createPercentValue(100));

            try {
                if (imageFile != null && !imageFile.isEmpty()) {
                    ImageData imageData = ImageDataFactory.create(imageFile.getBytes());
                    Image image = new Image(imageData).setWidth(80).setAutoScale(true);
                    header.addCell(new Cell().add(image).setBorder(Border.NO_BORDER));
                }
            } catch (Exception e) {
                System.err.println("Image error: " + e.getMessage());
            }

            Paragraph nameTitle = new Paragraph()
                    .add(new Text(data.getFullName() + "\n").setFontSize(18).setBold())
                    .add(new Text(data.getTitle() + "\n").setFontSize(12).setItalic().setFontColor(ColorConstants.GRAY));
            header.addCell(new Cell().add(nameTitle).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER));
            doc.add(header);

            doc.add(new LineSeparator(new SolidLine()));

            Table layout = new Table(UnitValue.createPercentArray(new float[]{1, 2}));
            layout.setWidth(UnitValue.createPercentValue(100));

            Cell leftCol = new Cell().setBackgroundColor(new DeviceRgb(40, 63, 99)).setPadding(10).setBorder(Border.NO_BORDER);
            Cell rightCol = new Cell().setBorder(Border.NO_BORDER).setPadding(15);

            leftCol.add(sectionHeader("Personal Details", true));
            leftCol.add(infoLineWhite("Email", data.getEmail()));
            leftCol.add(infoLineWhite("Phone", data.getPhone()));
            leftCol.add(infoLineWhite("Address", data.getAddress()));
            leftCol.add(infoLineWhite("Birthdate", data.getDateOfBirth()));
            leftCol.add(infoLineWhite("Nationality", data.getNationality()));

            leftCol.add(sectionHeader("Languages", true));
            for (String lang : data.getLanguages()) {
                leftCol.add(new Paragraph("• " + lang).setFontColor(ColorConstants.WHITE).setFontSize(9));
            }

            leftCol.add(sectionHeader("Soft Skills", true));
            for (String skill : data.getSoftSkills()) {
                leftCol.add(new Paragraph("• " + skill).setFontColor(ColorConstants.WHITE).setFontSize(9));
            }

            if (data.getAboutMe() != null && !data.getAboutMe().isBlank()) {
                rightCol.add(sectionHeader("About Me", false));
                rightCol.add(new Paragraph(data.getAboutMe()).setFont(font).setFontSize(10));
            }

            rightCol.add(sectionHeader("Work Experience", false));
            for (ExperienceEntry exp : data.getExperience()) {
                rightCol.add(new Paragraph(exp.getJobTitle()).setFont(font).setBold());
                rightCol.add(new Paragraph(exp.getEmployer() + " | " + exp.getStartDate() + " - " + exp.getEndDate())
                        .setFont(font).setFontSize(9).setFontColor(ColorConstants.GRAY));
                rightCol.add(createPdfListFromDescription(exp.getDescription(), font));
            }

            rightCol.add(sectionHeader("Education", false));
            for (EducationEntry edu : data.getEducation()) {
                rightCol.add(new Paragraph(edu.getDegree()).setFont(font).setBold());
                rightCol.add(new Paragraph(edu.getInstitution() + " | " + edu.getStartDate() + " - " + edu.getEndDate())
                        .setFont(font).setFontSize(9).setFontColor(ColorConstants.GRAY));
                rightCol.add(new Paragraph(edu.getDescription()).setFont(font).setFontSize(10).setMarginBottom(10));
            }

            rightCol.add(sectionHeader("Projects", false));
            for (ProjectsEntry proj : data.getProjects()) {
                rightCol.add(new Paragraph(proj.getProjectTitle()).setFont(font).setBold());
                rightCol.add(new Paragraph(proj.getStartDate() + " - " + proj.getEndDate())
                        .setFont(font).setFontSize(9).setFontColor(ColorConstants.GRAY));
                if (proj.getTechnologies() != null && !proj.getTechnologies().isEmpty()) {
                    rightCol.add(new Paragraph("Technologies: " + String.join(", ", proj.getTechnologies()))
                            .setFont(font).setFontSize(9));
                }
                rightCol.add(new Paragraph(proj.getDescription()).setFont(font).setFontSize(10));
            }

            rightCol.add(sectionHeader("Skills", false));
            for (Map.Entry<String, Integer> entry : data.getDigitalSkills().entrySet()) {
                rightCol.add(drawSkillSquares(entry.getKey(), entry.getValue(), font));
            }

            layout.addCell(leftCol);
            layout.addCell(rightCol);
            doc.add(layout);

            doc.close();
        } catch (IOException e) {
            throw new RuntimeException("PDF generation failed", e);
        }

        return out.toByteArray();
    }

    private Paragraph sectionHeader(String title, boolean white) {
        Paragraph p = new Paragraph(title.toUpperCase())
                .setBold()
                .setFontSize(11)
                .setMarginTop(12)
                .setMarginBottom(4);
        return white ? p.setFontColor(ColorConstants.WHITE) : p.setFontColor(new DeviceRgb(40, 63, 99));
    }

    private Paragraph infoLineWhite(String label, String value) {
        return new Paragraph()
                .add(new Text(label + ": ").setBold().setFontColor(ColorConstants.WHITE))
                .add(new Text(value).setFontColor(ColorConstants.WHITE))
                .setFontSize(9)
                .setMarginBottom(2);
    }

    private Paragraph drawSkillSquares(String skill, int level, PdfFont font) {
        StringBuilder bars = new StringBuilder();
        for (int i = 0; i < 5; i++) {
            bars.append(i < level ? "★" : "☆");
        }
        return new Paragraph(skill + ": " + bars)
                .setFont(font)
                .setFontSize(10)
                .setMarginBottom(5);
    }

    private com.itextpdf.layout.element.List createPdfListFromDescription(String description, PdfFont font) {
        com.itextpdf.layout.element.List list = new com.itextpdf.layout.element.List()
                .setSymbolIndent(10)
                .setListSymbol("•")
                .setFontSize(9);

        for (String line : description.split("\n")) {
            ListItem item = new ListItem(line.trim());
            item.setFont(font);
            list.add(item);
        }

        return list;
    }

}
