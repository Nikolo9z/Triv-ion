import Logo from '../assets/logo.webp';

export default function Header() {
    return (
      <header className="text-white font-bold h-20 pt-3 flex items-center justify-between">
        <div className="w-30">
          <img 
            src={Logo} 
            alt="Logo"
            className="w-30 max-md:w-20 drop-shadow-[0_0_10px_rgba(255,145,0,0.8)]" 
          />
        </div> 
        <h1 className="text-5xl max-md:text-2xl">Triv-ion</h1>
        <div className="w-30">
        </div>
      </header>
    );
  }
  