
import CountUp from "react-countup"

function AnimatedCounter({amount}:{amount:number}) {
  return (
    <div>
        <CountUp 
        duration={2.75}
        decimals={2}
        prefix="₹"
        end={amount}/>
    </div>
  )
}

export default AnimatedCounter