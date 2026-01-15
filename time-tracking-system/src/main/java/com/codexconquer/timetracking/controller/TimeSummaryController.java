package com.codexconquer.timetracking.controller;

import com.codexconquer.timetracking.dto.TimeSummaryResponse;
import com.codexconquer.timetracking.service.TimeEntryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/summary")
@RequiredArgsConstructor
public class TimeSummaryController {

    private final TimeEntryService timeEntryService;

    @GetMapping("/total")
    public TimeSummaryResponse getTotalTime(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return timeEntryService.getTotalWorkedTime(userId);
    }
}
