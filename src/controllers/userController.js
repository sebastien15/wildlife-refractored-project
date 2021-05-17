import Util from '../helpers/Util';
import UserService  from '../services/userService';

const util = new Util();

export default class User {
    static async CreateUser(req,res) {
        try{
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
            const newUser = await UserService.createUser(user);
            util.setSuccess(201,'You have successfuly create a user', newUser);
            return util.send(res);
        }catch(error){
            util.setError(500,console.log(error.message));
            return util.send(res);
        }
    }
    static async retrieveUser(req,res) {
        try {
            const users = await UserService.retrieveUser();
            util.setSuccess(200,"you have successfully retrieved all users", users);
            return util.send(res)
        } catch (error) {
            util.setError(500,console.log(error.message));
            return util.send(res)
        }
    }
    static async findUser(req,res){
        try {
            const {id} = req.params;
            const user = await UserService.findUserById(id);
            util.setSuccess(200, 'You have successfully retrieved a user!',user);
            util.send(res);
        } catch (error) {
            util.setError(500,console.log(error.message));
            return util.send(res)
        }
    }
    static async deleteUser(req,res){
        try {
            const {id} = req.params;
            const user = await UserService.deleteUser(id);
            util.setSuccess(201, 'You have successfully deleted a user!',user);
            util.send(res);
        } catch (error) {
            util.setError(500,console.log(error.message));
            return util.send(res)
        }
    }
    static async updateUser(req,res){
        try {
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
            const  { id } = req.params;
            const updateUser = await UserService.updateUserAt(user,{id:id});

            util.setSuccess(201,'User updated successfully', updateUser);
            return util.send(res);
        } catch (error) {
            util.setError(500,console.log(error.message));
            return util.send(res)
        }
    }
}