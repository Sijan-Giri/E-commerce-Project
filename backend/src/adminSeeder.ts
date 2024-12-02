import User from "./model/userModel"
import bcrypt from "bcrypt"

const adminSeeding = async():Promise<void> => {
    const [data] = await User.findAll({
        where : {
            email : "admin@gmail.com"
        }
    })
    if(!data) {
       await User.create({
        email : "admin@gmail.com",
        username : "Admin",
        password : bcrypt.hashSync("admin",8),
        role : "admin"
       })
       console.log("Admin seeded successfully")
    }
    else {
        console.log("Admin already seeded")
    }
}

export default adminSeeding