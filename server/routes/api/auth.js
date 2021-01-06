import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../middleware/auth';
import config from '../../config/index';
const  { JWT_SECRET } = config;

//Model
import User from '../../models/user';

const router = express.Router();

//@route POST api/auth
//@desc Auth user
//@access Public
router.post('/', (req, res)=>{
    const { email, password } = req.body;

    //Simple Validation
    if(!email || !password){
        return res.status(400).json({msg:"모든 필드를 채워주세요"});
    }
    //Check for existing user 이메일과 패스워드 모두가 채워진 경우
    User.findOne({email}).then((user)=>{
        if(!user) return res.status(400).json({msg:"유저가 존재하지 않습니다."});

        //Validate password 패스워드 검증
        bcrypt.compare(password, user.pasword).then((isMatch)=>{ //user가 존재한다면 bcrypt로 비교한다.
            if(!isMatch) return res.status(400).json({msg:"비밀번호가 일치하지 않습니다."});
            jwt.sign({id:user.id}, JWT_SECRET, {expiresIn:"2 days"}, (err, token) =>{
                if(err) throw err;
                res.json({
                    token,
                    user:{
                        id:user.id,
                        name:user.name,
                        email:user.email,
                        role:user.role //글을 쓸수 있는지 없는지 판별한다.
                    }
                })
            })
        })
    })
})

//로그아웃 리덕스를 이용
router.post('/logout', (req,res)=> {
    res.json("로그아웃 성공")
});

router.get('/user', auth, async(req, res)=>{
    try {
        const user = await (await User.findById(req.user.id)).select("-password");
        if(!user) throw Error("유저가 존재하지 않습니다.");
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(400).json({msg:e.message})
    }
})

export default auth;