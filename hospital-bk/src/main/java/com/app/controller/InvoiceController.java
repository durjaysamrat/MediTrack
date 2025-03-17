package com.app.controller;

import com.app.model.Invoice;
import com.app.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/pending")
    public List<Invoice> getPendingInvoices() {
        return invoiceService.getPendingInvoices();
    }

    @GetMapping("/paid")
    public List<Invoice> getPaidInvoices() {
        return invoiceService.getPaidInvoices();
    }

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return invoiceService.createInvoice(invoice);
    }

    @PutMapping("/{id}/status")
    public Invoice updateInvoiceStatus(@PathVariable Long id, @RequestParam String status) {
        return invoiceService.updateInvoiceStatus(id, status);
    }
}
