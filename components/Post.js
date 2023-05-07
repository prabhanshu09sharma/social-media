import { useRouter } from 'next/router'
import React, { useContext, useState, useEffect } from 'react'
import Moment from 'react-moment';
import { BsChat } from 'react-icons/bs';
import { AppContext } from '@/contexts/AppContext';
import { FaRetweet } from "react-icons/fa"
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useSession } from 'next-auth/react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { db } from "../firebase"
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';
import Image from 'next/image';


const Post = ({ id, post }) => {
    console.log(post);
    const router = useRouter();
    const [appContext, setAppContext] = useContext(AppContext)
    const [comments, setComments] = useState([])
    const { data: session } = useSession()
    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false)

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [id]
    )

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
                setLikes(snapshot.docs)
            ),
        [id]
    )

    useEffect(() =>
        setLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        ), [likes, session?.user?.uid]
    )

    const likePost = async () => {
        if (liked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.name,
            });
        }
    }

    const openModal = () => {
        setAppContext({
            ...appContext,
            isModalOpen: true,
            post,
            postId: id
        })

        console.log('opening model ', appContext.post);
    }

    return (
        <div className='mt-4 border-t border-gray-500 px-4 pt-6 pb-4 cursor-pointer'
            onClick={() => router.push(`/${id}`)}>
            <div className='grid grid-cols-[48px,1fr] gap-4'>
                <div>
                    <Image src={post?.userImg} alt="PostImg" width={48} height={48}
                        className=' rounded-full object-cover' />
                </div>
                <div>
                    <div className='block sm:flex gap-1'>
                        <h1 className='font-medium'>{post?.username}</h1>
                        <div className='flex'>
                            <p className='text-gray-500'>@{post?.tag} &nbsp;-&nbsp;</p>
                            <p className='text-gray-500'>
                                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                            </p>
                        </div>
                    </div>
                    <p>{post?.text}</p>
                    <Image className=' object-cover rounded-[20px] mt-2'
                        src={post?.image} alt="PostImg" width={50} height={50} />

                    <div className='flex justify-between text-[20px] mt-4 w-[80%]'>
                        <div className='flex gap-1 items-center'>
                            <BsChat className='hoverEffect w-7 h-7 p-1' onClick={(e) => {
                                e.stopPropagation()
                                openModal()
                            }} />
                            {comments.length > 0 && (<span className='text-sm'>{comments.length}</span>)}
                        </div>
                        {session.user.uid !== post?.id ? (
                            <FaRetweet className='hoverEffect w-7 h-7 p-1' />
                        ) : (
                            <RiDeleteBin5Line className='hoverEffect w-7 h-7 p-1'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDoc(doc(db, "posts", id));
                                }} />
                        )}
                        <div className='flex gap-1 items-center'
                            onClick={(e) => {
                                e.stopPropagation()
                                likePost()
                            }}
                        >
                            {liked ? <AiFillHeart className='hoverEffect w-7 h-7 p-1 text-pink-700' />
                                : <AiOutlineHeart className='hoverEffect w-7 h-7 p-1' />}

                            {likes.length > 0 && (<span className={`${liked && "text-pink-700"} text-sm`}>{likes.length}</span>)}
                        </div>
                        <AiOutlineShareAlt className='hoverEffect w-7 h-7 p-1' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
