package com.example.backend.service;

import com.example.backend.entity.Task;
import com.example.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    @Transactional(readOnly = true)
    public List<Task> getAllTasks(String search, Boolean status) {
        if ((search == null || search.trim().isEmpty()) && status == null) {
            return taskRepository.findAllByOrderByIsPinnedDescPriorityDescCreatedAtDesc();
        }
        return taskRepository.findAllWithFilters(status, search == null || search.trim().isEmpty() ? null : search);
    }

    @Transactional
    public Task createTask(Task task) {
        task.setCompleted(false); // Mặc định completed = false
        if (task.getPriority() == null) {
            task.setPriority(Task.Priority.medium);
        }
        if (task.getIsPinned() == null) {
            task.setIsPinned(false);
        }
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTask(Long id, Task updatedTask) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        
        if (updatedTask.getPriority() != null) {
            existingTask.setPriority(updatedTask.getPriority());
        }
        if (updatedTask.getIsPinned() != null) {
            existingTask.setIsPinned(updatedTask.getIsPinned());
        }
        
        return taskRepository.save(existingTask);
    }

    @Transactional
    public Task toggleComplete(Long id) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        existingTask.setCompleted(!existingTask.getCompleted());
        return taskRepository.save(existingTask);
    }

    @Transactional
    public void deleteTask(Long id) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(existingTask); // Sẽ tự động trigger Soft Delete qua @SQLDelete
    }

    @Transactional(readOnly = true)
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Transactional
    public Task togglePin(Long id) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        existingTask.setIsPinned(!existingTask.getIsPinned());
        return taskRepository.save(existingTask);
    }

    @Transactional(readOnly = true)
    public List<Task> getTrashedTasks() {
        return taskRepository.findTrashedTasks();
    }

    @Transactional
    public void restoreTask(Long id) {
        taskRepository.restoreTaskNative(id);
    }

    @Transactional
    public void forceDeleteTask(Long id) {
        taskRepository.forceDeleteTask(id);
    }

    @Transactional(readOnly = true)
    public List<Task> getAchievements() {
        return taskRepository.findAchievements();
    }
}
