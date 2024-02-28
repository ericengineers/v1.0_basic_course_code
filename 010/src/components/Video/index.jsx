import './index.css'
export default function Video(props){
    return (
        <div className='video-container'>
            <video controls autoPlay width='100%' height={844}>
                <source src={props.src} type='video/mp4' />
            </video>
        </div>
    )
}