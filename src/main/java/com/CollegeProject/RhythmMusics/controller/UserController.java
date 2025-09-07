import com.CollegeProject.RhythmMusics.model.User;
import com.CollegeProject.RhythmMusics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

//    @Autowired
//    private UserRepository userRepository;

    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        model.addAttribute("user", new User());  // <-- IMPORTANT
        return "signup";
    }

    @PostMapping("/signup")
    public String processSignup(@ModelAttribute("user") User user) {
        // save user to database
        System.out.println("User Registered: " + user.getFullName());
        return "redirect:/login";
    }
//        userRepository.save(user);
//        return "redirect:/login"; // after success
//    }
}
