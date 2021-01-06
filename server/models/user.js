import moment from 'moment';
import mongoose from 'mongoose';

//Create Schema
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true, //같은 값이 중복이 안되게
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["MaminJuin", "SubJuin","User"],
        default:"User",
    },
    register_date:{
        type:Date,
        //default:Date.now,
        default:moment().format("YYYY-MM-DD hh:mm:ss")
    },
    comments:[
        {  //댓글을 여러개 쓸 경우를 생각해서 복수로
        post_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"posts",
        },
        comment_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"comments",
        }
    },
  ],
        posts: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"posts",
            }
        ]
});

const User = mongoose.model("user", UserSchema);

export default User;