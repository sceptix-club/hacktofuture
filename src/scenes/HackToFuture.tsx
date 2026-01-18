import { Text } from '@react-three/drei';

type HtfProps = {
  viewportWidth: number;
  progress: number
}

const HackToFuture = ({ viewportWidth, progress }: HtfProps) => {
  const font = "/fonts/DelaGothicOne-Regular.ttf";

  return (
    <Text
      font={font}
      position={[0, 0, 5 + 10 * progress]}
      fontSize={viewportWidth < 15 ? 0.5 : 1.0}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      HACKTOFUTURE
    </Text>
  );
};

export default HackToFuture
