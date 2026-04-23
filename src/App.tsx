import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Wallet, 
  History as HistoryIcon, 
  Menu, 
  Bell, 
  HelpCircle, 
  ArrowLeft,
  ChevronRight,
  Shield,
  Smartphone,
  Lock,
  ArrowRight,
  Fingerprint,
  Send,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt,
  Search,
  Bolt,
  Droplets,
  Tv,
  Wifi,
  Plus,
  X,
  CheckCircle2,
  Download,
  Share2,
  Printer,
  ShieldCheck,
  RefreshCcw,
  User,
  Edit2,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  LayoutDashboard,
  CreditCard,
  ShoppingCart,
  Smartphone as SmartphoneIcon,
  HelpCircle as HelpCircleIcon,
  AlertTriangle,
  BarChart2,
  PieChart,
  Users,
  Banknote,
  Navigation
} from 'lucide-react';

// --- Constants & Types ---
type Screen = 
  | 'login' 
  | 'home' 
  | 'wallet' 
  | 'pay' 
  | 'history' 
  | 'bills' 
  | 'paymentReview' 
  | 'pinEntry' 
  | 'success' 
  | 'sendMoney'
  | 'agentDashboard' 
  | 'merchantAnalytics' 
  | 'adminControl'
  | 'nfcManager';

// --- Shared Components ---

