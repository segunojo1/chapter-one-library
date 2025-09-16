"use client";

import config from "@/lib/config";
import { ImageKitProvider, IKUpload, IKImage, IKVideo } from "imagekitio-next";
import ImageKit from "imagekit";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload image: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return data;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string
}

const FileUpload = ({
  type, accept, placeholder, folder, variant, onFileChange, value
}: Props) => {
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null}>({filePath: value ?? null});
  const [progress, setProgress] = useState(0);
  
  const styles = {
    button: variant === "dark" ? "bg-dark-300" : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400"
  }

  const onError = (error: any) => {
    console.log(error);

    toast(`${type} upload failed`);
  };
  const onSuccess = (response: any) => {
    setFile(response);
    onFileChange(response.filePath);

    toast(`${type} uploaded successfully`);
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast("File must be less than 20MB")

        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast("File must be less than 50MB")

        return false;
      }    
    } 
    return true;
  }
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={IKUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        fileName="upload.png"
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded/total) * 100);
          setProgress(percent)
        }}
        folder={folder}
        accept={accept}
      />
      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (IKUploadRef.current) {
            // @ts-ignore
            IKUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          width={20}
          height={20}
          alt="upload icon"
          className="text-base text-light-100"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

        {file && <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>}

        {/* {file && <p className="upload-filename">{file.filePath}</p>} */}

      </button>
      {
        progress > 0 && progress !== 100 && (
          <div className="w-full bg-green-200 ">
            <div className="progress" style={{ width: `${progress}%`}}>
              {progress}%
            </div>
          </div>
        )
      }

      {file && (
        (type === "image" ? (
          <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
        ) : type == "video" ? (
          <IKVideo 
          path={file.filePath}
          controls={true}
          className="h-96 w-full rounded-xl"/>
        ) : null)
        
      )}  
    </ImageKitProvider> 
  );
};

export default FileUpload;
