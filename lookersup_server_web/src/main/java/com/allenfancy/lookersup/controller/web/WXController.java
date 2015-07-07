package com.allenfancy.lookersup.controller.web;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.expression.spel.ast.OpNE;

import com.allenfancy.lookersup.utils.HttpUtils;

import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.mp.api.WxMpInMemoryConfigStorage;
import me.chanjar.weixin.mp.api.WxMpServiceImpl;
import me.chanjar.weixin.mp.bean.result.WxMpUserList;

public class WXController {
	  
	 
	
	public static void main(String[] args){
		WxMpInMemoryConfigStorage config = new WxMpInMemoryConfigStorage();
		Properties p = new Properties();
		try {
			p.load(WXController.class.getResourceAsStream("/wxConfig.properties"));
			String appId = p.getProperty("AppID");
			String appSecret = p.getProperty("AppSecret");
			config.setAppId(appId);
			config.setSecret(appSecret);
			WxMpServiceImpl wxMpService = new WxMpServiceImpl();
			wxMpService.setWxMpConfigStorage(config);
			WxMpUserList list  = wxMpService.userList(null);
			String token = wxMpService.getAccessToken();
			System.out.println("token:"+token);
			getOpendId(token,list.getOpenIds());
		//	getIPAddress(token);
		//	divideGroup(token);
		//	queryGroup(token);
		//	getUserFromOpenId(token);
		//	updateGroupName(token);
		//	moveGroup(token);
		//	updateRemark(token);
			tempqRCode(token);
			uploadImg(token);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (WxErrorException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void getOpendId(String token,List<String> openIds){
		for(int i = 0;i< openIds.size();i++){
			System.out.println("openId:"+openIds.get(i));
			getUserList(token,openIds.get(i));
		}
	}
	
	/**
	 * 获取微信服务器IP地址
	 * @param token
	 */
	public static void getIPAddress(String token){
		String url = "https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token="+token;
		Map<String,String> maps = HttpUtils.httpRequest(url, "GET","");
		System.out.println("获取微信服务器IP地址:"+maps);
	}
	/**
	 * 分组管理
	 * @param token
	 */
	public static void divideGroup(String token){
		String url = "https://api.weixin.qq.com/cgi-bin/groups/create?access_token="+token;
		String json = "{\"group\":{\"name\":\"吴涛分组测试\"}}";
		Map<String,String> maps = HttpUtils.httpRequest(url, "POST", json);
		System.out.println("分组管理:"+maps);
	}
	/**
	 * 查询所有的分组管理
	 * @param token
	 */
	public static void queryGroup(String token){
		String url = "https://api.weixin.qq.com/cgi-bin/groups/get?access_token="+token;
		Map<String,String> maps = HttpUtils.httpRequest(url, "GET", "");
		System.out.println("查询所有的分组管理:"+maps);
	}
	/**
	 * 根据openId查询用户所在分组
	 * @param token
	 */
	public static void getUserFromOpenId(String token){
		String openId = "o9pOCv6sG7Cw2Z3QAueOnwQMuxWc";
		String json ="{\"openid\":\"o9pOCv6sG7Cw2Z3QAueOnwQMuxWc\"}";
		String urls = "https://api.weixin.qq.com/cgi-bin/groups/getid?access_token="+token;
		Map<String,String> maps = HttpUtils.httpRequest(urls, "POST", json);
		System.out.println("根据openId查询用户所在分组:"+maps);	
	}
	
	//修改分组名
	public static void updateGroupName(String token){
		String url = "https://api.weixin.qq.com/cgi-bin/groups/update?access_token="+token;
		String json = "{\"group\":{\"id\":102,\"name\":\"吴涛测试-修改\"}}";
		Map<String,String> maps = HttpUtils.httpRequest(url, "POST", json);
		System.out.println("修改分组名:"+maps);
	}
	
	//移动用户分组
	public static void moveGroup(String token){
		String url = "https://api.weixin.qq.com/cgi-bin/groups/members/update?access_token="+token;
		String json = "{\"openid\":\"o9pOCv6sG7Cw2Z3QAueOnwQMuxWc\",\"to_groupid\":2}";
		Map<String,String> maps = HttpUtils.httpRequest(url, "POST", json);
		System.out.println("移动用户分组:"+maps);
	}
	//设置备注名
	public static void updateRemark(String token){
		String url = "https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token="+token;
		String json = "{\"openid\":\"o9pOCv6sG7Cw2Z3QAueOnwQMuxWc\",\"remark\":\"Iverson\"}";
		Map<String,String> maps = HttpUtils.httpRequest(url, "POST", json);
		System.out.println("设置备注名:"+maps);
	}
	
	//获取用户信息
	public static void getUserList(String token,String openId){
		String url ="https://api.weixin.qq.com/cgi-bin/user/get?access_token="+token+"&next_openid=" +openId;
		Map<String,String> maps = HttpUtils.httpRequest(url, "GET", null);
		System.out.println("获取用户信息:"+maps);
	}
	//临时二维码请求说明
	public static void tempqRCode(String token){
		String url  = " https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token="+token;
		String json = "{\"expire_seconds\": 604800, \"action_name\": \"QR_SCENE\", \"action_info\": {\"scene\": {\"scene_id\": 123}}}";
		Map<String,String> maps = HttpUtils.httpRequest(url, "POST", json);
		System.out.println("临时二维码请求说明:"+maps);
	}
	
	//上传图片
	public static void uploadImg(String token){
		String url = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token="+token+"&type=image";
		
		Map<String,String> maps = HttpUtils.httpRequest(url, "POST", null);
		System.out.println("上传图片:"+maps);
	}
	
	//上传声音
	public static void uploadVoice(String token){}
	
	//上传图片
	public static void uploadvideo(String token){}
}