const Button = ({ 
  children, 
  className = "", 
  variant = "primary", 
  onClick,
  ...props 
}: any) => {
  const base = "h-14 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50";
  const variants: any = {
    primary: "bg-primary text-on-primary shadow-lg",
    secondary: "bg-secondary text-on-secondary",
    outline: "border-2 border-outline text-primary hover:bg-primary/5",
    surface: "bg-surface-container-high text-on-surface hover:bg-surface-dim",
    ghost: "text-primary hover:bg-primary/5",
    error: "bg-error text-on-error"
  };
  return (
    <button 
      onClick={onClick} 
      className={`${base} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", noPadding = false }: any) => (
  <div className={`bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden ${noPadding ? "" : "p-lg"} ${className}`}>
    {children}
  </div>
);

const Input = ({ label, icon: Icon, className = "", ...props }: any) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-label-md text-on-surface-variant px-1 font-medium">{label}</label>}
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />}
      <input 
        className={`w-full h-14 bg-surface-container-low border-none rounded-xl ${Icon ? 'pl-12' : 'px-4'} pr-4 focus:ring-2 focus:ring-primary/20 outline-none text-body-md font-medium placeholder:text-outline/50`}
        {...props}
      />
    </div>
  </div>
);

const BottomNav = ({ active, setScreen, type = 'user' }: { active: Screen, setScreen: (s: Screen) => void, type?: 'user' | 'agent' | 'admin' }) => {
  const items = useMemo(() => {
    if (type === 'user') return [
      { id: 'home', icon: Home, label: 'Home' },
      { id: 'wallet', icon: Wallet, label: 'Wallet' },
      { id: 'pay', icon: SmartphoneIcon, label: 'Pay' },
      { id: 'history', icon: HistoryIcon, label: 'History' },
      { id: 'bills', icon: Menu, label: 'More' },
    ];
    return [
      { id: type === 'agent' ? 'agentDashboard' : 'adminControl', icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'history', icon: HistoryIcon, label: 'History' },
      { id: 'pay', icon: SmartphoneIcon, label: 'NFC' },
      { id: 'home', icon: User, label: 'Profile' },
    ];
  }, [type]);

  if (active === 'login' || active === 'pinEntry') return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-white/80 backdrop-blur-md border-t border-outline-variant/20 shadow-lg rounded-t-3xl sm:max-w-md sm:left-1/2 sm:-translate-x-1/2 sm:rounded-3xl sm:mb-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setScreen(item.id as Screen)}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 ${
            active === item.id 
              ? 'text-primary bg-primary/5' 
              : 'text-outline hover:text-primary hover:bg-primary/5'
          }`}
        >
          <item.icon className="w-6 h-6" strokeWidth={active === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

const Header = ({ title, showBack, onBack, setScreen, role }: { title: string, showBack?: boolean, onBack?: () => void, setScreen: (s: Screen) => void, role: string }) => (
  <header className="fixed top-0 left-0 w-full z-50 h-16 bg-white/80 backdrop-blur-md border-b border-outline-variant/20 px-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {showBack ? (
        <button onClick={onBack} className="p-2 hover:bg-surface-container rounded-full transition-all">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
          {role === 'admin' ? <ShieldCheck className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
        </div>
      )}
      <h1 className="text-lg font-bold text-primary tracking-tight">{title}</h1>
    </div>
    <div className="flex items-center gap-1">
      <button className="p-2 text-outline hover:bg-surface-container rounded-full transition-all">
        <Bell className="w-6 h-6" />
      </button>
      <button className="p-2 text-outline hover:bg-surface-container rounded-full transition-all" onClick={() => setScreen('merchantAnalytics')}>
        <BarChart2 className="w-6 h-6" />
      </button>
      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-container ml-2 cursor-pointer" onClick={() => setScreen(role === 'admin' ? 'adminControl' : 'agentDashboard')}>
        <img src="https://i.pravatar.cc/100?img=12" alt="User" />
      </div>
    </div>
  </header>
);

// --- Screen Components ---

const LoginScreen = ({ setScreen, setRole }: { setScreen: (s: Screen) => void, setRole: (r: 'user' | 'agent' | 'admin') => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="min-h-screen flex flex-col items-center justify-center p-margin-mobile bg-surface"
  >
    <div className="w-full max-w-sm flex flex-col gap-xl">
      <header className="flex flex-col items-center text-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary tracking-tighter">FAST-PAY</h1>
          <p className="text-on-surface-variant font-medium mt-1">Sierra Leone's Trusted Wallet</p>
        </div>
      </header>

      <Card className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
           <label className="text-label-md text-on-surface-variant flex items-center gap-2 font-bold uppercase tracking-wider text-[10px]">
             <SmartphoneIcon className="w-4 h-4" /> Phone Number
           </label>
           <div className="flex items-center gap-3 bg-surface-container-low rounded-xl px-4 h-14 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20">
             <div className="flex items-center gap-2 pr-3 border-r border-outline-variant/30 flex-shrink-0">
                <span className="font-bold text-on-surface">+232</span>
             </div>
             <input type="tel" placeholder="7X 000 000" className="bg-transparent border-none focus:ring-0 w-full font-bold tracking-wider" />
           </div>
        </div>

        <Input label="SECURITY PIN" type="password" icon={Lock} placeholder="••••" maxLength={4} className="tracking-widest" />
        
        <Button onClick={() => setScreen('home')}>
          Login <ArrowRight className="w-5 h-5" />
        </Button>

        <div className="relative py-2 flex items-center justify-center">
          <div className="absolute w-full border-t border-outline-variant/20"></div>
          <span className="relative z-10 bg-surface-container-lowest px-4 text-outline text-[10px] font-black uppercase tracking-widest">Or Use Biometrics</span>
        </div>

        <Button variant="surface">
          <Fingerprint className="w-5 h-5 text-primary" /> Sign in with Touch ID
        </Button>
      </Card>

      <footer className="flex flex-col items-center gap-6 mt-4">
        <p className="text-on-surface-variant font-medium text-sm">
          New to FAST-PAY? <button onClick={() => { setRole('admin'); setScreen('home'); }} className="text-primary font-black hover:underline">Create Account</button>
        </p>
        <div className="flex items-center gap-2 text-outline text-[10px] font-black tracking-widest uppercase opacity-60">
          <ShieldCheck className="w-3.5 h-3.5" /> PCI-DSS COMPLIANT & ENCRYPTED
        </div>
      </footer>
    </div>
  </motion.div>
);

const HomeScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }}
    className="pt-20 pb-32 px-margin-mobile flex flex-col gap-6 max-w-lg mx-auto"
  >
    <section className="bg-primary p-6 rounded-2xl text-on-primary shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mb-1">Current Balance</p>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-4xl font-black tracking-tight">Le 45,250</span>
          <span className="text-lg opacity-70 font-bold">.00</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-surface-container-highest overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="rec" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="text-xs font-bold opacity-80">+ 12 recent recipients</span>
        </div>
      </div>
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
    </section>

    <section className="grid grid-cols-4 gap-4">
      {[
        { label: 'Send', icon: Send, color: 'text-primary bg-primary-fixed-dim/20', to: 'sendMoney' },
        { label: 'NFC Pay', icon: SmartphoneIcon, color: 'text-tertiary bg-tertiary-fixed-dim/20', to: 'pay' },
        { label: 'Cash Out', icon: ArrowUpCircle, color: 'text-secondary bg-secondary-fixed-dim/20', to: 'wallet' },
        { label: 'Bills', icon: Receipt, color: 'text-error bg-error-container/40', to: 'bills' }
      ].map((action, i) => (
        <button 
          key={i} 
          onClick={() => setScreen(action.to as Screen)}
          className="flex flex-col items-center gap-2 group transition-all"
        >
          <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shadow-sm group-active:scale-90 transition-all`}>
            <action.icon className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-black text-on-surface uppercase tracking-wider">{action.label}</span>
        </button>
      ))}
    </section>

    <Card className="bg-tertiary p-5 text-on-tertiary relative overflow-hidden flex items-center gap-4 border-none shadow-lg group pointer-events-none">
       <div className="flex-1 relative z-10">
         <h3 className="text-lg font-black">Save More</h3>
         <p className="text-xs opacity-90 leading-tight mt-1">Open a target savings account today and earn up to 8% p.a.</p>
       </div>
       <TrendingUp className="w-12 h-12 opacity-20 absolute right-4 bottom-2 group-hover:scale-110 transition-transform" />
       <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center relative z-10 backdrop-blur-md">
         <TrendingUp className="w-6 h-6" />
       </div>
    </Card>

    <Card className="flex items-center gap-4 bg-white/50 backdrop-blur-sm border-dashed cursor-pointer hover:border-primary/40 transition-all" onClick={() => setScreen('pay')}>
       <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center text-primary">
         <SmartphoneIcon className="w-6 h-6" />
       </div>
       <div className="flex-1">
         <h4 className="font-black text-sm uppercase tracking-tight">Tap to Pay</h4>
         <p className="text-xs text-on-surface-variant font-medium">Pay merchants instantly with NFC</p>
       </div>
       <ChevronRight className="w-5 h-5 text-outline" />
    </Card>

    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-lg font-black text-on-surface tracking-tight">Recent Activity</h2>
        <button onClick={() => setScreen('history')} className="text-xs font-black text-primary hover:underline uppercase tracking-widest">View All</button>
      </div>
      <div className="flex flex-col gap-3">
        {[
          { name: 'City Supermarket', time: 'Today, 11:45 AM', amount: '- Le 450', icon: ShoppingBag, color: 'text-primary' },
          { name: 'Bank Deposit', time: 'Yesterday, 04:20 PM', amount: '+ Le 12,000', icon: Home, color: 'text-tertiary' },
          { name: 'Sent to Mom', time: 'Oct 24, 09:12 AM', amount: '- Le 2,500', icon: User, color: 'text-secondary' }
        ].map((tx, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.color} bg-current/10`}>
                <tx.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-on-surface">{tx.name}</p>
                <p className="text-[10px] uppercase font-black text-outline tracking-widest mt-0.5">{tx.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-black text-sm ${tx.amount.startsWith('+') ? 'text-tertiary' : 'text-error'}`}>{tx.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <button className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform">
      <Plus className="w-8 h-8" strokeWidth={3} />
    </button>
  </motion.div>
);

const WalletScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} 
    animate={{ opacity: 1, x: 0 }}
    className="pt-20 pb-32 px-margin-mobile flex flex-col gap-6 max-w-lg mx-auto"
  >
    <div>
      <h1 className="text-3xl font-black text-primary tracking-tighter">My Wallet</h1>
      <p className="text-sm text-on-surface-variant font-medium">Manage your assets and accounts</p>
    </div>

    <Card className="flex flex-col gap-6 relative overflow-hidden shadow-xl border-none">
      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="text-[10px] text-outline uppercase font-black tracking-widest opacity-60">Total Balance</span>
          <div className="flex items-baseline gap-2 mt-2">
            <h2 className="text-3xl font-black text-primary tracking-tight">SLL 4,250,000</h2>
            <span className="text-[10px] bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full font-black">+2.4%</span>
          </div>
        </div>
        <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center active:scale-90 shadow-lg">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        {[
          { l: 'Currency', v: 'Sierra Leone Leone' },
          { l: 'Status', v: 'Active', isStatus: true },
          { l: 'Limit', v: '15M SLL/mo' },
          { l: 'Verified', v: 'Level 3' }
        ].map((item, i) => (
          <div key={i} className="bg-surface-container/50 backdrop-blur-sm p-3 rounded-xl flex flex-col gap-0.5 border border-white/40">
            <span className="text-[10px] uppercase font-black text-outline opacity-60 tracking-wider font-mono">{item.l}</span>
            <div className="flex items-center gap-1.5">
              {item.isStatus && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
              <span className="text-xs font-black text-on-surface">{item.v}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
    </Card>

    <div className="bg-primary p-6 rounded-2xl text-on-primary shadow-2xl aspect-[1.58/1] flex flex-col justify-between relative overflow-hidden group">
       <div className="flex justify-between items-start relative z-10">
         <span className="text-lg font-black italic tracking-tighter">SIERRA EMERALD</span>
         <SmartphoneIcon className="w-6 h-6 opacity-60" />
       </div>
       <div className="relative z-10">
         <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60 mb-1">Card Number</p>
         <h3 className="text-xl font-bold tracking-[0.3em]">•••• •••• •••• 8842</h3>
       </div>
       <div className="flex justify-between items-end relative z-10">
         <div>
           <p className="text-[10px] uppercase font-black opacity-60 mb-1">Card Holder</p>
           <p className="font-bold tracking-tight uppercase">FATIMATA B. SESAY</p>
         </div>
         <div className="text-right">
           <p className="text-[10px] uppercase font-black opacity-60 mb-1">Expiry</p>
           <p className="font-bold tracking-widest">09/27</p>
         </div>
       </div>
       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
       <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000" />
    </div>

    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-black text-on-surface tracking-tight">Linked Accounts</h3>
        <button className="text-xs font-black text-primary flex items-center gap-1 uppercase tracking-widest"><RefreshCcw className="w-3.5 h-3.5" /> Sync</button>
      </div>
      <div className="flex flex-col gap-3">
        {[
          { name: 'Commercial Bank SL', acc: '•••• 4590', verified: true },
          { name: 'Rokel Savings & Loans', acc: '•••• 1228', primary: true }
        ].map((bank, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-outline-variant/10 shadow-sm transition-all hover:border-primary/20 cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-outline">
              <Home className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-on-surface">{bank.name}</p>
              <p className="text-[10px] font-black text-outline uppercase tracking-wider mt-0.5">Acc: {bank.acc}</p>
            </div>
            {bank.verified && <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500 stroke-white" />}
            {bank.primary && <span className="text-[10px] font-black uppercase text-tertiary bg-tertiary/5 px-2 py-0.5 rounded-full">Primary</span>}
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="mt-4 border-primary/20 text-primary h-14" 
        onClick={() => setScreen('nfcManager')}
      >
        <SmartphoneIcon className="w-5 h-5" /> Provision NFC Card
      </Button>
    </section>
  </motion.div>
);

const AgentDashboard = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
    className="pt-24 px-margin-mobile flex flex-col gap-8 max-w-lg mx-auto pb-32"
    key="agent"
  >
    <div className="flex justify-between items-center bg-primary text-on-primary p-6 rounded-3xl shadow-xl overflow-hidden relative">
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Float Balance</span>
        <h2 className="text-3xl font-black tracking-tight">SLE 125,400.00</h2>
        <div className="mt-2 flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1 rounded-full w-fit backdrop-blur-sm">
          <TrendingUp className="w-3 h-3" /> +15.2% Today
        </div>
      </div>
      <Banknote className="w-16 h-16 opacity-20 absolute right-4 top-1/2 -translate-y-1/2" />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <Card className="flex flex-col gap-4 border-l-4 border-l-tertiary">
        <span className="text-[9px] font-black uppercase text-outline tracking-wider">Commission EARNED</span>
        <h3 className="text-xl font-black text-tertiary">SLE 1,245.50</h3>
        <button className="text-[10px] font-black uppercase text-primary text-left hover:underline">Cashout Now</button>
      </Card>
      <Card className="flex flex-col gap-4 border-l-4 border-l-primary">
        <span className="text-[9px] font-black uppercase text-outline tracking-wider">Total Transactions</span>
        <h3 className="text-xl font-black text-primary">82</h3>
        <button className="text-[10px] font-black uppercase text-primary text-left hover:underline">View Report</button>
      </Card>
    </div>

    <section className="flex flex-col gap-4">
      <h3 className="text-xs font-black uppercase text-outline tracking-widest px-1">Agent Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Cash In', icon: ArrowDownCircle, desc: 'Deposit to customer', color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Cash Out', icon: ArrowUpCircle, desc: 'Withdraw for customer', color: 'bg-primary/5 text-primary' },
          { label: 'Float Top-up', icon: Plus, desc: 'Increase your float', color: 'bg-amber-50 text-amber-600' },
          { label: 'Verify User', icon: ShieldCheck, desc: 'Approve KYC docs', color: 'bg-blue-50 text-blue-600' }
        ].map((action, i) => (
          <button key={i} className="flex flex-col items-start gap-4 p-4 bg-white rounded-2xl border border-outline-variant/10 hover:shadow-lg hover:border-primary/20 transition-all text-left">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
              <action.icon className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-bold text-sm text-on-surface">{action.label}</p>
              <p className="text-[9px] font-medium text-on-surface-variant leading-tight mt-1">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xs font-black uppercase text-outline tracking-widest">Recent Float History</h3>
        <button className="text-[10px] font-black text-primary uppercase tracking-widest">See All</button>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { type: 'Commission', amount: '+ SLE 4.50', time: '10:15 AM' },
          { type: 'Cash In - Musa S.', amount: '- SLE 5,000', time: '09:42 AM' },
          { type: 'Agent Float Refresh', amount: '+ SLE 20,000', time: 'Yesterday' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-outline-variant/10 shadow-sm text-sm">
            <span className="font-bold">{item.type}</span>
            <div className="text-right">
              <p className={`font-black ${item.amount.startsWith('+') ? 'text-emerald-600' : 'text-error'}`}>{item.amount}</p>
              <p className="text-[9px] font-black text-outline uppercase tracking-wider">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const MerchantAnalytics = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
    className="pt-24 px-margin-mobile flex flex-col gap-8 max-w-lg mx-auto pb-32"
    key="merchant"
  >
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-black text-primary tracking-tighter">Business Insights</h1>
      <p className="text-sm font-medium text-on-surface-variant italic">Performance metrics for Sierra Ventures Ltd.</p>
    </div>

    <div className="grid grid-cols-1 gap-4">
      <Card className="bg-white p-6 shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-[10px] font-black uppercase text-outline tracking-widest">Gross Sales (7D)</span>
            <h2 className="text-4xl font-black text-primary tracking-tighter mt-1">SLE 84,200</h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
            <BarChart2 className="w-7 h-7" />
          </div>
        </div>
        <div className="flex items-end justify-between h-24 gap-1">
          {[0.4, 0.6, 0.3, 0.8, 0.5, 0.9, 0.7].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-all cursor-pointer group relative" style={{ height: `${h * 100}%` }}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[8px] px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-black">
                {Math.round(h * 10000)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[8px] font-black text-outline uppercase tracking-widest">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-tertiary-container text-on-tertiary-container border-none p-5">
           <Users className="w-5 h-5 mb-2" />
           <p className="text-[10px] font-black uppercase opacity-60">New Customers</p>
           <h3 className="text-2xl font-black tracking-tight mt-1">124</h3>
           <span className="text-[9px] font-bold">+18% this month</span>
        </Card>
        <Card className="bg-secondary-container text-on-secondary-container border-none p-5">
           <RefreshCcw className="w-5 h-5 mb-2" />
           <p className="text-[10px] font-black uppercase opacity-60">Retention Rate</p>
           <h3 className="text-2xl font-black tracking-tight mt-1">68%</h3>
           <span className="text-[9px] font-bold">Industry avg: 52%</span>
        </Card>
      </div>

      <section className="flex flex-col gap-4">
        <h3 className="text-xs font-black uppercase text-outline tracking-widest px-1">Top Selling Categories</h3>
        <Card className="flex flex-col gap-4">
          {[
            { label: 'Mobile Airtime', pct: 45, color: 'bg-primary' },
            { label: 'Electricity Tokens', pct: 32, color: 'bg-tertiary' },
            { label: 'Data Bundles', pct: 23, color: 'bg-secondary' }
          ].map((cat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-black uppercase">
                <span className="text-on-surface-variant">{cat.label}</span>
                <span className="text-primary">{cat.pct}%</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div className={`h-full ${cat.color}`} style={{ width: `${cat.pct}%` }} />
              </div>
            </div>
          ))}
        </Card>
      </section>
      
      <Button variant="outline" className="w-full border-dashed">
        <Download className="w-5 h-5" /> Download Detailed Tax Audit
      </Button>
    </div>
  </motion.div>
);

const SendMoneyScreen = ({ setScreen, setTransferDetails }: { setScreen: (s: Screen) => void, setTransferDetails: (d: any) => void }) => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedContacts, setSyncedContacts] = useState([
    { name: 'Mom', phone: '77 123 456', img: '12' },
    { name: 'Kadi', phone: '76 998 221', img: '15' },
    { name: 'Abdul', phone: '78 445 009', img: '22' },
    { name: 'Fatu', phone: '79 112 334', img: '25' }
  ]);
  
  const handleContinue = () => {
    const contact = syncedContacts.find(c => c.phone === phone);
    setTransferDetails({ phone, amount, name: contact ? contact.name : 'Musa Sesay' });
    setScreen('paymentReview');
  };

  const syncContacts = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setSyncedContacts([
        { name: 'Brother Joe', phone: '78 111 222', img: '30' },
        { name: 'Office Boss', phone: '79 555 666', img: '45' },
        { name: 'Mariatu', phone: '77 888 999', img: '52' },
        { name: 'Uncle Alpha', phone: '76 444 333', img: '61' },
        ...syncedContacts
      ]);
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      className="pt-24 px-margin-mobile flex flex-col gap-6 max-w-lg mx-auto pb-32"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-primary tracking-tighter">Send Money</h1>
        <p className="text-sm font-medium text-on-surface-variant">Transfer funds instantly to any phone number.</p>
      </div>

      <Card className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
           <div className="flex justify-between items-center px-1">
             <label className="text-xs font-black uppercase text-outline tracking-widest">Recipient Number</label>
             <button 
               onClick={syncContacts}
               disabled={isSyncing}
               className="text-[10px] font-black uppercase text-primary flex items-center gap-1 hover:underline disabled:opacity-50"
             >
               <RefreshCcw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
               {isSyncing ? 'Syncing...' : 'Sync Contacts'}
             </button>
           </div>
           <div className="flex items-center gap-3 bg-surface-container-low rounded-xl px-4 h-14 border border-outline-variant/10 focus-within:border-primary/40 transition-colors">
              <span className="font-bold text-on-surface-variant">+232</span>
              <input 
                type="tel" 
                placeholder="7X 000 000" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border-none focus:ring-0 w-full font-bold tracking-wider outline-none" 
              />
              <button className="p-2 text-primary hover:bg-primary/5 rounded-full transition-all">
                <Users className="w-5 h-5" />
              </button>
           </div>
        </div>

        <div className="flex flex-col gap-2 text-center pt-4">
           <label className="text-xs font-black uppercase text-outline tracking-widest">Amount to Send</label>
           <div className="flex items-center justify-center gap-2">
             <span className="text-2xl font-black text-outline">SLE</span>
             <input 
               type="number" 
               placeholder="0.00" 
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               className="bg-transparent border-none focus:ring-0 text-5xl font-black text-primary w-fit max-w-[200px] text-center placeholder:opacity-20" 
             />
           </div>
           <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-2">Daily Limit Remaining: SLE 15,000</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {['1,000', '5,000', '10,000', '50,000'].map(val => (
            <button 
              key={val} 
              onClick={() => setAmount(val.replace(',', ''))}
              className="py-3 bg-surface-container rounded-xl text-sm font-black text-on-surface hover:bg-primary-fixed transition-colors"
            >
              + {val}
            </button>
          ))}
        </div>

        <Button onClick={handleContinue} className="mt-4" disabled={!phone || !amount}>
          Review Transaction <ArrowRight className="w-5 h-5" />
        </Button>
      </Card>

      <section className="flex flex-col gap-4">
        <h3 className="text-xs font-black uppercase text-outline tracking-widest px-1">Favorite Recipients</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide">
          {syncedContacts.map((rec, i) => (
            <button key={i} className="flex flex-col items-center gap-2 group flex-shrink-0" onClick={() => setPhone(rec.phone)}>
              <div className="w-16 h-16 rounded-full border-2 border-transparent group-hover:border-primary transition-all p-1">
                <img src={`https://i.pravatar.cc/100?img=${rec.img}`} className="w-full h-full rounded-full object-cover" alt={rec.name} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tight">{rec.name}</span>
            </button>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const HistoryScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Enhanced transaction data with categories, icons and localized details
  const transactionsData = [
    { date: 'Today, Oct 24', transactions: [
      { id: '1', name: 'Alpha Electronics SL', time: '14:20', amount: '- SLE 450', status: 'Success', type: 'Payments', category: 'Shopping', icon: ShoppingBag, detail: 'NFC Tap • Freetown Store' },
      { id: '2', name: 'Mariatu Sesay', time: '09:15', amount: '+ SLE 1.2M', status: 'Pending', type: 'Transfers', category: 'Personal', icon: User, detail: 'P2P Transfer • Mom\'s Allowance' }
    ]},
    { date: 'Yesterday, Oct 23', transactions: [
      { id: '3', name: 'City Supermarket', time: '18:45', amount: '- SLE 2.5k', status: 'Success', type: 'Payments', category: 'Grocery', icon: ShoppingCart, detail: 'NFC Tap • Lumley Branch' },
      { id: '4', name: 'Netflix Subscription', time: '00:05', amount: '- SLE 320', status: 'Failed', type: 'Bills', category: 'Entertainment', icon: Tv, detail: 'Web • Monthly Plan' },
      { id: '5', name: 'Orange SL Top-up', time: '12:30', amount: '- SLE 100', status: 'Success', type: 'Bills', category: 'Telecom', icon: SmartphoneIcon, detail: 'Utility • Airtime Purchase' }
    ]}
  ];

  const filteredGroups = transactionsData.map(group => ({
    ...group,
    transactions: group.transactions.filter(tx => {
      const matchesFilter = filter === 'All' || tx.type === filter;
      const matchesSearch = !searchQuery || 
        tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
  })).filter(group => group.transactions.length > 0);
  
  return (
    <motion.div 
       initial={{ opacity: 0 }} animate={{ opacity: 1 }}
       className="pt-24 px-margin-mobile flex flex-col gap-8 max-w-xl mx-auto pb-32" 
       key="history"
    >
       <div className="flex justify-between items-end">
         <div>
           <h1 className="text-3xl font-black text-primary tracking-tighter">History</h1>
           <p className="text-sm text-on-surface-variant font-medium">Financial movements audit</p>
         </div>
         <div className="flex gap-2">
           <button 
             onClick={() => setShowSearch(!showSearch)}
             className={`p-2 transition-all rounded-xl shadow-sm hover:shadow-md text-xs font-black uppercase ${showSearch ? 'bg-primary text-on-primary' : 'bg-white border border-outline-variant/10 text-primary'}`}
           >
             <Search className="w-4 h-4" />
           </button>
           <button 
             onClick={() => alert('Exporting transaction history as PDF...')}
             className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant/10 rounded-xl shadow-sm hover:shadow-md transition-all text-xs font-black uppercase"
           >
             <Download className="w-4 h-4" /> Export
           </button>
         </div>
       </div>

       <AnimatePresence>
         {showSearch && (
           <motion.div 
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: 'auto', opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="overflow-hidden"
           >
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search merchant, category, or status..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 bg-white border border-outline-variant/20 rounded-xl pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-outline" />
                  </button>
                )}
             </div>
           </motion.div>
         )}
       </AnimatePresence>

       <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
         {['All', 'Payments', 'Transfers', 'Cash', 'Bills'].map(f => (
           <button 
             key={f} 
             onClick={() => setFilter(f)}
             className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${filter === f ? 'bg-primary text-on-primary shadow-md' : 'bg-white border border-outline-variant/20 text-outline hover:bg-surface-container'}`}
           >
             {f}
           </button>
         ))}
       </div>

       <div className="flex flex-col gap-8">
         {filteredGroups.length > 0 ? filteredGroups.map(group => (
           <div key={group.date} className="flex flex-col gap-4">
              <h3 className="text-xs font-black text-outline uppercase tracking-[0.2em] border-b border-outline-variant/10 pb-2">{group.date}</h3>
              <div className="flex flex-col gap-2">
                {group.transactions.map((tx) => (
                    <Card key={tx.id} className="flex items-center justify-between p-4 group hover:border-primary/20 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center relative overflow-hidden">
                           <tx.icon className="w-6 h-6 text-primary z-10" />
                           <div className="absolute inset-0 bg-primary/5 opacity-50" />
                         </div>
                         <div className="flex flex-col">
                           <p className="font-bold text-sm text-on-surface flex items-center gap-2">
                             {tx.name}
                           </p>
                           <p className="text-[10px] font-bold text-outline uppercase tracking-wider mt-0.5">
                             {tx.time} • {tx.detail}
                           </p>
                           <div className="mt-1.5 flex items-center gap-2">
                             <span className="text-[8px] font-black uppercase bg-primary-container/20 text-primary px-1.5 py-0.5 rounded border border-primary/10">
                               {tx.category}
                             </span>
                           </div>
                         </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                         <p className={`font-black text-sm tracking-tight ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-on-surface'}`}>
                           {tx.amount}
                         </p>
                         <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                           tx.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 
                           tx.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                           'bg-error/5 text-error border border-error/10'
                         }`}>
                           {tx.status}
                         </span>
                      </div>
                    </Card>
                  ))}
              </div>
           </div>
         )) : (
           <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
             <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline">
               <Search className="w-8 h-8 opacity-20" />
             </div>
             <div>
               <p className="font-bold text-on-surface">No results found</p>
               <p className="text-sm text-on-surface-variant font-medium">Try searching for something else</p>
             </div>
             <Button variant="ghost" onClick={() => { setSearchQuery(''); setFilter('All'); }}>Clear filters</Button>
           </div>
         )}
       </div>
    </motion.div>
  );
};

const PayScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    className="min-h-screen pt-24 px-margin-mobile flex flex-col items-center gap-12 bg-black text-white relative overflow-hidden" 
    key="pay"
  >
     {/* NFC Animation Background */}
     <div className="absolute inset-0 opacity-10 pointer-events-none">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border-2 border-primary rounded-full nfc-animation-ring" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border-2 border-primary rounded-full nfc-animation-ring" style={{ animationDelay: '1s' }} />
     </div>
     
     <div className="text-center relative z-10 flex flex-col items-center">
       <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-2xl border border-primary/30 relative">
          <SmartphoneIcon className="w-12 h-12 text-primary animate-pulse" />
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
       </div>
       <h2 className="text-4xl font-black tracking-tighter uppercase italic">Tap to Pay</h2>
       <p className="text-sm text-outline font-medium mt-3 opacity-60 tracking-widest uppercase">Hold phone near merchant terminal</p>
     </div>

     <div className="w-full max-w-sm aspect-[1.586/1] rounded-3xl relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black border border-white/10 shadow-2xl p-8 flex flex-col justify-between group">
        <div className="flex justify-between items-start">
           <div className="w-12 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg shadow-inner opacity-80" />
           <div className="flex items-center gap-4">
             <SmartphoneIcon className="w-6 h-6 text-primary rotate-45" />
             <div className="text-right">
               <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">Emerald Digital</p>
               <p className="text-[10px] font-black uppercase text-primary">NFC Enabled</p>
             </div>
           </div>
        </div>
        
        <div>
           <p className="text-lg font-mono tracking-[0.3em] opacity-60">**** **** **** 8820</p>
           <div className="flex justify-between items-end mt-4">
              <p className="text-xs font-black uppercase tracking-wider">SIERRA EMERALD USER</p>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
           </div>
        </div>

        {/* Gloss Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
     </div>

     <div className="flex flex-col items-center gap-6 mt-auto pb-12 w-full max-w-xs">
        <div className="animate-pulse flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
           <ShieldCheck className="w-4 h-4" /> Secure NFC Active
        </div>
        <div className="grid grid-cols-1 w-full gap-3">
          <Button onClick={() => setScreen('sendMoney')} variant="outline" className="w-full text-white border-white/20 hover:bg-white/5">Use Phone Number Instead</Button>
          <Button onClick={() => setScreen('nfcManager')} variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary">Manage NFC Cards</Button>
        </div>
     </div>
  </motion.div>
);

const NFCManagerScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('Main Wallet');
  const [linkingStep, setLinkingStep] = useState('');
  const [activeCards, setActiveCards] = useState([
    { id: '1', name: 'FAST-PAY Gold', serial: '..4521', date: '2 days ago', acc: 'Main Wallet' },
    { id: '2', name: 'Office Access Tag', serial: '..9100', date: 'Oct 12', acc: 'Security' }
  ]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEditing = (card: any) => {
    setEditingCardId(card.id);
    setEditValue(card.name);
  };

  const saveEdit = () => {
    setActiveCards(activeCards.map(c => c.id === editingCardId ? { ...c, name: editValue } : c));
    setEditingCardId(null);
  };

  const handleLink = () => {
    setShowConfirm(false);
    setIsWriting(true);
    setLinkingStep('Initializing Secure Channel...');
    
    setTimeout(() => {
      setLinkingStep('RSA Key Exchange (4096-bit)...');
      setTimeout(() => {
        setLinkingStep('Encrypting Auth Token...');
        setTimeout(() => {
          setLinkingStep('Writing AES-256 NDEF Payload...');
          setTimeout(() => {
            const newCard = {
              id: String(Date.now()),
              name: `FAST-PAY Chip ${activeCards.length + 1}`,
              serial: `..${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`,
              date: 'Just now',
              acc: selectedAccount
            };
            setActiveCards([newCard, ...activeCards]);
            setIsWriting(false);
            setSuccess(true);
            setLinkingStep('');
            setTimeout(() => setSuccess(false), 3000);
          }, 1200);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const accounts = [
    { name: 'Main Wallet', balance: 'SLL 4.25M', icon: Wallet },
    { name: 'Business Float', balance: 'SLL 15.0M', icon: TrendingUp },
    { name: 'Savings Account', balance: 'SLL 820K', icon: Home }
  ];

  return (
    <motion.div 
       initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
       className="pt-24 px-margin-mobile flex flex-col gap-8 max-w-xl mx-auto pb-32 relative" 
       key="nfc-manager"
    >
       <AnimatePresence>
          {showConfirm && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 w-full max-w-sm flex flex-col gap-6 shadow-2xl border border-outline-variant/20"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-on-surface uppercase italic tracking-tighter">Initialize Smart Chip</h3>
                    <p className="text-sm text-on-surface-variant font-medium mt-2 leading-relaxed">
                      You are about to write a <span className="font-bold text-primary">Secure AES-256 Auth Token</span> to this card. This will link it permanently to your <span className="font-bold text-primary">{selectedAccount}</span>.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button onClick={handleLink}>Yes, Link Card</Button>
                  <Button variant="ghost" onClick={() => setShowConfirm(false)}>Cancel</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
       </AnimatePresence>

       <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-black text-primary tracking-tighter uppercase italic">NFC Command</h1>
         <p className="text-sm text-on-surface-variant font-medium">Link physical cards to your digital wallet</p>
       </div>

       <div className="flex flex-col gap-4">
         <label className="text-[10px] font-black uppercase text-outline tracking-widest px-1">Target Account for Link</label>
         <div className="flex flex-col gap-2">
           {accounts.map((acc) => (
             <button
               key={acc.name}
               onClick={() => setSelectedAccount(acc.name)}
               className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                 selectedAccount === acc.name 
                 ? 'bg-primary/5 border-primary shadow-sm' 
                 : 'bg-white border-outline-variant/10 group hover:border-primary/20'
               }`}
             >
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedAccount === acc.name ? 'bg-primary text-white' : 'bg-surface-container text-outline group-hover:text-primary transition-colors'}`}>
                 <acc.icon className="w-5 h-5" />
               </div>
               <div className="flex-1 text-left">
                 <p className={`text-sm font-bold ${selectedAccount === acc.name ? 'text-primary' : 'text-on-surface'}`}>{acc.name}</p>
                 <p className="text-[10px] font-black text-outline uppercase tracking-wider mt-0.5">{acc.balance}</p>
               </div>
               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedAccount === acc.name ? 'border-primary bg-primary' : 'border-outline-variant'}`}>
                 {selectedAccount === acc.name && <div className="w-2 h-2 rounded-full bg-white" />}
               </div>
             </button>
           ))}
         </div>
       </div>

       <Card className="relative overflow-hidden p-0 border-none bg-neutral-900 text-white min-h-[220px] flex flex-col shadow-2xl">
          <div className="p-8 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <div className="w-14 h-10 bg-amber-500/20 rounded-lg border border-amber-500/30 flex items-center justify-center">
                 <SmartphoneIcon className="w-6 h-6 text-amber-500" />
               </div>
               <div className="text-right">
                 <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">Status</p>
                 <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full transition-all ${success ? 'bg-emerald-500 text-black' : 'bg-primary text-white animate-pulse'}`}>
                    {success ? 'Linked Successfully' : 'Ready to Sync'}
                 </span>
               </div>
            </div>

            <div className="mt-8">
               <p className="text-2xl font-mono tracking-[0.4em] opacity-40">•••• •••• •••• ••••</p>
               <div className="flex items-center gap-2 mt-4">
                 <SmartphoneIcon className="w-4 h-4 text-primary animate-bounce" />
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Tap Card to Phone Back</p>
               </div>
            </div>
          </div>
          
          <AnimatePresence>
            {isWriting && (
              <motion.div 
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                className="absolute inset-0 bg-primary flex flex-col items-center justify-center gap-6 z-20"
              >
                <div className="relative">
                  <RefreshCcw className="w-16 h-16 animate-spin text-on-primary opacity-20" />
                  <SmartphoneIcon className="w-8 h-8 text-on-primary absolute inset-0 m-auto" />
                </div>
                <div className="text-center px-6">
                  <p className="text-xl font-black italic uppercase tracking-tighter text-on-primary">{linkingStep}</p>
                  {(linkingStep.includes('Writing') || linkingStep.includes('Encrypting')) && (
                    <p className="font-mono text-[8px] text-white/40 mt-3 break-all line-clamp-1 h-3">
                      {Array.from({length: 32}).map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()).join(' ')}
                    </p>
                  )}
                  <p className="text-[10px] uppercase font-black tracking-widest text-on-primary/60 mt-4 underline decoration-on-primary/20 decoration-2 underline-offset-4">Keep Card Pressed to Phone</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/10 overflow-hidden">
            <motion.div 
              animate={isWriting ? { x: ['-100%', '100%'] } : { x: success ? '0%' : '-100%' }}
              transition={{ repeat: isWriting ? Infinity : 0, duration: 1, ease: 'linear' }}
              className="h-full w-full bg-emerald-500"
            />
          </div>
       </Card>

       <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-on-surface">End-to-End Encryption</p>
              <p className="text-[10px] text-on-surface-variant font-medium mt-1">Linking {selectedAccount} uses PCI-DSS level tokens. The card itself never stores your PIN or full CVV. Tap securely.</p>
            </div>
          </div>

          <section className="flex flex-col gap-4">
             <div className="flex justify-between items-center px-1">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-outline">Manage NFC Devices</h3>
               <span className="text-[10px] font-black text-primary uppercase">{activeCards.length} Cards</span>
             </div>
             
             <div className="flex gap-4 overflow-x-auto pb-6 -mx-margin-mobile px-margin-mobile scrollbar-hide">
               {activeCards.map((card) => (
                 <Card 
                   key={card.id} 
                   className="min-w-[240px] p-5 flex flex-col gap-6 relative group overflow-hidden border-outline-variant/10 hover:border-primary/50 transition-all bg-white shadow-lg"
                 >
                   <div className="flex justify-between items-start">
                     <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                       <CreditCard className="w-6 h-6" />
                     </div>
                     <button 
                       onClick={(e) => { e.stopPropagation(); startEditing(card); }}
                       className="p-2 text-outline hover:text-primary transition-colors bg-surface-container-low rounded-full"
                     >
                       <Edit2 className="w-4 h-4" />
                     </button>
                   </div>
                   
                   {editingCardId === card.id ? (
                     <div className="flex flex-col gap-3">
                        <input 
                          autoFocus
                          value={editValue} 
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                          className="bg-surface-container-low border border-primary/30 rounded-lg p-2 text-sm font-bold w-full outline-none"
                        />
                        <div className="flex gap-2">
                          <button onClick={saveEdit} className="text-[10px] font-black text-primary uppercase">Save</button>
                          <button onClick={() => setEditingCardId(null)} className="text-[10px] font-black text-outline uppercase">Cancel</button>
                        </div>
                     </div>
                   ) : (
                     <div onClick={() => startEditing(card)}>
                       <p className="text-lg font-black text-on-surface tracking-tight">{card.name}</p>
                       <p className="text-[10px] font-black text-outline uppercase tracking-wider mt-1">{card.serial} • {card.acc}</p>
                     </div>
                   )}
                   
                   <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant/5">
                     <span className="text-[9px] font-black text-outline uppercase opacity-60">Synced: {card.date}</span>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                   </div>
                 </Card>
               ))}
               
               <Card 
                 onClick={() => setShowConfirm(true)}
                 className="min-w-[180px] border-dashed border-2 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-primary/5 hover:border-primary transition-all p-5 bg-white/50 shadow-md"
               >
                 <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-outline group-hover:bg-primary group-hover:text-white transition-all">
                   <Plus className="w-6 h-6" />
                 </div>
                 <div className="text-center">
                   <p className="text-xs font-black text-on-surface uppercase tracking-tight">Add New Card</p>
                   <p className="text-[9px] font-medium text-outline mt-1 italic tracking-widest">Connect Chip</p>
                 </div>
               </Card>
             </div>
          </section>

          <Button 
            onClick={() => setShowConfirm(true)}
            disabled={isWriting}
            className="w-full h-16 text-lg tracking-tight shadow-xl bg-primary text-white"
          >
            {isWriting ? 'Syncing...' : `Link to ${selectedAccount}`}
          </Button>

          <p className="text-center text-[9px] font-black text-outline uppercase tracking-widest mt-2 px-8 leading-relaxed opacity-60">
            For best results, remove thick phone cases before writing to NFC tags or cards.
          </p>
       </div>
    </motion.div>
  );
};

const BillsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <motion.div 
       initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
       className="pt-24 px-margin-mobile flex flex-col gap-8 max-w-lg mx-auto pb-32" 
       key="bills"
    >
      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <Card className="bg-white p-8 w-full max-w-sm flex flex-col gap-6 shadow-2xl">
              <div className="text-center font-bold">Utility payments are currently offline for maintenance.</div>
              <Button onClick={() => setShowConfirm(false)}>Dismiss</Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
     <div>
       <h1 className="text-3xl font-black text-primary tracking-tighter">Bill Payments</h1>
       <p className="text-sm text-on-surface-variant font-medium mt-1">Fast & reliable settlements in Sierra Leone</p>
     </div>

     <div className="relative group">
       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline opacity-40 group-focus-within:text-primary group-focus-within:opacity-100 transition-all" />
       <input type="text" placeholder="Search service (EDSA, Guma...)" className="w-full h-14 bg-white rounded-2xl pl-12 pr-4 border border-outline-variant/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-bold" />
     </div>

     <section className="grid grid-cols-2 gap-4">
        {[
          { label: 'Electricity', icon: Bolt, sub: 'EDSA PREPAID', color: 'text-amber-600 bg-amber-50' },
          { label: 'Water', icon: Droplets, sub: 'GUMA VALLEY', color: 'text-blue-600 bg-blue-50' }
        ].map((item, i) => (
          <Card key={i} className="flex flex-col gap-6 p-5 hover:border-primary/20 transition-all cursor-pointer active:scale-95" onClick={() => setShowConfirm(true)}>
            <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-tight">{item.label}</h4>
              <p className="text-[10px] font-black text-outline tracking-wider mt-0.5">{item.sub}</p>
            </div>
          </Card>
        ))}
     </section>

     <Card className="flex flex-col gap-6">
       <h3 className="text-xs font-black uppercase tracking-widest text-outline">Utility Categories</h3>
       <div className="grid grid-cols-1 gap-2">
         {[
           { l: 'TV & Video', icon: Tv, services: ['DStv Sierra Leone', 'StarTimes'] },
           { l: 'Internet & Data', icon: Wifi, services: ['Africell 4G', 'Orange SL'] }
         ].map((cat, i) => (
           <div key={i} className="flex flex-col gap-3 p-2">
              <div className="flex items-center gap-2 mb-1">
                <cat.icon className="w-4 h-4 text-primary" />
                <span className="font-black text-xs uppercase tracking-wider">{cat.l}</span>
              </div>
              {cat.services.map(s => (
                <div key={s} className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl hover:bg-primary-fixed transition-colors cursor-pointer group">
                   <span className="text-sm font-bold opacity-80 group-hover:opacity-100 group-hover:text-primary">{s}</span>
                   <ChevronRight className="w-4 h-4 text-outline" />
                </div>
              ))}
           </div>
         ))}
       </div>
     </Card>
  </motion.div>
  );
};

const AdminControlScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [users, setUsers] = useState([
    { id: '1', name: 'Fatmata Koroma', role: 'user', status: 'active', email: 'fatmata@example.com' },
    { id: '2', name: 'Ibrahim Sesay', role: 'agent', status: 'active', email: 'ibrahim@example.com' },
    { id: '3', name: 'Sallay Jalloh', role: 'user', status: 'deactivated', email: 'sallay@example.com' },
  ]);

  const toggleRole = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: u.role === 'user' ? 'agent' : 'user' } : u));
  };

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'deactivated' : 'active' } : u));
  };

  return (
    <motion.div 
       initial={{ opacity: 0 }} animate={{ opacity: 1 }}
       className="pt-24 px-margin-mobile flex flex-col gap-8 max-w-4xl mx-auto pb-32" 
       key="admin"
    >
       <div className="flex justify-between items-end">
         <div>
           <h1 className="text-4xl font-black text-primary tracking-tighter underline decoration-primary-container decoration-8 underline-offset-4">Control Center</h1>
           <p className="text-lg text-on-surface-variant font-medium mt-3 uppercase tracking-widest text-xs opacity-60">System Monitoring & Governance</p>
         </div>
         <div className="flex gap-4">
           <Button variant="outline" className="h-12 text-xs"><RefreshCcw className="w-4 h-4" /> Node Sync</Button>
           <Button variant="error" className="h-12 text-xs font-black shadow-none"><Shield className="w-4 h-4" /> LOCKDOWN</Button>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="md:col-span-2 h-72 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">Network Health <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /></h3>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active • 1,204 Nodes</span>
            </div>
            <div className="flex-1 flex items-end justify-between gap-1.5 px-2">
               {[0.3, 0.5, 0.4, 0.8, 0.6, 0.9, 0.7, 0.5, 0.8, 0.9, 0.85, 1].map((h, i) => (
                 <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-xs hover:bg-emerald-500 transition-all h-full origin-bottom" style={{ height: `${h * 100}%` }} />
               ))}
            </div>
            <div className="flex justify-between text-[8px] font-black text-outline uppercase tracking-[0.2em] px-2">
               <span>Throughput: 12.4 GB/s</span>
               <span>Latency: 14ms</span>
               <span>Uptime: 99.99%</span>
            </div>
         </Card>

         <Card className="bg-primary text-on-primary flex flex-col justify-between border-none shadow-2xl relative overflow-hidden group">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">System Volume (24H)</p>
            <div>
              <h2 className="text-4xl font-black tracking-tighter">SLL 4.8B</h2>
              <div className="flex items-center gap-1.5 text-xs font-black mt-2 text-on-primary-container">
                <TrendingUp className="w-4 h-4" /> +12.4%
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10">
               <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 opacity-60"><span>Settlement</span><span>82%</span></div>
               <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full bg-on-primary-container w-[82%]" />
               </div>
            </div>
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
         </Card>
       </div>

       <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-6">
             <div className="flex justify-between items-center">
                <h3 className="text-lg font-black tracking-tight flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> User Governance</h3>
                <span className="text-[10px] font-black text-primary uppercase">{users.length} Registered Users</span>
             </div>
             
             <div className="overflow-x-auto -mx-6 px-6">
               <table className="w-full min-w-[600px] border-collapse">
                 <thead>
                   <tr className="border-b border-outline-variant/10">
                     <th className="text-left py-4 text-[10px] font-black uppercase text-outline tracking-wider">User Profile</th>
                     <th className="text-left py-4 text-[10px] font-black uppercase text-outline tracking-wider">Access Rights</th>
                     <th className="text-left py-4 text-[10px] font-black uppercase text-outline tracking-wider">Account Status</th>
                     <th className="text-right py-4 text-[10px] font-black uppercase text-outline tracking-wider">System Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {users.map((user) => (
                     <tr key={user.id} className="border-b border-outline-variant/5 hover:bg-surface-container-low transition-colors group">
                       <td className="py-4">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-xs text-primary uppercase">
                             {user.name.split(' ').map(n => n[0]).join('')}
                           </div>
                           <div>
                             <p className="font-bold text-sm text-on-surface">{user.name}</p>
                             <p className="text-[10px] text-outline truncate w-32">{user.email}</p>
                           </div>
                         </div>
                       </td>
                       <td className="py-4 text-sm">
                         <span className={`font-black uppercase text-[10px] px-2.5 py-1 rounded-full ${user.role === 'agent' ? 'bg-amber-100 text-amber-800' : 'bg-primary/10 text-primary'}`}>
                           {user.role}
                         </span>
                       </td>
                       <td className="py-4 text-sm">
                         <div className="flex items-center gap-1.5">
                           <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-error shadow-[0_0_8px_rgba(186,26,26,0.5)]'}`} />
                           <span className={`font-black uppercase text-[10px] ${user.status === 'active' ? 'text-emerald-700' : 'text-error'}`}>
                             {user.status}
                           </span>
                         </div>
                       </td>
                       <td className="py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                           <button 
                             onClick={() => toggleRole(user.id)}
                             className="p-2 bg-surface-container rounded-lg hover:bg-primary/10 hover:text-primary transition-all text-xs font-black uppercase tracking-tighter flex items-center gap-1 border border-outline-variant/10"
                           >
                             <ShieldCheck className="w-3.5 h-3.5" /> Promotion
                           </button>
                           <button 
                             onClick={() => toggleStatus(user.id)}
                             className={`p-2 rounded-lg transition-all text-xs font-black uppercase tracking-tighter flex items-center gap-1 border border-outline-variant/10 ${user.status === 'active' ? 'bg-error/10 text-error hover:bg-error hover:text-white' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-600 hover:text-white'}`}
                           >
                             {user.status === 'active' ? <Lock className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />} 
                             {user.status === 'active' ? 'Suspend' : 'Reinstate'}
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </Card>
       </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        <Card className="flex flex-col gap-6">
          <h3 className="text-lg font-black tracking-tight flex items-center gap-2"><SmartphoneIcon className="w-5 h-5 text-primary" /> Verification Queue</h3>
          <div className="flex flex-col gap-2">
            {['Kabs Bangura', 'Aminata Kamara', 'Musa Conteh'].map(agent => (
              <div key={agent} className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-primary-fixed transition-colors cursor-pointer group">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center font-black text-xs text-primary">{agent.split(' ').map(n => n[0]).join('')}</div>
                   <span className="font-bold text-sm tracking-tight">{agent}</span>
                 </div>
                 <ChevronRight className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="h-12 text-xs font-black text-emerald-700 border-emerald-600/30">View All 24 Applications</Button>
        </Card>

        <Card className="flex flex-col gap-6">
          <h3 className="text-lg font-black tracking-tight text-error flex items-center gap-2"><Shield className="w-5 h-5" /> Security Alerts</h3>
          <div className="space-y-4">
            <div className="p-4 bg-error/5 border-l-4 border-error rounded-r-xl">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-error" />
                <span className="text-xs font-black uppercase text-error">Unusual Withdrawal</span>
              </div>
              <p className="text-xs font-medium text-error opacity-80">High-value transactions detected from IP 192.168.1.45 (Makeni Node).</p>
              <div className="mt-3 flex gap-4">
                <button className="text-[10px] font-black uppercase underline text-error">Investigate</button>
                <button className="text-[10px] font-black uppercase opacity-40">Dismiss</button>
              </div>
            </div>
            <div className="p-4 bg-amber-50/50 border-l-4 border-amber-500 rounded-r-xl">
                <span className="text-xs font-black uppercase text-amber-700 tracking-tight flex items-center gap-2"><HelpCircleIcon className="w-3.5 h-3.5" /> API Rate Approaching</span>
                <p className="text-[10px] font-medium text-amber-800 opacity-60 mt-1">FAST-PAY API reaching 85% of daily quota.</p>
            </div>
          </div>
        </Card>
     </div>
  </motion.div>
  );
};

const AppView = () => {
  const [screen, setScreen] = useState<Screen>('login');
  const [role, setRole] = useState<'user' | 'agent' | 'admin'>('admin');
  const [transferDetails, setTransferDetails] = useState({ name: 'Musa Sesay', amount: '1250000', phone: '+232 77 123 456' });

  const screenTitle = useMemo(() => {
    switch(screen) {
      case 'home': return 'FAST-PAY';
      case 'wallet': return 'My Wallet';
      case 'pay': return 'Secure Payment';
      case 'history': return 'Activity History';
      case 'bills': return 'Bill Payments';
      case 'sendMoney': return 'Send Money';
      case 'paymentReview': return 'Review Transaction';
      case 'agentDashboard': return 'Agent Portal';
      case 'merchantAnalytics': return 'Business Insights';
      case 'adminControl': return 'System Control';
      case 'nfcManager': return 'NFC Card Manager';
      default: return 'FAST-PAY';
    }
  }, [screen]);

  return (
    <div className="min-h-screen bg-background">
      {screen !== 'login' && screen !== 'pinEntry' && (
        <Header 
          title={screenTitle} 
          showBack={['paymentReview', 'success', 'bills', 'sendMoney', 'history', 'nfcManager', 'merchantAnalytics', 'agentDashboard', 'adminControl'].includes(screen)}
          onBack={() => setScreen('home')}
          setScreen={setScreen}
          role={role}
        />
      )}
      
      <main className="pb-32">
        <AnimatePresence mode="wait">
          {screen === 'home' && <HomeScreen setScreen={setScreen} />}
          {screen === 'wallet' && <WalletScreen setScreen={setScreen} />}
          {screen === 'pay' && <PayScreen setScreen={setScreen} />}
          {screen === 'agentDashboard' && <AgentDashboard setScreen={setScreen} />}
          {screen === 'merchantAnalytics' && <MerchantAnalytics setScreen={setScreen} />}
          {screen === 'history' && <HistoryScreen setScreen={setScreen} />}
          {screen === 'bills' && <BillsScreen setScreen={setScreen} />}
          {screen === 'adminControl' && <AdminControlScreen setScreen={setScreen} />}
          {screen === 'sendMoney' && <SendMoneyScreen setScreen={setScreen} setTransferDetails={setTransferDetails} />}
          {screen === 'nfcManager' && <NFCManagerScreen setScreen={setScreen} />}
          
          {screen === 'paymentReview' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="pt-24 px-margin-mobile flex flex-col gap-6 max-w-lg mx-auto pb-32" 
              key="review"
            >
               <Card className="flex flex-col gap-6">
                 <div>
                   <p className="text-[10px] text-outline uppercase font-black tracking-widest mb-4 opacity-60">Recipient</p>
                   <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-black text-xl">
                       {transferDetails.name.split(' ').map(n=>n[0]).join('')}
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-on-surface">{transferDetails.name}</h3>
                       <p className="text-sm text-on-surface-variant font-medium">+232 {transferDetails.phone}</p>
                     </div>
                   </div>
                 </div>
               </Card>

               <Card className="bg-primary-container text-on-primary-container border-none shadow-xl relative overflow-hidden group">
                 <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mb-2">Payment Amount</p>
                 <div className="flex items-baseline gap-2 relative z-10">
                   <h2 className="text-3xl font-black tracking-tight">Le {Number(transferDetails.amount).toLocaleString()}</h2>
                   <span className="font-black opacity-80 text-sm italic">SLE</span>
                 </div>
                 <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
               </Card>

               <Card className="flex flex-col gap-4">
                  <div className="flex justify-between py-2 border-b border-outline-variant/10">
                    <span className="text-xs text-on-surface-variant font-black uppercase tracking-wider opacity-60">Fee</span>
                    <span className="font-bold text-sm">Le {(Number(transferDetails.amount) * 0.01).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-outline-variant/10">
                    <span className="text-xs text-on-surface-variant font-black uppercase tracking-wider opacity-60">Method</span>
                    <div className="flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-primary" />
                      <span className="font-black text-xs uppercase">Main Wallet</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-black text-primary uppercase tracking-widest">Total</span>
                    <span className="text-2xl font-black text-primary tracking-tighter">Le {(Number(transferDetails.amount) * 1.01).toLocaleString()}</span>
                  </div>
               </Card>
               
               <div className="flex items-center gap-3 p-4 bg-tertiary/5 rounded-xl border border-tertiary/10">
                 <ShieldCheck className="w-5 h-5 text-tertiary" />
                 <p className="text-[10px] text-on-tertiary-fixed-variant font-bold leading-relaxed uppercase tracking-wider">Transaction protected by 256-bit AES encryption.</p>
               </div>

               <Button onClick={() => setScreen('pinEntry')} className="mt-4">Confirm & Pay</Button>
            </motion.div>
          )}

          {screen === 'pinEntry' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="min-h-screen flex flex-col items-center pt-24 px-margin-mobile bg-surface" 
              key="pin"
            >
              <div className="w-full max-w-sm flex flex-col items-center gap-12">
                <div className="text-center">
                  <Lock className="w-12 h-12 text-tertiary mx-auto mb-4" strokeWidth={2.5} />
                  <h2 className="text-2xl font-black text-on-surface tracking-tighter">Enter Authorization PIN</h2>
                  <p className="text-sm text-on-surface-variant font-medium mt-2">Personalize Security Layer • Trans 882-019</p>
                </div>

                <div className="flex gap-6">
                  {[true, true, false, false].map((filled, i) => (
                    <div 
                      key={i} 
                      className={`w-5 h-5 rounded-full transition-all duration-300 ${filled ? 'bg-primary ring-8 ring-primary/10' : 'bg-surface-container-highest'}`} 
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-6 w-full px-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, 'DEL'].map((num, i) => (
                    <button 
                      key={i}
                      onClick={() => num === 0 && setScreen('success')}
                      className="aspect-square rounded-full text-2xl font-black text-on-surface bg-surface-container-low hover:bg-primary-fixed transition-all active:scale-90"
                    >
                      {num === '*' ? <Fingerprint className="w-8 h-8 mx-auto opacity-40" /> : num === 'DEL' ? <X className="w-8 h-8 mx-auto opacity-40" /> : num}
                    </button>
                  ))}
                </div>

                <button className="text-primary font-black uppercase text-[10px] tracking-widest hover:underline">Forgot PIN?</button>
              </div>
            </motion.div>
          )}

          {screen === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="pt-24 px-margin-mobile flex flex-col items-center gap-8 max-w-lg mx-auto pb-32" 
              key="success"
            >
               <div className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl relative">
                  <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={3} />
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500 nfc-animation-ring opacity-20" />
               </div>

               <div className="text-center">
                 <h2 className="text-3xl font-black text-primary tracking-tighter">Payment Successful!</h2>
                 <p className="text-on-surface-variant font-medium mt-1">Receipt Ref: TXN-SL-2023-F2X</p>
               </div>

               <Card className="w-full relative py-8 flex flex-col gap-6 overflow-visible">
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500 rounded-t-xl" />
                 <div className="text-center pb-6 border-b border-outline-variant/10">
                   <span className="text-[10px] text-outline uppercase font-black tracking-[0.2em] opacity-60">Amount Processed</span>
                   <h1 className="text-3xl font-black text-on-surface mt-2 tracking-tighter">SLE {(Number(transferDetails.amount) * 1.01).toLocaleString()}</h1>
                 </div>
                 <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-2">
                   <div><p className="text-[9px] uppercase font-black text-outline tracking-widest mb-0.5">To</p><p className="font-bold text-sm">{transferDetails.name}</p></div>
                   <div className="text-right"><p className="text-[9px] uppercase font-black text-outline tracking-widest mb-0.5">Date</p><p className="font-bold text-sm">24 OCT 23</p></div>
                   <div><p className="text-[9px] uppercase font-black text-outline tracking-widest mb-0.5">Method</p><p className="font-bold text-sm uppercase text-xs">Wallet Hub</p></div>
                   <div className="text-right"><p className="text-[9px] uppercase font-black text-outline tracking-widest mb-0.5">Status</p><p className="font-black text-emerald-600 uppercase text-[10px]">Verified</p></div>
                 </div>
                 <div className="mx-auto w-12 h-1 bg-surface-container rounded-full opacity-20" />
               </Card>

               <div className="w-full flex flex-col gap-3">
                 <Button className="w-full bg-emerald-700 h-14"><Download className="w-5 h-5" /> Get Digital Receipt</Button>
                 <Button variant="ghost" className="w-full py-2 h-auto text-[10px] font-black uppercase tracking-widest" onClick={() => setScreen('home')}>Return Dashboard</Button>
               </div>

               <div className="flex gap-4 mt-2">
                 <button className="w-14 h-14 bg-white border border-outline-variant/20 rounded-2xl flex items-center justify-center text-outline hover:text-primary transition-all"><Share2 className="w-6 h-6" /></button>
                 <button className="w-14 h-14 bg-white border border-outline-variant/20 rounded-2xl flex items-center justify-center text-outline hover:text-primary transition-all"><Printer className="w-6 h-6" /></button>
               </div>
            </motion.div>
          )}

          {screen === 'login' && <LoginScreen setScreen={setScreen} setRole={setRole} />}

        </AnimatePresence>
      </main>

      <BottomNav 
        active={screen} 
        setScreen={setScreen} 
        type={role} 
      />
    </div>
  );
};

export default function App() {
  return <AppView />;
}
