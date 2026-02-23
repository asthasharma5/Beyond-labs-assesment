import React, { useState } from 'react'

const Home = () => {
  const [form, setform] = useState({
    name: '',
    email: ''
  })
  const [department, setdepartment] = useState('all')
  const [checkbox, setCheckbox] = useState(false)
  const [data, setData] = useState([])
  const [step, setStep] = useState(1)
  const [submitForm, setSubmitForm] = useState(false)

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const IsvalidEmail = (email) => {
    if (!email) return false
    if (!email.includes('@')) return false
    if (!email.includes('.')) return false
    let atIndex = email.indexOf('@')
    let dotIndex = email.lastIndexOf('.')
    if (dotIndex === 1) return false
    if (dotIndex < atIndex) return false
    if (dotIndex === email.length - 1) return false
    return true
  }
  const handlenext = (e) => {
    e.preventDefault();
    if (!form.name) {
      alert("fill the name")
      return
    }
    if (!IsvalidEmail(form.email)) {
      alert("email is required fill the correct email")
      return
    }
    setStep(2)
  }
  const handleCheckbox = (e) => {
    const { value } = e.target
    setCheckbox((prev) => !prev)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setData([
      ...data,
      {
        ...form, department: department, checkbox: checkbox, id: data.length + 1
      }
    ])
    setform({
      name: '',
      email: ''
    })
    setdepartment('all')
    setStep(1)
    setCheckbox(false)
    setSubmitForm(true)
  }
  const handlebackButton = (e) => {
    setStep(1)
  }
  const handleback = () => {
    setSubmitForm(false)
    setStep(1)

  }
  return (
    <div>

      {submitForm ? data.map((item) => (
        <div className='summary'>
          <button onClick={handleback}>Back</button>
          <h1>summary view</h1>
          <ul key={item.id}>
            <li>
              Name: {item.name}
            </li>
            <li>
              Email:{item.email}
            </li>
            <li>
              Role: {item.department}
            </li>
            <li>
              Terms Acceptet: {item.checkbox === true ? "yes" : "NO"}
            </li>
          </ul>
        </div>
      )

      ) : (
        <>
          <h1> Step  {step}</h1>
          <form className='Form-main' onSubmit={handleSubmit}>
            {step === 1 ? (<>
              <label htmlFor='name' className='label'>Full Name</label>
              <input id="name" placeholder='Enter Name' type='text' name='name' value={form.name} onChange={handleChange} required />
              <label htmlFor='email' className='label'>Email Address</label>
              <input id='email' placeholder='Enter Email' type='email' name='email' value={form.email} onChange={handleChange} required />
            </>) : (<>
              <select className='select-box' value={department} onChange={(e) => setdepartment(e.target.value)}>
                <option value={'all'}>All</option>
                <option value={'developer'}>Developer</option>
                <option value={'designer'}>Designer</option>
                <option value={'manager'}>Manager</option>
              </select>
              <div className='checkbox'>
                <input id='checkboxz' placeholder='Checkbox' type='checkbox' value={checkbox} onChange={handleCheckbox} />
                <label htmlFor='checkbox' className='label'>Click on the checkbox</label>
              </div>

            </>)}

            <div className='btn-container'>
              <button type='button' onClick={handlebackButton} disabled={step === 1}>Back</button>
              {step === 1 ? <button type='button' onClick={handlenext}>Next</button> : <button type='Submit'>Submit</button>}

            </div>
          </form>
        </>
      )}


    </div>
  )
}
export default Home