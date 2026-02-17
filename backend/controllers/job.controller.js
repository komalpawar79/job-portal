import { Job } from "../models/job.model.js";

//This is for Admin
export const jobPost = async (req,res)=>{
  try {
    const {title, description, requirements, salary,experience, location, jobType, position, companyId} = req.body;
    const userId = req.id;

    if(!title || !description || !requirements || !salary || !experience || !location || !jobType|| !position || !companyId ){
      return res.status(400).json({
        message: 'Something is missing',
        success: false,
      });
    }
    const job = await Job.create({
      title, description, requirements: requirements.split(","), 
      salary:Number(salary),
      experienceLevel:experience,
      location, 
      jobType, 
      position, 
      company: companyId, 
      created_by: userId
    })
    return res.status(200).json({
      message: 'Job posted successfully',
      job,
      success:true
    })
  } catch (error) {
    console.log(error);
  }
}

//This is for users
export const getAllJobs = async(req,res)=>{
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        {title: {$regex:keyword, $options: 'i'}},
        {description: {$regex:keyword, $options: 'i'}},
      ]
    };
    const jobs = await Job.find(query).populate({
      path: 'company'
    }).sort({createdAt:-1})
    if(!jobs){
      return res.status(404).json({
        message: 'jobs not found',
        success: false
      })
    }
    return res.status(200).json({
      jobs,
      success:true
    })
  } catch (error) {
    console.log(error);
  }
}

//This is for users
export const getJobById = async(req,res) =>{
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"applications"
    });
    if(!job){
       return res.status(404).json({
        message: 'jobs not found',
        success: false
      })
    };
    return res.status(200).json({
      job,
      success:true
    });

  } catch (error) {
    console.log(error);
  }
}

//this is for admin how many jobs he created
export const getAdminJobs = async (req, res) =>{
  try {
    const adminId = req.id;
    const jobs = await Job.find({created_by: adminId}).populate({
      path:'company',
      createdAt: -1
    })
    if(!jobs){
       return res.status(404).json({
        message: 'jobs not found',
        success: false
      })
    };
    return res.status(200).json({
      jobs,
      success:true
    });
  } catch (error) {
    console.log(error);
  }
}
