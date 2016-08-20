package net.smartworks.util.http;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

public class ServletUtil {

	public ServletUtil() {
		super();
	}
	
	public static String request(String url) throws Exception {
		return request(url, null, null);
	}

	public static String request(String url, String[] params, String enc) throws Exception {
		if (url == null)
			return null;
		HttpURLConnection con = null;
		try {
			con = (HttpURLConnection)new URL(url).openConnection();
			if (con == null)
				throw new Exception("Cannot open connection url: " + url);
			if (params != null && params.length != 0) {
				con.setRequestMethod("POST");
				con.setDoOutput(true);
			}
			
			con.connect();
			
			if (params != null && params.length != 0) {
				StringBuffer buf = new StringBuffer();
				String name = null;
				String value = null;
				if (enc == null)
					enc = "UTF-8";
				boolean first = true;
				
				DataOutputStream dos = new DataOutputStream(con.getOutputStream());
				dos.write(buf.toString().getBytes());
				dos.flush();
			}
			
			int resCode = con.getResponseCode();
			if (resCode != HttpURLConnection.HTTP_OK)
				throw new Exception("Communication error response code: " + resCode);
			
			return read(con);
			
		} catch (IOException e) {
			throw e;
		} finally {
			if (con != null)
				con.disconnect();
		}
	}
	private static String read(HttpURLConnection con) throws Exception {
		Reader reader = new InputStreamReader(con.getInputStream(), "UTF-8");
		StringBuffer buf = new StringBuffer();
		
		char[] chars = new char[1024];
		int len;
		while((len = reader.read(chars, 0, 1024)) != -1)
			buf.append(chars, 0, len);
		
		return buf.toString();
	}
//	private String requestBak(String url) throws Exception {
//		URL formUrl = new URL(url);
//		InputStream is = formUrl.openStream();
//		BufferedReader br = new BufferedReader(new InputStreamReader(is));
//		StringBuffer buf = new StringBuffer();
//		
//		String data;
//		while((data = br.readLine()) != null)
//			buf.append(data);
//		
//		return buf.toString();
//	}

}
