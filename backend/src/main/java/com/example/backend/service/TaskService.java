package com.example.backend.service;

import com.example.backend.entity.Task;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    @Transactional(readOnly = true)
    public List<Task> getAllTasks(String search, Boolean status) {
        log.info("Fetching all tasks with search='{}' and status='{}'", search, status);
        if ((search == null || search.trim().isEmpty()) && status == null) {
            return taskRepository.findAllByOrderByIsPinnedDescPriorityDescCreatedAtDesc();
        }
        return taskRepository.findAllWithFilters(status, search == null || search.trim().isEmpty() ? null : search);
    }

    @Transactional
    public Task createTask(Task task) {
        log.info("Creating new task: {}", task.getTitle());
        task.setCompleted(false); // Mặc định completed = false
        if (task.getPriority() == null) {
            task.setPriority(Task.Priority.medium);
        }
        if (task.getIsPinned() == null) {
            task.setIsPinned(false);
        }
        Task savedTask = taskRepository.save(task);
        log.info("Successfully created task with ID: {}", savedTask.getId());
        return savedTask;
    }

    @Transactional
    public Task updateTask(Long id, Task updatedTask) {
        log.info("Updating task with ID: {}", id);
        Task existingTask = getTaskByIdOrThrow(id);
        
        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        
        if (updatedTask.getPriority() != null) {
            existingTask.setPriority(updatedTask.getPriority());
        }
        if (updatedTask.getIsPinned() != null) {
            existingTask.setIsPinned(updatedTask.getIsPinned());
        }
        
        Task savedTask = taskRepository.save(existingTask);
        log.info("Successfully updated task with ID: {}", savedTask.getId());
        return savedTask;
    }

    @Transactional
    public Task toggleComplete(Long id) {
        log.info("Toggling complete status for task ID: {}", id);
        Task existingTask = getTaskByIdOrThrow(id);
        
        existingTask.setCompleted(!existingTask.getCompleted());
        Task savedTask = taskRepository.save(existingTask);
        log.info("Task ID: {} completed status is now: {}", id, savedTask.getCompleted());
        return savedTask;
    }

    @Transactional
    public void deleteTask(Long id) {
        log.info("Soft deleting task with ID: {}", id);
        Task existingTask = getTaskByIdOrThrow(id);
        taskRepository.delete(existingTask); // Sẽ tự động trigger Soft Delete qua @SQLDelete
        log.info("Successfully soft deleted task with ID: {}", id);
    }

    @Transactional(readOnly = true)
    public Task getTaskById(Long id) {
        log.info("Fetching task by ID: {}", id);
        return getTaskByIdOrThrow(id);
    }

    @Transactional
    public Task togglePin(Long id) {
        log.info("Toggling pin status for task ID: {}", id);
        Task existingTask = getTaskByIdOrThrow(id);
        existingTask.setIsPinned(!existingTask.getIsPinned());
        Task savedTask = taskRepository.save(existingTask);
        log.info("Task ID: {} pin status is now: {}", id, savedTask.getIsPinned());
        return savedTask;
    }

    @Transactional(readOnly = true)
    public List<Task> getTrashedTasks() {
        log.info("Fetching trashed tasks");
        return taskRepository.findTrashedTasks();
    }

    @Transactional
    public void restoreTask(Long id) {
        log.info("Restoring soft-deleted task with ID: {}", id);
        taskRepository.restoreTaskNative(id);
        log.info("Successfully restored task with ID: {}", id);
    }

    @Transactional
    public void forceDeleteTask(Long id) {
        log.info("Permanently deleting task with ID: {}", id);
        taskRepository.forceDeleteTask(id);
        log.info("Successfully permanently deleted task with ID: {}", id);
    }

    @Transactional(readOnly = true)
    public List<Task> getAchievements() {
        log.info("Fetching achievements (completed tasks)");
        return taskRepository.findAchievements();
    }

    private Task getTaskByIdOrThrow(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task không tồn tại với ID: " + id));
    }
}
