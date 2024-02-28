import { useEffect, useState } from 'react'
import './index.css'
import Post from '../Post'
export default function PostList(props) {
    const {data}=props;
    return (
        <div class="list">

            {data.map(item=>(
                <Post key={item.pid} data={item}></Post>
            ))}
        </div>
    )
}