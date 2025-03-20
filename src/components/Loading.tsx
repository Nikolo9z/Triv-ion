import loadingIcon from "../assets/loading.svg";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <img src={loadingIcon} alt="Loading..." className="w-1/2 h-1/2 animate-spin " />
    </div>
  );
};

export default Loading;
