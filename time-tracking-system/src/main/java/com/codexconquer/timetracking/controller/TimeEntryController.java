package com.codexconquer.timetracking.controller;

import com.codexconquer.timetracking.entity.TimeEntry;
import com.codexconquer.timetracking.service.TimeEntryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/time")
@RequiredArgsConstructor
public class TimeEntryController {

    private final TimeEntryService timeEntryService;

    @PostMapping("/punch-in")
    public TimeEntry punchIn(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return timeEntryService.punchIn(userId);
    }

    @PostMapping("/punch-out")
    public TimeEntry punchOut(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return timeEntryService.punchOut(userId);
    }
}
