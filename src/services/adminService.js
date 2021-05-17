
import {Admin} from '../../models';

class AdminService{
    static createAdmin(newAdmin) {
        return Admin.create(newAdmin);
    }
    static retrieveAdmin(){
        return Admin.findAll();
    }
    static findAdminById(modelId){
        return Admin.findOne({
            where: {id:modelId},
        });
    }
    static updateAdminAt(set,prop){   
        return Admin.update(set,{
            where:prop,
        });
    }
    static findByEmail(prop) {
        return Admin.findOne({
          where: { email: prop },
        });
    }
    static deleteAdmin(modelId) {
        return Admin.destroy(
            {
                where: {id:modelId}
            }
        );
    }
}

export default AdminService;