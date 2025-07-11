import UserServices from "../services/UserServices.js"

export const getuser = async (req, res) => {
    try {
        console.log(" Server is runing :")

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1) * limit;

        const { Name, useremail, group, role, permission } = req.body;

        const requiredRole = "686f6719dcd85d3c0a3414db";
        const logedUserRole = req.user.role._id.toString();
        const userRole = "686e6a8437d2302d4aa8608b";


        if (requiredRole === logedUserRole) {
            console.log("User is admin");
            const user = await UserServices.getUser(page, limit, skip, Name, useremail, group, userRole, permission);
            return res.status(user.status).json({
                message: user.message,
                data: user,
            });
        }
        if (userRole === logedUserRole) {
            console.log("User is normal user");
            return res.status(403).json({
                message: "You do not have permission to view this resource",
            });
        }
        
        console.log("User is super admin");
        const user = await UserServices.getUser(page, limit, skip, Name, useremail, group, role, permission);

        res.status(user.status).json({
            message: user.message,
            data: user,
        });
    } catch (error) {
        res.status(500).json({ message: "Error while get all User", error: error.message });
    }
}

export const createuser = async (req, res) => {
    try {
        const { Name, UserName, password, useremail, role, group, permission } = req.body;

        // const newUser = await UserServices.createUser( query );
        const newUser = await UserServices.createUser(Name, UserName, password, useremail, role, group, permission);
        res.status(newUser.status).json({ message: newUser.message, data: newUser.newUser, Token: newUser.token });
    } catch (error) {
        res.status(500).json({ message: "Error while Creating new user ", error: error.message });
    }
}

//for the user self regestration
export const regester = async (req, res) => {
    try {
        const { Name, UserName, password, useremail } = req.body;

        const user = await UserServices.createUser(Name, UserName, password, useremail);
        res.status(user.status).json({ message: user.message, data: user.newUser, Token: user.token });
    } catch (error) {
        res.status(500).json({ message: "Error while creating user ", error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { UserName, password } = req.body;

        const login = await UserServices.login(UserName, password);
        res.status(login.status).json({ message: login.message, user: login.user, Token: login.token, error: login.error });
    } catch (error) {
        res.status(500).json({ message: "Error while login ", error: error.message });
    }
}

export const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, UserName, password, useremail, } = req.body;
        const query = {};

        if (Name) query.Name = Name;
        if (UserName) query.UserName = UserName;
        if (password) query.password = password;
        if (useremail) query.useremail = useremail;

        const update = await UserServices.UpdateUser(id, query);
        res.status(update.status).json({ message: update.message, data: update.updateUser });
    } catch (error) {
        res.status(500).json({ message: "Error while updating User ", error: error.message });
    }
}

export const deluser = async (req, res) => {
    try {
        const { id } = req.params;

        const deluser = await UserServices.deleteUser(id);
        res.status(deluser.status).json({ message: deluser.message, data: deluser.deluser });
    } catch (error) {
        res.status(500).json({ message: "Error while delteing user ", error: error.message });
    }
}

export const Verify = async (req, res) => {
    try {
        const { token } = req.params;
        const verified = await UserServices.verifyEmail(token.toString());
        console.log("Verification result:", verified);
        res.status(verified.status).json({ message: verified.message });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token', error: error.message });
    }
}