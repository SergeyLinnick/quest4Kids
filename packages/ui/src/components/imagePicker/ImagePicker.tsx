"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "../button/Button";
import classes from "./imagePicker.module.css";

interface ImagePickerProps {
  label: string;
  name: string;
  avatar: string;
}

export const ImagePicker = ({ label, name, avatar }: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState<string | null>(avatar);
  const imageInput = useRef<HTMLInputElement>(null);

  // Handle button click to trigger file input
  function handlePickClick() {
    imageInput.current?.click();
  }

  // Handle file selection and read the file as a data URL
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };

    fileReader.onerror = () => {
      console.error("Error reading the file.");
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <Button type="button" onClick={handlePickClick} variant="outline">
          Pick an Image
        </Button>
      </div>
    </div>
  );
};
