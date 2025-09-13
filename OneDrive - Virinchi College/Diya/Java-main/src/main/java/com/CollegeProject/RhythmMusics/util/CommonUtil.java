package com.CollegeProject.RhythmMusics.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;


@Component
public class CommonUtil {

    @Autowired
    JavaMailSender mailSender;

    //TO send Email
    public Boolean sendMail (String url , String recipientEmail) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        //Set Data
        helper.setFrom("maharjandiya74@gmail.com", "ShoeHub");
        helper.setTo(recipientEmail);



        String content =  "<p>Hello,</p>" + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>" + "<p><a href=\"" + url
                + "\">Change password</a></p>";

        helper.setSubject("Password Reset"); //To Set Subject
        helper.setText(content, true);  //To set the Body
        mailSender.send(message);   //TO send The message

        return true;
    }

    //TO generate Url
    public static String generateUrl(HttpServletRequest request) {
        String url = request.getRequestURL().toString();
        return url.replace(request.getServletPath(), "");
    }
}
