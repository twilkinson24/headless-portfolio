import React from "react"
import Lottie from "react-lottie";
import LazyLoad from 'react-lazyload';

const AnimatedIllustration = (props) => {

  return (
    <LazyLoad height={props.height} once >
      <Lottie
      options={{
          loop: props.isLooping,
          autoplay: props.isAutoPlayOn,
          animationData: JSON.parse(props.animationData),
          rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
          }}
          height={props.height}
          width={props.width}
      />
     </LazyLoad>
  )
}
export default AnimatedIllustration