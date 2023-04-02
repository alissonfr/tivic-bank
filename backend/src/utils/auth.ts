import jwt from 'jsonwebtoken'
require('dotenv/config')
import bcrypt from 'bcrypt'

export function comparePasswords (password: string, hash: string): Promise<boolean> {
   return bcrypt.compare(password, hash)
}

export function generatePassword (password: string): Promise<string> {
   return bcrypt.hash(password, 10)
}

export function generateToken(data: object): string {
    return jwt.sign({ data }, process.env.SALT_KEY)
 }