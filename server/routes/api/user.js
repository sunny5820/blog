import express from 'express';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import config from '../../config/index';
const { JWT_SECRET } = config;

//Model 
import User from '../../models/user';

const router = express.Router();

//@routes  GET api/user
//@desc    Get all user
//@access  public

router.get('/', async(req, res)=>{
    try{
        const users = await User.find();
        if(!users) throw Error("No users");
        res.status(200).json(users);
    }catch(e){
        console.log(e);
        res.status(400).json({meg: e.message});
    }
})


//회원가입
//@routes  POST api/user
//@desc    Register user
//@access  public

router.post('/', (req, res)=>{
    console.log(req);
    const {name, email, password} = req.body;//express server에서는 req.body에 모든 정보가 들어있다.

    //Simple validation 간단한 인증
    if(!name|| !email|| !password){
        return res.status(400).json({msg:"모든 필드를 채워주세요"})
    }

    //Check for exising user 가입된 유저가 있다면
    User.findOne({email}).then((user)=>{
        if(user) 
            return res.status(400).json({msg:"이미 가입된 유저가 존재합니다."});
        //가입된 유저가 존재하지 않는다면    
        const newUser = new User({
            name, email, password
        });
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then((user)=>{
                    jwt.sign(   //웹토큰에 등록
                        { id: user.id},
                        JWT_SECRET,
                        {expiresIn:3600}, //만기일
                        (err, token) =>{
                            if(err) throw err;
                            res.json({
                                token,
                                user:{
                                    id:user.id,
                                    name:user.name,
                                    email:user.email
                                }
                            })
                        }
                        )
                })
            })
        })
    });
})

export default router;