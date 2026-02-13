package com.app.repository;

import com.app.entity.OtpSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpSessionRepository
        extends JpaRepository<OtpSession, Integer> {
}
