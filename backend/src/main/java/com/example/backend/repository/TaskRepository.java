package com.example.backend.repository;

import com.example.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Sắp xếp mặc định: Pinned (Giữ lại trên cùng) -> Priority (Urgent > Medium > Low) -> Mới nhất
    List<Task> findAllByOrderByIsPinnedDescPriorityDescCreatedAtDesc();
}
