package beau;

import org.springframework.beans.factory.annotation.Autowired;

import com.tong.beau.dao.UserDao;
import com.tong.beau.dao.impl.UserDaoImpl;
import com.tong.beau.domain.User;
import com.tong.beau.util.RoleType;

public class Initializer {
	
	
	public Initializer() {}
	
	public void initialize() {
		UserDao userDao = new UserDaoImpl();
		User user = new User("zhou tong", "zhoutong", "zzzz_zt@hotmail.com", RoleType.ADMINISTRATOR);
		userDao.save(user);
	}
	
	public static void main(String[] args) {
		Initializer init = new Initializer();
		init.initialize();
	}
}
