import React from 'react'
import { useSelector } from "react-redux";
import { useRef ,useState, useEffect} from 'react';
import { getStorage, uploadBytesResumable,ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

export default function profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef= useRef(null);
  const [file,setFile] = useState(undefined);
  const [filePerc,setFilePerc] =  useState(0);
  const [fileUPloadError,setFileUPloadError] = useState(false);
  const [formData,setFormData] = useState({});
  console.log(formData);
  console.log(filePerc);
  console.log(file);

  useEffect(() => {
    if(file){
    handleFileUpload(file)
    }
  }, [file]);
  const handleFileUpload= (file ) =>{
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file); 

    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress= (snapshot.bytesTransferred/ snapshot.totalBytes)* 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUPloadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL)=> {
            setFormData({...formData,avator: downloadURL});
          }
        );
      }
    )
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>profile</h1>
      <form className='flex flex-col'>
        <input onChange={(e)=> setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={()=> fileRef.current.click()} src={ formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt=2'/>
        <p className='text-sm self-center '>
          { fileUPloadError ? ( 
            <span className='text-red-700 '>error image upload</span>
          ):filePerc > 0 && filePerc < 100 ?(
            <span className='text-slate-700'>{'uploading ${filePerc}%'}</span>
          ): filePerc === 100 ? (
            <span className='text-green-700'>image successfully uploaded</span>
          ):(
            ''
          )
          }
        </p>
        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
        <input type="text" placeholder='email' id='email' className='border p-3 rounded-lg' /> 
        <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg' /> 
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>

      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>delete account</span>
        <span className='text-red-700 cursor-pointer'>sign out</span>
      </div>
    </div>
  )
}
