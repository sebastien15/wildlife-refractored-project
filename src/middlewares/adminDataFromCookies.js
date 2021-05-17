import jwt from 'jsonwebtoken';

const searchForToken = async(authtoken)=>{
    let token
    let n = authtoken.search("auth=");
    let firstIndex = n+5;
    token = authtoken.slice(firstIndex,authtoken.length)
    const decoded = await jwt.verify(token, "wildlife");

    const adminData = {
      token:token,
      decoded: decoded
    }
    return adminData
  }

export default searchForToken