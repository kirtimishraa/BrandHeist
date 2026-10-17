// Framer Motion's animation engine, split out so it loads after the page is interactive
// (see components/MotionProvider). domAnimation covers everything the site uses; no layout animations.
import { domAnimation } from "framer-motion";

export default domAnimation;
