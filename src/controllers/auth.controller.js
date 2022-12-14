import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/Role.js";




export const signUp = async (req, res) => {

    const { username, email, password, roles } = req.body;



    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foudRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foudRoles.map(role => role._id)

    } else {
        const role = await Role.findOne({ name: "user" })
        newUser.roles = [role._id];

    }


    await newUser.save()
    .then(user => {
        console.log(user);
        const token = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).json({ token });
    })
    .catch(err => {
        res.status(400).send({ message: err });
    });


}



export const signIn = async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    }).populate("roles");

    console.log(user);

    if (!user) return res.status(400).json({ message: "User not found" });
    const matchPassword = await User.comparePassword(req.body.password, user.password);
    if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid password" });
    const token = jwt.sign({ id: user._id }, config.SECRET, {
        expiresIn: 86400
    })
    res.json({ token });



};