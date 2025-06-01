package com.springboot.chatgpt.model;

import java.util.List;
import java.util.Map;

public class CvData {
    private String fullName;
    private String title;
    private String email;
    private String phone;
    private String address;
    private String dateOfBirth;
    private String nationality;
    private String aboutMe;

    private List<EducationEntry> education;
    private List<ExperienceEntry> experience;
    private List<ProjectsEntry> projects;

    private List<String> languages;
    private List<String> softSkills;
    private Map<String, Integer> digitalSkills;

    public CvData() {}

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }

    public String getAboutMe() { return aboutMe; }
    public void setAboutMe(String aboutMe) { this.aboutMe = aboutMe; }

    public List<EducationEntry> getEducation() { return education; }
    public void setEducation(List<EducationEntry> education) { this.education = education; }

    public List<ExperienceEntry> getExperience() { return experience; }
    public void setExperience(List<ExperienceEntry> experience) { this.experience = experience; }

    public List<ProjectsEntry> getProjects() { return projects; }
    public void setProjects(List<ProjectsEntry> projects) { this.projects = projects; }

    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages; }

    public List<String> getSoftSkills() { return softSkills; }
    public void setSoftSkills(List<String> softSkills) { this.softSkills = softSkills; }

    public Map<String, Integer> getDigitalSkills() { return digitalSkills; }
    public void setDigitalSkills(Map<String, Integer> digitalSkills) { this.digitalSkills = digitalSkills; }
}
