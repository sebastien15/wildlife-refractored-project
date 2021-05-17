import Util from '../helpers/Util';
import AdminService  from '../services/adminService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const util = new Util();

export default class Admin {
    
    static async CreateAdmin(req,res) {
        try{
            let hashedPassword = bcrypt.hashSync(req.body.password, 8);
            const admin = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                Adminname: req.body.Adminname,
                email: req.body.email,
                password: hashedPassword
            }
            const newAdmin = await AdminService.createAdmin(admin);
            const response = {
                id: newAdmin.id,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                email: newAdmin.email
            }
            let token = jwt.sign(response, "wildlife", {
                expiresIn: 86400
            });
            res.cookie('auth',token);
            util.setSuccess(201,'You have successfuly create a admin', newAdmin,"/animals", token);
            return util.send(res);
        }catch(error){
            util.setError(500,console.log(error.message));
            return util.send(res);
        }
    }
    static async LoginAdmin(req,res){
        try {
           
            const admin = await AdminService.findByEmail(req.body.email);
            if (!admin) return res.status(404).send('No user found.');
            let passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);
            if (!passwordIsValid) {
                util.setError(401, "email or password don't match our records");
                return util.send(res)
                // return res.status(401).send({ auth: false, token: null });
            } 
            const response = {
                id: admin.id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email
            }
            let token = jwt.sign(response, "wildlife", {
                expiresIn: 86400 // expires in 24 hours
            });
            res.cookie('auth',token);
            util.setSuccess(201,"you have successuly logged in ", passwordIsValid,"/animals", token)
            util.send(res)
        } catch (error) {
            util.setError(500,console.log(error.message));
            return util.send(res);
        }
    }
    static async retrieveAdmin(req,res) {
        try {
            const Admins = await AdminService.retrieveAdmin();
            util.setSuccess(200,"you have successfully retrieved all Admins", Admins);
            return util.send(res)
        } catch (error) {
            util.setError(500,console.log(error.message));
            return util.send(res)
        }
    }
    static async findAdmin(req,res){
        try {
            const {id} = req.params;
            const admin = await AdminService.findAdminById(id);
            util.setSuccess(200, 'You have successfully retrieved a admin!',admin);
            util.send(res);
        } catch (error) {
            util.setError(500,console.log(error.message));
            return util.send(res)
        }
    }
    static async deleteAdmin(req,res){
        try {
            const {id} = req.params;
            const admin = await AdminService.deleteAdmin(id);
            util.setSuccess(201, 'You have successfully deleted a admin!',admin);
            util.send(res);
        } catch (error) {
            util.setError(500,console.log(error.message));
            return util.send(res)
        }
    }
    static async updateAdmin(req,res){
        try {
            const admin = {
                Adminname: req.body.Adminname,
                email: req.body.email,
                password: req.body.password
            }
            const  { id } = req.params;
            const updateAdmin = await AdminService.updateAdminAt(admin,{id:id});

            util.setSuccess(201,'Admin updated successfully', updateAdmin);
            return util.send(res);
        } catch (error) {
            util.setError(500,console.log(error.message));
            return util.send(res)
        }
    }
}