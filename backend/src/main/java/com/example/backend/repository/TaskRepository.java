package com.example.backend.repository;

import com.example.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Sắp xếp mặc định: Pinned (Giữ lại trên cùng) -> Priority (Urgent > Medium > Low) -> Mới nhất
    List<Task> findAllByOrderByIsPinnedDescPriorityDescCreatedAtDesc();

    @Query("SELECT t FROM Task t WHERE " +
           "(:status IS NULL OR t.completed = :status) AND " +
           "(:search IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY t.isPinned DESC, t.priority DESC, t.createdAt DESC")
    List<Task> findAllWithFilters(@Param("status") Boolean status, @Param("search") String search);
}
