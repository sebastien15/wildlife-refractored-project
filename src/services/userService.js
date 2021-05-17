import {User} from '../../models';

class UserService{
    static createUser(newUser) {
        return User.create(newUser);
    }
    static retrieveUser(){
        return User.findAll();
    }
    static findUserById(modelId){
        return User.findOne({
            where: {id:modelId},
        });
    }
    static updateUserAt(set,prop){   
        return User.update(set,{
            where:prop,
        });
    }
    static deleteUser(modelId) {
        return User.destroy(
            {
                where: {id:modelId}
            }
        );
    }
}

export default UserService;

