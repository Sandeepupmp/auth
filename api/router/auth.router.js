import express from 'express'
import { signin, singupControler } from '../controlers/auth.controler.js'

const router = express.Router()

router.post("/signup", singupControler)
router.post('/signin', signin)


export default router