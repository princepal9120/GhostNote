'use client'
import { useToast } from '@/components/ui/use-toast'
import { Message} from '@/model/user'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

function page() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSwitchLoading, setIsSwitchLoading] = useState(false)
    const {toast}=useToast()

    const handleDeleteMessage= (messageId: string)=>{
        setMessages(messages.filter((message) => message._id!==messageId))
    }
    const {data: session}= useSession()
    const form =useForm({
        resolver: zodResolver(acceptMessageSchema)
    })
 console.log(form);
 // better understand to read docs
 const {register, watch, setValue}=from;
 cost acceptMessages= watch('acceptMessages')
 const fetchAcceptMessage= useCallback(
   () => {setIsLoading(true)
   },
   [setValue],
 )
 
 

  return (
    <div>page</div>
  )
}

export default page