"use client"
import React, { useActionState } from 'react'
import { commentOnJob } from '@/actions/jobCommentAction';
function JobCommentForm({job_id}) {
    const initialState = {
        name: '',
        email: '',
        comment: '',
        errors: {},
        submitted: false,
    };
    const [state, action, isPending] = useActionState(commentOnJob, initialState)


    return (
        <div className="flex flex-col gap-2  mt-4">
       <h2 className="text-lg font-semibold text-gray-800">Leave a Comment</h2>

        <form action={action} className='space-y-4 flex flex-col gap-2 '>

            <div className='hidden'>
               <input type="hidden" id="job_id" name="job_id" defaultValue={job_id} />
            </div>

            <div>
                <label htmlFor="title" className='block'>Name</label>
                <input type="text" id="name" name="name" defaultValue={state?.name} className='input' />
                {
                    state?.errors?.name && <p className='error'>{state.errors.name}</p>
                }
            </div>
            <div>
                <label htmlFor="email" className='block'>Email</label>
                <input type="email" id="email" name="email" defaultValue={state?.email} className='input' />
                {
                    state?.errors?.email && <p className='error'>{state.errors.email}</p>
                }
            </div>


            <div>
                <label htmlFor="content" className='block'>Comment</label>
                <textarea type="text" id="comment" name="comment" className='input' rows={6} defaultValue={state?.comment} ></textarea>
                {
                    state?.errors?.comment && <p className='error'>{state.errors.comment}</p>
                }
            </div>

            <button disabled={isPending} type="submit" className='btn-primary'>
                {isPending ? 'Commenting...' : 'Post comment'}
            </button>


        </form>

        </div>

    )
}

export default JobCommentForm