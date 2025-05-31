export default function BackgroundAnimation() {
  return (
    <div className="absolute w-full h-full  flex items-center justify-center bg-black z-[-1]">
      {/* Background gradient animasi */}
      <div
  className="absolute inset-0 animate-gradient-move bg-[length:200%_200%] blur-[60px] opacity-30 z-0"
  style={{
    backgroundImage: 'linear-gradient(45deg, #12d, #fff08f, #4f0000)',
    backgroundPosition: '0% 50%',
  }}
></div>
    </div>
  );
}
