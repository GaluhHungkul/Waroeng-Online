import { ReactNode } from "react";

const AnimatedLoginBackground = ({ className, children } : { className? : string; children : ReactNode }) => {
  return (
    <div className={`${className}`}>
        {children}
    </div>
  )
}

export default AnimatedLoginBackground