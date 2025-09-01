package com.CollegeProject.RhythmMusics.Repository;

import com.CollegeProject.RhythmMusics.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Long> {
}
