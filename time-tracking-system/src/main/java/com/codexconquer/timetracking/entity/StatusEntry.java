package com.codexconquer.timetracking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;
import java.time.LocalDateTime;
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatusEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private WorkStatus status;   // ENUM, not String

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public long getDurationMinutes() {
        if (startTime == null || endTime == null) {
            return 0;
        }
        return Duration.between(startTime, endTime).toMinutes();
    }
}
