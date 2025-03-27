import styled from "styled-components";
import { motion } from "framer-motion";

export const SplashBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #003135; /* Your primary color */
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
