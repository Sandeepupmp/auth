import express from 'express'
import { userContrler } from '../controlers/user.controler.js'

const router = express.Router()

router.get( "/",userContrler)

export default router
