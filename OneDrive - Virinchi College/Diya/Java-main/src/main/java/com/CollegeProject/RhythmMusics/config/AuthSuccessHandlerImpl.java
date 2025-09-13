package com.CollegeProject.RhythmMusics.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collection;
import java.util.Set;

@Service
public class AuthSuccessHandlerImpl implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {

        Collection<? extends GrantedAuthority> grantedAuthority = authentication.getAuthorities();
        Set<String> roles = AuthorityUtils.authorityListToSet(grantedAuthority);

        //routeMapping
        //Simply it's just telling that if this route has come than
        //Map them to this routes
        if(roles.contains("ROLE_ADMIN")) {
            response.sendRedirect("admin/");
        } else {
            response.sendRedirect("login");
        }
    }
}
