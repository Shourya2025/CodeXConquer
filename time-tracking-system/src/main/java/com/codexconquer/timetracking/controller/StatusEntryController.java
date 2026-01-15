package com.codexconquer.timetracking.controller;

import com.codexconquer.timetracking.dto.StatusSummaryResponse;
import com.codexconquer.timetracking.entity.StatusEntry;
import com.codexconquer.timetracking.entity.WorkStatus;
import com.codexconquer.timetracking.service.StatusEntryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/status")
@RequiredArgsConstructor
public class StatusEntryController {

    private final StatusEntryService statusEntryService;

    @PostMapping("/{status}")
    public StatusEntry startStatus(@PathVariable WorkStatus status) {
        Long userId = 1L;   // temp
        return statusEntryService.startStatus(userId, status);
    }

    @PostMapping("/stop")
    public StatusEntry stopStatus() {
        Long userId = 1L;   // temp
        return statusEntryService.stopStatus(userId);
    }

    @GetMapping("/summary")
    public List<StatusSummaryResponse> getStatusSummary() {
        Long userId = 1L;   // temp
        return statusEntryService.getStatusSummary(userId);
    }

}
