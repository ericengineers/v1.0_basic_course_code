import useFollow from "../../hooks/useFollow";


export default function RecommendUser(props) {
    const {data}=props;
    const {uid}=data;
    const [follow, dispatchFollow] = useFollow({ id: uid, type: 'user' })
    return (
        <div className="re-user">
            <div className="tx">
                <img src={data.avatar} alt="" />
            </div>
            <div className="nikname">
                <div style={{ color: '#000', fontWeight: 'bold' }}>{data.nickname}</div>
                <div>热门</div>
            </div>
            <div className="btn" onClick={() => {
                dispatchFollow()
            }}>
                {follow?'已关注':'关注'}
            </div>
        </div>
    )
}