import express from 'express';

//Model
import Post from '../../models/post';
import auth from '../../models/auth';

const router = express.Router();

//api/post //복잡하게 적는 이유는 향후 express서버에 프론트를 올릴껀데 프로트랑 백앤드 주소가 달라야 프론트의 파일을 일만 User들이 받아볼수 있다.
// express서버에서 백과 프로트를 같이 돌리기 위해 주소체계를 백앤트에 길게 쓴다는 개념만 잡아둔다.
router.get("/", async(req, res)=>{  //모든 라우터 검색
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult);
})

router.post("/", auth, async(req, res, next)=>{
    try {
        console.log(req, "req");
        const {title, contents, fileUrl, creator} = req.body;
        const newPost = await Post.create({
            title, 
            contents,
            fileUrl, 
            creator
        });
        res.json(newPost);
    }catch(e){
        console.log(e)
    }
})

export default router;