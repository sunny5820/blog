import mongoose from "mongoose";
import moment from "moment";

//Create Schema
const CommentSchema = new mongoose.Schema({
    contents:{
        type:String,
        required:true,  //반드시 내용이 있어야 한다.
    },
    date:{
        type:String,
        default:moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"post", //참조
        },
        creator:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        },
        creatorName:{type:String},   //데이터베이스에 부담을 줄여주기 위해 
})

const Comment = mongoose.model("category", CommentSchema);

export default Comment;