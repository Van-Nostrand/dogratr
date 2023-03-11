import React, { useState } from 'react'
import TextInput from '@/components/TextInput'
import { useShallowEqualSelector } from '@/hooks'
import { IRootStore } from '@/store/types'

export default function CreatePupper () {
  const { username } = useShallowEqualSelector((state: IRootStore) => ({ username: state.auth.username }))
  const [pupName, setPupName] = useState<string>('')
  const [file, setFile] = useState<File>()

  const handleChange = (e: any) => {
    console.log('handleChange: WHAT IS THE EVENT', e)
    setFile(e.target.files[0])
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData()
    console.log('WHAT IS USERNAME', username, 'WHAT IS PUPNAME', pupName)
    formData.append('file', file, file.name)
    formData.append('name', pupName)
    formData.append('username', username)

    fetch('http://localhost:8081/create-pupper', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData,
    })
      .then((res) => {
        console.log('create pupper RES STATUS', res.status)
        if (res.status === 200) return res.json()
      }).catch((error) => {
        console.error('error creating pupper', error.message)
      })

    setFile(undefined)
    setPupName('')
  }

  return (
    <div className="create-pup-page">
      <h1>create pupper</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          value={pupName}
          onChange={setPupName}
        />

        <input
          name="fileupload"
          type="file"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}
