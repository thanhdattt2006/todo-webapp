package com.example.backend.service;

import com.example.backend.entity.Task;
import com.example.backend.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    public void testGetAllTasks_WithoutFilters() {
        when(taskRepository.findAllByOrderByIsPinnedDescPriorityDescCreatedAtDesc())
                .thenReturn(List.of(new Task(), new Task()));

        List<Task> result = taskService.getAllTasks(null, null);

        assertEquals(2, result.size());
        verify(taskRepository, times(1)).findAllByOrderByIsPinnedDescPriorityDescCreatedAtDesc();
    }

    @Test
    public void testCreateTask_Success() {
        Task task = new Task();
        task.setTitle("Test Task");

        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Task createdTask = taskService.createTask(task);

        assertFalse(createdTask.getCompleted());
        assertEquals(Task.Priority.medium, createdTask.getPriority());
        assertFalse(createdTask.getIsPinned());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    public void testUpdateTask_NotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            taskService.updateTask(1L, new Task());
        });

        assertEquals("Task not found", exception.getMessage());
    }

    @Test
    public void testDeleteTask_NotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            taskService.deleteTask(1L);
        });

        assertEquals("Task not found", exception.getMessage());
    }
}
