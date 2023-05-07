import React, { useEffect, useState } from 'react'
import { onSnapshot, collection, query, orderBy } from "firebase/firestore"
import { db } from "../firebase"
import { HiOutlineSparkles, HiSearch } from 'react-icons/hi';
import Input from './Input';
import Post from './Post';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
            setPosts(snapshot.docs)
        }
    ), []);

    console.log(posts);
    return (
        <div className='sm:ml-[81px] xl:ml-[340px] w-[600px] min-h-screen 
            border-r border-gray-400 text-white py-2'>
            <div className='sticky top-0 bg-black flex justify-between font 
                text-[20px] px-4 py-2 hoverEffect'>
                Home
                <HiOutlineSparkles />
            </div>

            <Input />

            {posts.map((post) => (
                <Post key={post.id} id={post.id} post={post.data()} />
            ))}
        </div>
    )
}

export default Feed
