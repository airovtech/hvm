package net.smartworks.util;

import org.springframework.security.core.context.SecurityContextHolder;

import net.smartworks.model.UserInfo;
import net.smartworks.security.Login;

public class HvmUtil {

	public static Login getCurrentUserInfo() throws Exception {
		
		//spring security 에서 로그인사용자를 가져온다.
//		UserInfo testUser = new UserInfo();
//		testUser.setId("tester@smartworks.net");
//		testUser.setPassword("passwd");
//		testUser.setUsername("테스터");
//		
//		return testUser;
		
		
//		Login user = new Login("tester","1","테스터","pic.jpg");
//		return user;

        Login userDetails = (Login)SecurityContextHolder.getContext().getAuthentication().getDetails();
        return userDetails;
//		
//		return userDetails;
			
				
	}
	
	
}
