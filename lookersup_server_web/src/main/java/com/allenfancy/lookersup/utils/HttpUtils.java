package com.allenfancy.lookersup.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ConnectException;
import java.net.URL;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

public class HttpUtils {
	/**
	 * 
	 * httpRequest:(发起https请求并获取结果).
	 * 
	 * @author hankeqi
	 * @param @param requestUrl 请求地址
	 * @param @param requestMethod 请求方式（GET、POST）
	 * @param @param outputStr 提交的数据
	 * @param @return JSONObject(通过JSONObject.get(key)的方式获取json对象的属性值)
	 * @throws JSONObject
	 *             DOM对象
	 * @since JDK 1.7
	 */

	public static Map<String, String> httpRequest(String requestUrl,
			String requestMethod, String outputStr) {
		StringBuffer buffer = new StringBuffer();
		try {
			URL url = new URL(requestUrl);
			HttpsURLConnection httpUrlConn = (HttpsURLConnection) url
					.openConnection();
			// httpUrlConn.setSSLSocketFactory(ssf);
			httpUrlConn.setDoOutput(true);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);
			httpUrlConn.setRequestMethod(requestMethod);// 设置请求方式（GET/POST）
			if ("GET".equalsIgnoreCase(requestMethod))
				httpUrlConn.connect();
			if (null != outputStr) {// 当有数据需要提交时
				OutputStream outputStream = httpUrlConn.getOutputStream();
				outputStream.write(outputStr.getBytes("UTF-8"));// 注意编码格式，防止中文乱码
				outputStream.close();
			}
			InputStream inputStream = httpUrlConn.getInputStream();// 将返回的输入流转换成字符串
			InputStreamReader inputStreamReader = new InputStreamReader(
					inputStream, "utf-8");
			BufferedReader bufferedReader = new BufferedReader(
					inputStreamReader);
			String str = null;
			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}
			bufferedReader.close();
			inputStreamReader.close();
			inputStream.close();// 释放资源
			inputStream = null;
			httpUrlConn.disconnect();
		} catch (ConnectException ce) {
		} catch (Exception e) {
		}
		Map<String, String> map1 = (Map<String, String>) JSON.parse(buffer
				.toString());
		return map1;
	}
}
