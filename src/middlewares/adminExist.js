import Util from '../helpers/Util';
import AdminService  from '../services/AdminService';
const util = new Util();

const AdminExist = async (req,res,next)=>{
    try{
        let existedAdmin = await AdminService.findByEmail(req.body.email);
        
        if(existedAdmin != undefined) {
            util.setSuccess(201, 'This user already exists please loginin', existedAdmin.email);
            return util.send(res)
        }
        next()
    }catch(error){
        util.setError(500,console.log(error.message));
        return util.send(res);
    }
}

export default AdminExist