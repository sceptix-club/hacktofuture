import { Text } from '@react-three/drei';

type HtfProps = {
  viewportWidth: number;
  progress: number
}

const HackToFuture = ({ viewportWidth, progress }: HtfProps) => {
  const font = "/fonts/DelaGothicOne-Regular.ttf";

  return (
    <>
      <Text
        font={font}
        position={[0, 0, 5 + 10 * progress]}
        fontSize={viewportWidth < 15 ? 0.5 : 1.0}
        color="black"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.3}
        outlineWidth={0.02}
        outlineColor="black"
        outlineOpacity={0.5}
      >
        HACKTOFUTURE
      </Text>

      <Text
        font={font}
        position={[0, 0, 5 + 10 * progress]}
        fontSize={viewportWidth < 15 ? 0.5 : 1.0}
        color="grey"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.1}
        outlineWidth={0.04}
        outlineColor="grey"
        outlineOpacity={0.3}
      >
        HACKTOFUTURE
      </Text>

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
    </>
  );
};

export default HackToFuture
