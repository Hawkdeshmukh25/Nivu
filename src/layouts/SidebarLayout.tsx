import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Heart, Headphones, Sparkles, PenLine, Briefcase, Coffee, BookHeart, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/calm', label: 'Calm Now', icon: Heart },
  { path: '/music', label: 'Music Room', icon: Headphones },
  { path: '/universe', label: 'Our Universe', icon: Sparkles },
  { path: '/letters', label: 'Letters', icon: PenLine },
  { path: '/office', label: 'Office Reset', icon: Briefcase },
  { path: '/food', label: 'Small Meals', icon: Coffee },
  { path: '/mixed-feelings', label: 'Journal', icon: BookHeart },
];

export default function SidebarLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = navItems.slice(0, 4);
  const extraNavItems = navItems.slice(4);

  return (
    <div 
      className="flex h-screen w-full text-brand-ivory overflow-hidden bg-cover bg-no-repeat bg-fixed relative"
      style={{ 
        backgroundImage: 'url(/6eb4d85a-598e-4639-a5a2-cd10ad8aebdd.png)',
        backgroundPosition: 'center 75%'
      }}
    >

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 relative z-20 flex-shrink-0 bg-transparent">
        <div className="p-8 pb-4 flex flex-col gap-1">
          <h1 className="text-3xl font-serif text-brand-beige">The Quiet Between Us</h1>
          <p className="text-sm text-brand-muted italic">A safe space, always.</p>
        </div>
        
        <nav className="flex-1 px-4 flex flex-col gap-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => clsx(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive ? "bg-white/10 text-brand-ivory font-medium" : "text-brand-muted hover:text-brand-ivory hover:bg-white/5"
                )}
              >
                <Icon size={20} className="opacity-80" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <div className="p-8 mt-auto">
          <p className="text-sm font-serif italic text-brand-muted/80 leading-relaxed text-center">
            "You don't have to be strong here.<br/>You just have to be real."
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative bg-transparent pb-20 md:pb-0">
        
        <div className="relative z-10 p-4 lg:p-6 min-h-full">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#181A2D]/90 backdrop-blur-xl border-t border-white/10 flex justify-around p-2 z-40">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
                isActive ? "text-brand-beige" : "text-brand-muted"
              )}
            >
              <Icon size={20} />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 p-2 rounded-lg text-brand-muted transition-all"
        >
          <Menu size={20} />
          <span className="text-[10px]">More</span>
        </button>
      </nav>

      {/* Mobile Side Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-64 bg-[#181A2D] h-full shadow-2xl flex flex-col animate-slide-in-right ml-auto">
            <div className="p-4 flex justify-end border-b border-white/10">
              <button onClick={() => setMobileMenuOpen(false)} className="text-brand-ivory p-2">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
              {extraNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => clsx(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300",
                      isActive ? "bg-white/10 text-brand-ivory font-medium" : "text-brand-muted hover:text-brand-ivory hover:bg-white/5"
                    )}
                  >
                    <Icon size={20} className="opacity-80" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
