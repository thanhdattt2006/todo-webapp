package com.example.backend.controller;

import com.example.backend.entity.Task;
import com.example.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean status) {
        return ResponseEntity.ok(taskService.getAllTasks(search, status));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        return new ResponseEntity<>(taskService.createTask(task), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(id, task));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Task> toggleComplete(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.toggleComplete(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PatchMapping("/{id}/pin")
    public ResponseEntity<Task> togglePin(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.togglePin(id));
    }

    @GetMapping("/trash")
    public ResponseEntity<List<Task>> getTrashedTasks() {
        return ResponseEntity.ok(taskService.getTrashedTasks());
    }

    @PatchMapping("/{id}/restore")
    public ResponseEntity<Void> restoreTask(@PathVariable Long id) {
        taskService.restoreTask(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/force")
    public ResponseEntity<Void> forceDeleteTask(@PathVariable Long id) {
        taskService.forceDeleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/achievements")
    public ResponseEntity<List<Task>> getAchievements() {
        return ResponseEntity.ok(taskService.getAchievements());
    }
}
