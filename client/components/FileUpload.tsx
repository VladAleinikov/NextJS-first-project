import React, { useRef } from "react";
interface FileUpladProps {
  setFile: Function;
  accept: string;
}
const FileUpload: React.FC<FileUpladProps> = ({  setFile, accept, children }) => {
      const ref = useRef<HTMLInputElement>(null);
      
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFile(e.target.files[0])
      }
  return (
    <div onClick={() => ref.current?.click()}>
      <input type="file" accept={accept} ref={ref} onChange={onChange}/>
      {children}
    </div>
  );
};

export default FileUpload;
