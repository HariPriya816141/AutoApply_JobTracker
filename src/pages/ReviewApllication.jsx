import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ReviewApllication = () => {
    const { id } = useParams()
  const [app, setApp] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('applications') || '[]')
    const found = data.find(a => a.id === id)
    if (!found) {
      navigate('/applications')
    } else setApp(found)
  }, [id, navigate])

  if (!app) return null
  return (
       <div>
      <h2 className="text-2xl font-semibold mb-4">Application — {app.company}</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p><strong>Role:</strong> {app.role}</p>
        <p><strong>Date:</strong> {app.date}</p>
        <p><strong>Location:</strong> {app.location}</p>
        <p><strong>Source:</strong> {app.source}</p>
        <p><strong>Status:</strong> {app.status}</p>
        <p><strong>Follow Up:</strong> {app.followUpDate || '—'}</p>
        <div className="mt-4">
          <h4 className="font-medium">Notes</h4>
          <div className="mt-2 prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: app.notes || '<em>No notes</em>' }} />
        </div>
      </div>
    </div>
  )
}

export default ReviewApllication
