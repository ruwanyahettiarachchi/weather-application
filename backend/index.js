const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")


const app=express()

app.use(cors())
app.use(express.json())

const PORT=process.env.PORT||8020




const orderschema=mongoose.Schema({
    temperature:String,
    rainfall_humidity:String,
    light:String,
    soil_quality:String,
    wind:String,
    airpollution:String,
    pests_diseases:String,
   

},{
    timestamps:true

})

const ordermodel=mongoose.model("Wheather",orderschema)



app.get("/",async(req,res)=>{
    const data= await ordermodel.find({})
  
    res.json({success:true,data:data})
})


app.post("/create",async(req,res)=>{
    const data=new ordermodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


app.put("/update",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await ordermodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})




app.delete("/delete/:id",async(req,res)=>{
const id=req.params.id
const data=await ordermodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})




app.get("/count",async(req,res)=>{
    try{
        const users=await ordermodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"Order count successfully",data:data})
    }

})

app.get("/order/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await ordermodel.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});


const accountregister=mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
 
     
 
 },{
     timestamps:true
 
 })
 
 const registermodel=mongoose.model("Users",accountregister)

 //create
 app.post("/create_account",async(req,res)=>{
    const data=new registermodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})

 //login
app.post("/login", async (req, res) => {
    console.log('in-------------------------------');
    const { email, password } = req.body;
  
    try {
        console.log(email);  
      const user = await registermodel.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
    
     // const isPasswordValid = await bcrypt.compare(password, user.password);
     const isPasswordValid1 = user.password===password;

      console.log('Input password:', password);
      console.log('Stored hashed password:', user.password);
      console.log('isPasswordValid:', isPasswordValid1);
      
      if (isPasswordValid1===false) { // Fixed condition
        console.log('Request body:', req.body);
        return res.status(401).json({ success: false, message: "Incorrect password" });
      

      }
  
      // If password is valid, send success message and user data
      res.status(200).json({ success: true, message: "Login successful", data: user });
    } catch (error) {
        console.log('Retrieved user:', user);

      console.error("Login error:", error);
      res.status(500).json({ success: false, message: error });
    }
});



 

 


mongoose.connect("mongodb+srv://DinidiG:Gallage%406394@cluster0.edaqsgq.mongodb.net/tea_estate_db?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

