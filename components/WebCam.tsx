import Webcam from "react-webcam";

const WebcamComponent = () => {
  return (
    <div className="flex  flex-col  w-full h-full bg-black">
      <Webcam audio={false} width={500} mirrored={true} />
    </div>
  );
};

export default WebcamComponent;
