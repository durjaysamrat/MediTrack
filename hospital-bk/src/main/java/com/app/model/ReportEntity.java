package com.app.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "reports")
public class ReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String patientName;

    @Column(nullable = false)
    private String reportType;

    @Column(nullable = false, length = 1000)
    private String reportData;

    // Constructors
    public ReportEntity() {}

    public ReportEntity(LocalDate date, String patientName, String reportType, String reportData) {
        this.date = date;
        this.patientName = patientName;
        this.reportType = reportType;
        this.reportData = reportData;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }

    public String getReportData() { return reportData; }
    public void setReportData(String reportData) { this.reportData = reportData; }
}
