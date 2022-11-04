import React, { useState } from 'react'
import axios from 'axios'

/**
 * this is untested. it's basically how im going to handle file uploads
 */
export default function UploadFile () {
  const [file, setFile] = useState(undefined)

  const submitFile = () => {
    const formData = new FormData()
    formData.append('image', file)
    axios.post('upload_file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return (
    <div className="upload-file">
      <input
        type="file"
        value={file}
        onChange={(e) => setFile(e.target.value)}
      />
      <button
        onClick={submitFile}
      >
        submit file
      </button>
    </div>
  )
}
