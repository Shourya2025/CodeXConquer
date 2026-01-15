package com.codexconquer.timetracking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatusSummaryResponse {
    private String status;
    private long totalMinutes;
    private long hours;
    private long minutes;
}
