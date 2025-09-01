package com.CollegeProject.RhythmMusics.Controller;

import com.CollegeProject.RhythmMusics.Repository.StudentRepo;
import com.CollegeProject.RhythmMusics.model.Student;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentRepo studentRepo;

    // ✅ Constructor Injection (Spring will inject StudentRepo here)
    public StudentController(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }

    @PostMapping("/signup")
    public Student signup(@RequestBody Student student) {
        return studentRepo.save(student);
    }
}
