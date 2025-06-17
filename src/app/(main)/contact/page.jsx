import React from 'react'
import ContactPage from './ContactPage'

function page() {
  return (
    <div>
        <ContactPage company_mail ={process.env.COMPANY_EMAIL} company_phone={process.env.COMPANY_EMAIL}/>
    </div>
  )
}

export default page