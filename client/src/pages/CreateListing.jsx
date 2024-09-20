import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [Uploading , setUploading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (files.length > 0 && formData.imageURLs.length + files.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
  
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageURLs: formData.imageURLs.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 MB max)");
          setUploading(false);
        });
    } else {
      setImageUploadError("Upload only 1-6 images per listing");
      setUploading(false);
    }
  };
  
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.imageURLs.filter(
      (url, i) => i !== index
    );
    setFormData({
      ...formData,
      imageURLs: newImages,
    });
  };
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form action="" className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="name"
            placeholder="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            className="border p-3 rounded-lg"
            id="description"
            placeholder="description"
            required
          />
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="address"
            placeholder="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span className="capitalize">sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span className="capitalize">rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span className="capitalize">parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span className="capitalize">furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span className="capitalize">offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p className="capitalize">beds</p>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p className="capitalize">baths</p>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                id="bedrooms"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p className="capitalize">regular price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                id="bedrooms"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p className="capitalize">discounted price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal texte-gray-600 ml-2">
              the first image will be te cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              disabled={Uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
             {Uploading ? "uploading..." : "upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {
            formData.imageURLs.length > 0 && formData.imageURLs.map((url,index) => (
                <div key={url} className="flex justify-between items-center p-3 border border-gray-300 rounded">
                <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />
                <button type="button" onClick={()=> handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
                </div>
            ))
          }
          <button className="p-3 bg-slate-700 text-white rounded-l uppercase hover:opacity-95 disabled:opacity-80">
            create listing
          </button>
        </div>
      </form>
    </div>
  );
}
