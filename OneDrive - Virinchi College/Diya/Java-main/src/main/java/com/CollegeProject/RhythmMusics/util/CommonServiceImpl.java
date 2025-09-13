package com.CollegeProject.RhythmMusics.util;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class CommonServiceImpl {

    //To remove the Session on new Refresh
    public void removeSessionMessage(){
        HttpServletRequest request = ((ServletRequestAttributes)(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpSession session = request.getSession();
        session.removeAttribute("succMsg");
        session.removeAttribute("errorMsg");
    }
}
