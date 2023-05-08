/*

Authored by:
Osman

The body animation component is used for various animations on the page, however, I am considering removing it’s implementation entirely as it could possibly lose us marks?

*/
import { motion } from "framer-motion";

interface Props {
  children: any;
  animation: any;
  transition?: any;
}

export let loginAni = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export let mainAni = {
  initial: { opcaity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

export let userAni = {
  initial: { opacity: 0, y: -200 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 200 },
};

export let userTran = {
  type: "spring",
  delay: 0.2,
  duration: 2,
};

export let errorAni = {
  initial: { opacity: 0, x: 200, blur: 1 },
  animate: { opacity: 1, x: 0, blur: 0 },
  exit: { opacity: 0, x: -200 },
};

export let errorTran = {
  delay: 0.2,
  duration: 10,
};

const BodyAnimation = ({
  children,
  animation,
  transition = "spring",
}: Props) => {
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default BodyAnimation;
