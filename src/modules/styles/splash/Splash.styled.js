import styled from "styled-components";
import { motion } from "framer-motion";

export const SplashBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: white;
  font-family: "Literata", serif;
  text-align: center;
  margin-bottom: 20px;
`;

export const Loader = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
export const MotionDiv = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

export const LogoContainer = styled("img")`
  max-width: 120px;
  max-height: 120px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  }
`;
