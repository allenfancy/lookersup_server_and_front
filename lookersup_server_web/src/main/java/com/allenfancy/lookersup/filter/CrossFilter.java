package com.allenfancy.lookersup.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;
/***
 * 过滤器用于解决jquery ajax的跨域问题
 * @author allen.wu
 *
 */
public class CrossFilter extends OncePerRequestFilter {

	private static Logger logger = LoggerFactory.getLogger(CrossFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin", "*");
		if (request.getHeader("Access-Control-Request-Method") != null && "OPTIONS".equals(request.getMethod())) {
			response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
			response.addHeader("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Accept, sat");
		}
		filterChain.doFilter(request, response);
	}
}
