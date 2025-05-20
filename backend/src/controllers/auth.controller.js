import { generateToken } from "../lib/utils.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    const { email, fullName, password } = req.body;

    try {
        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Mật khẩu phải dài ít nhất 6 ký tự!" });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });

        if (newUser) {
            // Generate token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Đăng ký không thành công!" });
        }
    } catch (error) {
        
    }
};

export const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Thông tin xác thực không hợp lệ!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Mật khẩu không đúng!" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in logIn controller:", error.message);
        res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình đăng nhập!" });
    }
};

export const logOut = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Đăng xuất thành công!"})
    } catch (error) {
        console.log("Error in logOut controller", error.message);
        res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình đăng xuất!" }); 
    }
};

export const updateProfile = async (req, res) => {
    
};