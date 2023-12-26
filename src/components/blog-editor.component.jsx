import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from "../imgs/logo.png";
import AnimationWrapper from '../common/page-animation';
import defaultBanner from '../imgs/blog banner.png'
import { uploadImage } from '../common/uploadImage';
import {Toaster,toast} from 'react-hot-toast';
import { EditorContext } from '../pages/editor.pages';
import EditorJS from '@editorjs/editorjs';
import { tools } from './tools.component';

const BlogEditor = () => {

  //let blogBannerRef=useRef();
  let {blog,blog:{title,banner,content,tags,desc},setBlog}=useContext(EditorContext)

  useEffect(()=>{
    let editor = new EditorJS({
      holder: "textEditor",
      data: "",
      tools:tools,
      placeholder: "Let's write an awesome story",
    });
  },[])
 
  const handleBanner=(e)=>{
       
        let img = e.target.files[0];
        if(img){
          let uploadToast=toast.loading("Uploading.....")
          uploadImage(img).then(response=>{
             console.log("----url found", response);
            if (response) {
              console.log("----url found", response);
              toast.dismiss(uploadToast);
              toast.success("Uploaded");
              // blogBannerRef.current.src=response

               setBlog({...blog,banner:response})
            }
          })
          .catch(err=>{
             console.log("----url found error", err);
            toast.dismiss(uploadToast)
            return toast.error(err)
          })
        }
    
  }

 const handleTitleKeyDown=(e)=>{
     if(e.keyCode==13){
      e.preventDefault();
     }
 }
 const handleTitleChange=(e)=>{
    let input=e.target;
    input.style.height='auto';
    input.style.height=input.scrollHeight+'px'
    setBlog({...blog,title:input.value})
 }

 const handleError=(e)=>{
    console.log('--------handle image error ',e)
     let img=e.target
     img.src=defaultBanner
 }
  
  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : " New Blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] hover:opacity-80 w-full">
            <div className="relative aspect-video bg-white border-4 border-grey">
              <label>
                <img
                  // ref={blogBannerRef}
                  src={banner}
                  className="z-20"
                  onError={handleError}
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleBanner}
                  hidden
                />
              </label>
            </div>
            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full opacity-10 my-5" />
            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
}

export default BlogEditor