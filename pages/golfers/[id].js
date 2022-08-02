import useUserInfo from '../../lib/useUserInfo';
import ScoreCard from '../../components/ScoreCard';
import { useRouter } from 'next/dist/client/router';
import Layout from '../../components/Layout';
const User = () => {
  const route = useRouter()
  const golferId = route.query.id
  const { name, scores, error1, error2 } = useUserInfo(golferId)
  return (
    <Layout>
      <>
        {error1 ? (
          error1
        ) :
          (error2 ? (
            error2
          ) :
            <>
              <div>{ name }</div>
              {scores && scores.map(score => (
                <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={name}
              />
              ))}
            </>
          )}
      </>
    </Layout>
  )
}
export default User
