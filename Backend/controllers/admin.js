const registerAdmin = async (req,res) => {
    try {
        const name1 = req.body
  
       
        // Add your logic for user registration here.
        res.status(201).json({ message: "User registered successfully", name1 });
    } catch (error) {
        console.error("Error during user registration:", error);
    }
};

const loginAdmin = (req,res) => {
    try {
        const name1 = req.body
        console.log(name1);
        console.log("this is a login user")
        // Add your logic for user registration here.
    } catch (error) {
        console.error("Error during user login:", error);
    }
}

export  {registerAdmin,loginAdmin};