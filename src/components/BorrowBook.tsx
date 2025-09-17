'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book';

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string
    }
}

const BorrowBook = ({
    userId, bookId, borrowingEligibility: {isEligible, message}
}: Props) => {       
    const router = useRouter()
    const [borrowing, setBorrowing] = useState(false)

    const handleBorrow = async () => {
        if (!isEligible) {
            toast(message)
        }

        setBorrowing(true)

        try {
            const result = await borrowBook({userId, bookId})

            if (result.success) {
                toast('Book borrowed successfully')
            }
            
        } catch (error) {
            toast('Error occurred while borrowing the book')
        }
    }
  return (
    <Button className="book-overview_btn">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className="font-bebas-neue text-xl text-dark-100 ">Borrow</p>
    </Button>
  )
}

export default BorrowBook