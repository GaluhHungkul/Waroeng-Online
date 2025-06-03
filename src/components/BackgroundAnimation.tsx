export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 bg-black z-[-1] bg-opacity-90">
      <div className="absolute inset-0 animate-gradient-move bg-[length:100%_100%] blur-[60px] opacity-30 z-0"
        style={{
        backgroundImage: 'linear-gradient(210deg,#000000, #fff, #000)',
        backgroundPosition: '0% 50%'}}></div>
    </div>
  );
}
