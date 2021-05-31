import React from 'react';

export interface iInfo  {
    name: any;
    type: any;
    size: number;
    base64: string | ArrayBuffer | null;
    file: any;
    status: string;
}

interface iFile{
    maxSize: number; // on kb;
    fileType: string;
    className?:string;
    ids:string;
    showPreview:boolean;
    previewAlign:string;
    previewLink: string;
    lang:string;
    onDone:(val:iInfo,status:boolean,msg:string)=>void;
    previewConfig:{
        width:string;
        height:string;
    };
} 



interface iType{
     [key: string]: Object
}
const File64: React.FC<iFile> = ({maxSize,fileType,className,ids,showPreview,previewAlign,previewLink,lang,previewConfig,onDone}) => {
    const types:iType={
        'png':'image/png',
        'jpg':'image/jpeg',
        'gif':'image/gif',
        'svg': 'image/svg+xml',
        'txt': 'text/plain',
        'zip': 'application/zip',
        'csv': 'text/csv',
        'xls': 'application/vnd.ms-excel',
        'ico': 'image/vnd.microsoft.icon',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    const [err,setErr]=React.useState("-");
    const [images,setImages]=React.useState<string | ArrayBuffer | null>();
    const [file,setFile]=React.useState<iInfo>();

    const  handleChange=(event:any)=>{
        setErr("-");
        const errMsg = {
          max:{
            en: `Your file is too big. Please upload file smaller than ${maxSize} kb.`,
            id: `File terlalu besar. Silahkan upload file dengan ukuran lebih kecil dari ${maxSize} kb`
          },
          type:{
            en: `You may only upload ${fileType} files. Please ensure your file is in one of these format`,
            id: `Anda hanya bisa mengupload file ${fileType}. Mohon pastikan file anda termasuk salah satu format tersebut.`
          }
        }
        let files = event.target.files;
        const allFiles:Array<iInfo>=[];
        for (var i = 0; i < files.length; i++) {
          let file = files[i];
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const size = Math.round(file.size / 1000);
            if (size > maxSize){
              setErr(lang==='en'?errMsg.max.en:errMsg.max.id);
              setImages(undefined)
              onDone({} as iInfo,false,(lang==='en'?errMsg.max.en:errMsg.max.id));
              return false;
            }
            const checkType = checkingType(file.type);
            if (!checkType) {
              setErr(lang==='en'?errMsg.type.en:errMsg.type.id);
              setImages(undefined)
              onDone({} as iInfo,false,(lang==='en'?errMsg.type.en:errMsg.type.id));
              return false;
            }else{
              let fileInfo = {
                name: file.name,
                type: file.type,
                size: size,
                base64: reader.result,
                file: file,
                status: 'success'
              };
              allFiles.push(fileInfo);
              setFile(fileInfo);
              setImages(reader.result)
              if(allFiles.length === files.length){
                onDone(allFiles[0],true,'sukses');
              }
      
            }
      
          } // reader.onload
      
        } // for
      
      }
    const checkingType=(type:string)=>{
        const tipe = (fileType).split(',');
        if(tipe[0]!=='all'){
            const checking = tipe.map((item:string) =>{
                return types[item.trim()]===type;
            })
            if(checking.indexOf(true)>=0) return true;
            else return false;
        }else{
            return true;
        }
    }

    return (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <input
                style={{display:'none'}}
                type="file"
                name={"imageUpload"+ids}
                id = {"imageUpload"+ids}
                onChange={(event)=>handleChange(event)}
                className={className}
                />
            <label 
                htmlFor={"imageUpload"+ids}
                // onclick = "javascript:document.getElementById('imageUpload').click();"
                style = {{
                    width: '30%',
                    float: 'left',
                    cursor: 'pointer',
                    backgroundColor: '#EEEEEE',
                    borderColor: '#34465B',
                    transition: '400ms',
                    fontSize: '.9em',
                    borderRadius: '.15rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    display: 'inline-block',
                    color: '#333333',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    userSelect: 'none',
                    border: '1px solid transparent',
                    padding: '.55rem .75rem',
                }}
                > {lang==='en'?'Select file':'Pilih berkas'} </label> 
            <div 
                style = {{
                    paddingTop: '10px',
                    paddingLeft: '10px',
                    fontSize: '.8em',
                    width: "70%",
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    float: 'left'
                }} > 
                {
                    file?.name ? file?.name : lang === 'en' ? 'No file selected.' : 'Belum ada file yang dipilih.'
                } 
            </div>
            <div style={{clear:'both'}}></div>
          
          </div>
         {
            err!=='-'?
            <label id="password-error" style={{fontSize:'0.7rem',color:'#dc3545',marginTop:'.1rem'}} htmlFor="password">{err}</label>:''
        }

        {
            showPreview?(
            <div style={{margin:previewAlign==='center'?'0 auto':''}}>
                <img
                  className='img-responsive mt-4 object-contain'
                  src={images===undefined?previewLink:(images as string)}
                  alt="Uploaded Image"
                  width={previewConfig.width}
                  height={previewConfig.height}
                />
            </div>
            ):''
        }
        </div>
    );

}

File64.defaultProps = {
  maxSize: 1000, // on kb,
  fileType: 'png',
  ids:'uid',
  showPreview:true,
  previewAlign:'center',
  previewLink: 'http://ptnetindo.com:6692/images/default.png',
  lang:'en',
  previewConfig:{
    width:'150px',
    height:'150px'
  }
};

export default File64;