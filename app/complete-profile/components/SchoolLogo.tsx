import Image from "next/image";
import React, { ReactEventHandler } from "react";

interface Props {
  image: string;
  updateSchoolLogo: any;
}

const SchoolLogo = ({ image, updateSchoolLogo }: Props) => {
  return (
    <>
      <div className=" inline-block">
        <input
          type="file"
          name="photo"
          accept="images/*"
          id="profilePhotoInput"
          onChange={updateSchoolLogo}
          style={{ display: "none" }}
        />

        <label htmlFor="profilePhotoInput">
          <Image
            src={image}
            alt="camera"
            width={200}
            height={200}
            className="rounded-[.8rem] p-[2rem] cursor-pointer border-[1px] border-dashed"
            title="click to change photo"
          />
        </label>
      </div>
    </>
  );
};

export default SchoolLogo;
