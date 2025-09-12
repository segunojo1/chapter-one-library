"use client";

import config from "@/lib/config";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";
import ImageKit from "imagekit";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

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

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error);

    toast("Image upload failed");
  };
  const onSuccess = (response: any) => {
    setFile(response);
    onFileChange(response.filePath);

    toast("Image uploaded successfully");
  };
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
      />
      <button
        className="upload-btn"
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
        <p className="text-base text-light-100">Upload a file</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
