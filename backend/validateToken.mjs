import jwt from 'jsonwebtoken'
const validToken = function(req,res,next){
    const token = req.headers["authentication"]
    if(!token)return res.status(401).send("invalid")
    const verified = jwt.verify(token, process.env.TOKEN_KEY)
    if(!verified)return res.status(401).send("invalid")
    req.user = verified
    next()
}
export {validToken}