const LoadingAnimation: React.FC = () => {
    return (
        <div className="flex justify-center content-center mb-4 drop-shadow-lg">
            <div className="bg-cyan-500 h-5 w-5 mx-2 rounded-full animate-[big-bounce_1.5s_ease-in-out_infinite_0.25s]"></div>
            <div className="bg-cyan-500 h-5 w-5 mx-2 rounded-full animate-[big-bounce_1.5s_ease-in-out_infinite_0.5s]"></div>
            <div className="bg-cyan-500 h-5 w-5 mx-2 rounded-full animate-[big-bounce_1.5s_ease-in-out_infinite_0.75s]"></div>
            <div className="bg-cyan-500 h-5 w-5 mx-2 rounded-full animate-[big-bounce_1.5s_ease-in-out_infinite_1s]"></div>
        </div>
    )
}
export default LoadingAnimation