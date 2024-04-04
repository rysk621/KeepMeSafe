package com.project.config.filter;

import java.io.IOException;
import java.util.Date;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.Admin;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		ObjectMapper mapper = new ObjectMapper();
		Admin admin = null;
		try {
			admin = mapper.readValue(request.getInputStream(), Admin.class);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		System.out.println(admin.getId()); // login id
		System.out.println(admin.getPassword()); // login password

		Authentication authToken = new UsernamePasswordAuthenticationToken(admin.getId(), admin.getPassword());
		Authentication auth = authenticationManager.authenticate(authToken);
		System.out.println("auth : " + auth);
		return auth;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		User user = (User) authResult.getPrincipal();
		String token = JWT.create().withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 유효시간 30분
				.withClaim("username", user.getUsername()).sign(Algorithm.HMAC256("edu.pnu.jwt"));
		System.out.println("\nadmin(" + user.getUsername() + ") login successed\n"); // login id 가져옴
		response.addHeader("Authorization", "Bearer " + token);
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		response.sendError(401);
		System.out.println("\nlogin failed\n");
	}
}
