


import { Drawer } from '@mui/material';
import styles from './index.module.css'
import { useEffect, useRef, useState } from 'react';
import { searchPost } from '../../server';
import UserInfo from '../UserInfo';
import { useNavigate } from 'react-router-dom';

const SEARCH_LIST_KEY = 'SEARCH_LIST_KEY';
const keysRecord = JSON.parse(localStorage.getItem(SEARCH_LIST_KEY) || '[]')||[];

export default function SearchPanel(props) {
    const { onClose = () => { } } = props;
    const [searched, setSearched] = useState(false)
    const [result, setResult] = useState([])
    const keyRef = useRef()
    const navigator = useNavigate()


    const doSearch = () => {
        const keyStr = keyRef.current.value;
        searchPost(keyStr).then(res => {
            setResult(res)
            setSearched(true)
        })
        if (!keysRecord.includes(keyStr)) {
            keysRecord.push(keyStr)
            window.localStorage.setItem(SEARCH_LIST_KEY, JSON.stringify(keysRecord))
        }

    }

    const handleEnter = (e) => {
        console.log(e);
        if (e.keyCode === 13 && keyRef.current.value.length > 0) {
            doSearch()
        }
    }

    useEffect(() => {

        window.addEventListener('keydown', handleEnter)


        return () => {
            window.removeEventListener('keydown', handleEnter)
        }

    }, [])


    const handleSelectRecord = (value) => {
        keyRef.current.value = value;
        doSearch()
    }
    return (
        <div className={styles.container}>
            <Drawer
                open={true}
                onClose={onClose}
            >
                <div className={styles.panel}>
                    <div className={styles.title}>搜索</div>
                    <div className={styles.searchInputContainer}>
                        <i class="icofont-search-1"></i>
                        <input ref={keyRef} placeholder='搜索' />
                        <span style={{ fontSize: '10px' }}>{
                            searched ?
                                <span onClick={() => { setSearched(false); keyRef.current.value = '' }}>
                                    <i style={{ fontSize: '16px' }} class="icofont-close-line-circled"></i>
                                </span> : <span>回车键</span>
                        }</span>
                    </div>
                    {!searched && <div className={styles.recentList}>
                        <div className={styles.recentTitle}>
                            近期搜索
                        </div>

                        <div className={styles.keysRecord}>
                            {keysRecord.map(item => {
                                return (
                                    <div onClick={() => { handleSelectRecord(item) }}>{item}</div>
                                )
                            })}
                        </div>
                    </div>}
                    {searched && <div className={styles.resultList}>
                        {
                            result.map(item => (
                                <div className={styles.resultItem}>
                                    <div>
                                        <UserInfo user={item.author} onClick={() => { onClose(); navigator('/user/home/' + item.author.uid) }}></UserInfo>
                                        <div className={styles.resultContent}>{item.content}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>}
                </div>
            </Drawer>
        </div>
    )
}