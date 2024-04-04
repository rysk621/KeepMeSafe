package com.project.config;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;

// MyWebSocketConfig & MyWebSocketHandler 합친 버전
@Configuration
@EnableWebSocket // Boot WebSocket 활성화
public class MyWebSocketConfig extends TextWebSocketHandler implements WebSocketConfigurer {
	// 연결된 클라이언트들을 저장하는 Set
	public static Set<WebSocketSession> clients = Collections.synchronizedSet(new HashSet<WebSocketSession>());

	// WebSocket 연결명 설정 (http://localhost:8080/ws/emul) ==> WebSocketConfigurer
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(this, "ws/emul").setAllowedOrigins("*");
	}

	// Client가 접속 시 호출되는 메서드
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		clients.add(session);
		System.out.println(session + " 클라이언트 접속");
	}

	// Client가 접속 해제 시 호출되는 메서드
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println(session + " 클라이언트 접속 해제");
		clients.remove(session);
	}

	// Client에서 메시지가 왔을 때 호출되는 메서드
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message : " + message.getPayload());

	}

	// ***********************************************************
	// 테스트를 위해 10초 주기로 클라이언트로 메시지를 보낸다.
/*
	 * // 더미데이터 post to my server // String Url = "http://localhost:8080/postLog";
	 * // restTemplate.postForEntity(Url, w, Object.class); //결과 처리 1) DA로부터 정보
	 * 받기(진행중, 일단 임의 setting) w.setStatus(Status.SAFE);
	 * 
	 * //결과 처리 2) 현재상태 setting, DB에 저장 Long wId = Long.valueOf(w.getUsercode());
	 * StatusCur statusCur = statusRepo.findById(wId).get();
	 * statusCur.setStatus(w.getStatus()); statusRepo.save(statusCur); }
	 */
	// ***********************************************************
}
