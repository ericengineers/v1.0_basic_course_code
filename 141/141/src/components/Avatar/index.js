
import styles from './index.module.css'

const sizes = [
    ['42px', '36px'],
    ['54px', '48px'],
    ['66px', '60px'],
    ['168px', '158px']
]

// type 1：彩边 0无边
// size 0: 小 1：中 2:大 特大 3
export default function Avatar(props) {
    const { value, type = 0, size = 0 } = props;
    const [c, v] = sizes[size]
    return (
        <div className={styles.avatar} style={{ width: c, height: c,background:type===0?'#fff':' linear-gradient(90deg, rgba(231,104,69,1) 0%, rgba(235,213,140,1) 35%, rgba(158,0,255,1) 100%)' }}>
            <div className={styles.tx} style={{ width: v, height: v }}>
                <img src={value} alt="" />
            </div>
        </div>
    )
}