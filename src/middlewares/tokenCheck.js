import jwt from 'jsonwebtoken';
import Util from  '../helpers/Util'
import AdminService from '../services/adminService';
import searchForToken from '../middlewares/adminDataFromCookies';
const util = new Util();

 const AdminAuthentication = async (req, res, next) => {
  try {
    
    let token
    if (req.headers.authorization) {
      token = req.headers.authorization;
    } else {
      const adminData = await searchForToken(req.headers.cookie)
      console.log(adminData)
      token = adminData.token
    }
    
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    const decoded = await jwt.verify(token, "wildlife");
    console.log('.........')
    console.log(decoded)
    const loggedIn = await AdminService.findByEmail(decoded.email);
    if (loggedIn == null) {
      const Error = 'Login first To continue';
      util.setError(401, Error);
      return util.send(res);
    }
    req.userData = decoded;
    next();
  } catch (error) {
    util.setError(500, error.message);
    return util.send(res);
  }
};
export default AdminAuthentication