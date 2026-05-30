import React, { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowLeft,
  BarChart3,
  Check,
  ChevronRight,
  CircleDot,
  Clock,
  Compass,
  Copy,
  Edit3,
  Eye,
  Globe2,
  Link2,
  MapPin,
  MessageCircle,
  MousePointerClick,
  Package,
  Plus,
  QrCode,
  Search,
  Settings,
  ShoppingBag,
  Smartphone,
  Star,
  Store,
  TrendingUp,
  Utensils,
} from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Burger Numeny',
    category: 'Mais pedidos',
    description: 'Pão brioche, blend 160g, queijo, molho especial, cebola caramelizada, alface, tomate e maionese da casa.',
    price: 29.9,
    views: 423,
    featured: true,
    image: '🍔',
  },
  {
    id: 2,
    name: 'Combo Clássico',
    category: 'Combos',
    description: 'Burger clássico, batata crocante e refrigerante lata. Ideal para quem quer pedir rápido e completo.',
    price: 42.9,
    views: 318,
    featured: true,
    image: '🍟',
  },
  {
    id: 3,
    name: 'Chicken Crispy',
    category: 'Hambúrgueres',
    description: 'Frango crocante, queijo, alface, tomate e maionese da casa no pão brioche.',
    price: 27.9,
    views: 241,
    featured: false,
    image: '🥪',
  },
  {
    id: 4,
    name: 'Batata Cheddar',
    category: 'Acompanhamentos',
    description: 'Batata frita com cheddar cremoso e bacon crocante. Boa opção para compartilhar.',
    price: 22.9,
    views: 198,
    featured: false,
    image: '🍟',
  },
  {
    id: 5,
    name: 'Refrigerante Lata',
    category: 'Bebidas',
    description: 'Coca-Cola, Guaraná ou Sprite. Consulte disponibilidade no balcão ou WhatsApp.',
    price: 6.9,
    views: 171,
    featured: false,
    image: '🥤',
  },
  {
    id: 6,
    name: 'Brownie da Casa',
    category: 'Sobremesas',
    description: 'Brownie artesanal com calda de chocolate e massa cremosa.',
    price: 14.9,
    views: 129,
    featured: false,
    image: '🍫',
  },
]

const categories = ['Mais pedidos', 'Hambúrgueres', 'Combos', 'Acompanhamentos', 'Bebidas', 'Sobremesas']

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function Logo() {
  return <img src="./assets/numeny-wordmark.png" alt="Numeny" className="h-8 w-auto object-contain sm:h-9" />
}

function Button({ children, variant = 'primary', className = '', icon: Icon, ...props }) {
  const styles = {
    primary: 'bg-[#E63946] text-white hover:bg-[#d92f3d] shadow-sm shadow-red-200',
    secondary: 'bg-white text-[#1F1F1F] ring-1 ring-black/10 hover:bg-neutral-50',
    dark: 'bg-[#1F1F1F] text-white hover:bg-black',
    yellow: 'bg-[#FFC107] text-[#1F1F1F] hover:bg-[#f2b600]',
    ghost: 'bg-transparent text-[#1F1F1F] hover:bg-black/5',
  }
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition ${styles[variant]} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  )
}

function Card({ children, className = '' }) {
  return <div className={`rounded-[1.7rem] border border-black/5 bg-white p-5 shadow-sm ${className}`}>{children}</div>
}

function App() {
  const [page, setPage] = useState('landing')
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FFF3E0] font-sans text-[#1F1F1F]">
      {page === 'landing' && <LandingPage goTo={setPage} />}
      {page === 'menu' && <DemoMenuPage goTo={setPage} />}
      {page === 'admin' && <RestaurantAreaPage goTo={setPage} />}
    </div>
  )
}

function Header({ goTo }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FFF3E0]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <button onClick={() => goTo('landing')} className="text-left">
          <Logo />
        </button>
        <nav className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" onClick={() => goTo('landing')}>Início</Button>
          <Button variant="secondary" icon={Utensils} onClick={() => goTo('menu')}>Cardápio demo</Button>
          <Button icon={Store} onClick={() => goTo('admin')}>Área do restaurante</Button>
        </nav>
        <div className="flex gap-2 lg:hidden">
          <Button variant="secondary" icon={Utensils} className="px-3 text-xs sm:text-sm" onClick={() => goTo('menu')}>Demo</Button>
          <Button icon={Store} className="px-3 text-xs sm:text-sm" onClick={() => goTo('admin')}>Painel</Button>
        </div>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-7">
      <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#E63946]">{eyebrow}</div>
      <h2 className="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">{description}</p>}
    </div>
  )
}

function LandingPage({ goTo }) {
  return (
    <>
      <Header goTo={goTo} />
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#E63946] shadow-sm ring-1 ring-black/5">
              <QrCode className="h-4 w-4" /> Cardápio digital com QR Code e pedido pelo WhatsApp
            </div>
            <h1 className="max-w-4xl text-[2.55rem] font-black leading-[1.03] tracking-tight sm:text-5xl md:text-7xl">
              Tecnologia simples para restaurantes venderem direto.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 md:mt-6 md:text-lg md:leading-8">
              O Numeny é uma plataforma para restaurantes criarem cardápios digitais, receberem pedidos organizados e acompanharem dados básicos de acesso, cliques e interesse dos clientes.
            </p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-row md:mt-8">
              <Button icon={Utensils} onClick={() => goTo('menu')}>Ver cardápio de restaurante demo</Button>
              <Button variant="secondary" icon={Store} onClick={() => goTo('admin')}>Acessar área do restaurante</Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#FFC107]/40 blur-2xl" />
            <div className="absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-[#E63946]/20 blur-2xl" />
            <div className="relative rounded-[2.2rem] bg-white p-4 shadow-2xl shadow-red-100 ring-1 ring-black/5">
              <div className="rounded-[1.8rem] bg-[#1F1F1F] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/55">Painel Numeny</div>
                    <div className="mt-1 text-2xl font-black">Burger Demo</div>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">Online</div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    ['2.418', 'acessos'],
                    ['684', 'cliques WhatsApp'],
                    ['423', 'produto mais visto'],
                    ['528', 'scans Instagram'],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-3xl bg-white/10 p-4">
                      <div className="text-2xl font-black">{value}</div>
                      <div className="mt-1 text-xs text-white/55">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-3xl bg-white p-4 text-[#1F1F1F]">
                  <div className="flex items-center gap-3">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#FFF3E0] text-3xl">🍔</div>
                    <div className="min-w-0 flex-1">
                      <div className="font-black">Burger Numeny</div>
                      <div className="text-sm text-neutral-500">Produto com maior interesse</div>
                    </div>
                    <div className="font-black text-[#E63946]">R$ 29,90</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-20">
          <SectionHeading
            eyebrow="O que é"
            title="Um canal próprio de venda direta para o restaurante."
            description="O MVP começa simples: cardápio público, QR Code gerenciável, pedido via WhatsApp, uso no salão e painel com métricas essenciais. Sem virar PDV, cozinha, estoque ou sistema fiscal no primeiro momento."
          />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              [QrCode, 'Cardápio com QR Code', 'O cliente acessa o cardápio por mesa, embalagem, panfleto, Instagram ou link direto.'],
              [MessageCircle, 'Pedido organizado', 'O cliente escolhe os itens e finaliza por delivery, retirada ou mesa.'],
              [BarChart3, 'Métricas básicas', 'O restaurante acompanha acessos, cliques, produtos mais vistos e QR Codes com melhor desempenho.'],
            ].map(([Icon, title, text]) => (
              <Card key={title}>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFF3E0] text-[#E63946]"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="overflow-hidden p-0">
              <div className="bg-white p-6 md:p-8">
                <div className="mb-4 inline-flex items-center rounded-full bg-[#FFF3E0] px-3 py-1 text-xs font-black text-[#E63946]">Demonstração</div>
                <h3 className="text-2xl font-black tracking-tight text-[#1F1F1F]">Cardápio de restaurante demo</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
                  Veja a experiência do cliente final com cardápio digital, categorias, carrinho e fluxos para delivery, retirada e mesa.
                </p>
                <Button variant="yellow" icon={ChevronRight} className="mt-6 rounded-full px-5 py-3" onClick={() => goTo('menu')}>Abrir cardápio demo</Button>
              </div>
            </Card>

            <div className="rounded-[1.7rem] border border-black/5 bg-[#1F1F1F] p-7 text-white shadow-sm md:p-8">
              <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-black text-[#FFC107]">Painel</div>
              <h3 className="text-2xl font-black tracking-tight">Área do restaurante</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                Veja o painel com métricas, produtos, QR Codes, mapa de pedidos e leituras comerciais simples.
              </p>
              <Button icon={ChevronRight} className="mt-6 rounded-full px-5 py-3" onClick={() => goTo('admin')}>Abrir área do restaurante</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function DemoMenuPage({ goTo }) {
  const [selectedCategory, setSelectedCategory] = useState('Mais pedidos')
  const [cart, setCart] = useState([{ ...products[0], qty: 1 }, { ...products[5], qty: 1 }])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const visibleProducts = selectedCategory === 'Mais pedidos'
    ? products.filter((p) => p.featured)
    : products.filter((p) => p.category === selectedCategory)

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart])
  const totalQty = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart])

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
      return [...prev, { ...product, qty: 1 }]
    })
  }

  return (
    <>
      <SimpleTopbar goTo={goTo} title="Cardápio demo" />
      <main className="mx-auto grid max-w-7xl gap-5 px-4 pb-28 pt-5 md:grid-cols-[minmax(0,1fr)_360px] md:px-8 md:py-8">
        <section className="min-w-0">
          <div className="rounded-[1.7rem] bg-[#1F1F1F] p-4 text-white shadow-xl md:rounded-[2.2rem] md:p-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white text-3xl shadow-lg md:h-20 md:w-20 md:rounded-3xl md:text-4xl">🍔</div>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                  <h1 className="truncate text-2xl font-black leading-tight md:text-5xl">Burger Demo</h1>
                  <span className="w-fit rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300 md:text-xs">Aberto agora</span>
                </div>
                <p className="mt-2 line-clamp-2 max-w-2xl text-xs leading-5 text-white/70 md:mt-3 md:text-sm md:leading-6">
                  Hambúrguer artesanal, combos, bebidas e sobremesas. Monte seu pedido e envie tudo pronto pelo WhatsApp.
                </p>
                <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1 subtle-scrollbar md:flex-wrap md:overflow-visible">
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">Delivery</span>
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">Retirada</span>
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">Mesa</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-0 -mx-4 mt-4 border-y border-black/5 bg-[#FFF3E0]/95 px-4 py-3 md:mx-0 md:border-0 md:px-0">
            <div className="subtle-scrollbar flex max-w-full gap-2 overflow-x-auto pb-2 md:pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-black transition md:rounded-2xl md:px-4 md:text-sm ${cat === selectedCategory ? 'bg-[#E63946] text-white shadow-sm shadow-red-200' : 'bg-white text-neutral-600 ring-1 ring-black/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid min-w-0 gap-3 md:mt-5 md:grid-cols-1 md:gap-4 xl:grid-cols-2">
            {visibleProducts.map((item) => (
              <ProductCard key={item.id} item={item} addToCart={addToCart} />
            ))}
          </div>
        </section>

        <aside className="hidden h-fit rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 md:sticky md:top-28 md:block">
          <CartSummary cart={cart} total={total} />
        </aside>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur md:hidden">
        <button onClick={() => setIsCartOpen(true)} className="mx-auto flex w-full max-w-7xl items-center gap-3 text-left">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#FFF3E0] text-[#E63946] ring-1 ring-black/5"><ShoppingBag className="h-5 w-5" /></div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-neutral-400">Seu pedido</div>
            <div className="truncate text-base font-black">{totalQty} itens · {formatCurrency(total)}</div>
          </div>
          <div className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#E63946] px-4 text-sm font-black text-white shadow-sm shadow-red-200">Ver pedido</div>
        </button>
      </div>

      {isCartOpen && <CartBottomSheet cart={cart} total={total} onClose={() => setIsCartOpen(false)} />}
    </>
  )
}

function ProductCard({ item, addToCart }) {
  return (
    <article className="min-w-0 rounded-[1.5rem] border border-black/5 bg-white p-3 shadow-sm md:rounded-[1.7rem] md:p-4">
      <div className="grid gap-3 sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:items-center md:grid-cols-[96px_minmax(0,1fr)_auto] md:gap-4">
        <div className="grid h-[72px] w-[72px] place-items-center rounded-2xl bg-[#FFF3E0] text-4xl ring-1 ring-black/5 sm:h-[88px] sm:w-[88px] md:h-24 md:w-24 md:rounded-3xl md:text-5xl">{item.image}</div>
        <div className="min-w-0">
          <div className="flex min-w-0 items-start gap-2">
            <h3 className="min-w-0 flex-1 truncate text-sm font-black tracking-tight md:text-[1.05rem]">{item.name}</h3>
            {item.featured && <Star className="h-4 w-4 shrink-0 fill-[#FFC107] text-[#FFC107] md:h-5 md:w-5" />}
          </div>
          <p className="mt-1 text-[11px] leading-4 text-neutral-600 md:line-clamp-3 md:text-sm md:leading-5 xl:line-clamp-none">{item.description}</p>
          <div className="mt-3 text-base font-black text-[#E63946] md:text-lg">{formatCurrency(item.price)}</div>
        </div>
        <div className="flex items-center justify-end sm:self-end">
          <button
            onClick={() => addToCart(item)}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#E63946] px-4 text-sm font-black text-white shadow-sm shadow-red-200 transition hover:bg-[#d92f3d]"
          >
            <Plus className="h-4 w-4" /> Adicionar
          </button>
        </div>
      </div>
    </article>
  )
}

function CartBottomSheet({ cart, total, onClose }) {
  const [orderType, setOrderType] = useState('delivery')
  const [useDeviceLocation, setUseDeviceLocation] = useState(false)
  const [showWaiterView, setShowWaiterView] = useState(false)

  const ctaLabel = orderType === 'mesa' ? 'Mostrar ao garçom' : 'Enviar pelo WhatsApp'
  const subtitle = orderType === 'mesa' ? 'Confira o pedido para o garçom anotar.' : 'Confira os itens antes de finalizar.'

  if (showWaiterView) {
    return <WaiterOrderView cart={cart} total={total} onClose={() => setShowWaiterView(false)} onBack={onClose} />
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden">
      <button aria-label="Fechar carrinho" className="absolute inset-0 h-full w-full" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 max-h-[88vh] rounded-t-[2rem] bg-white p-4 shadow-2xl">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-neutral-200" />
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black">Seu pedido</h2>
            <p className="mt-1 text-xs text-neutral-500">{subtitle}</p>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-xl text-neutral-500">×</button>
        </div>

        <OrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
        <OrderFields orderType={orderType} useDeviceLocation={useDeviceLocation} setUseDeviceLocation={setUseDeviceLocation} cart={cart} />

        {orderType !== 'mesa' && <CartItems cart={cart} />}

        <div className="mt-4 rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5">
          <div className="flex justify-between text-sm text-neutral-600">
            <span>Total estimado</span>
            <span className="font-black text-[#1F1F1F]">{formatCurrency(total)}</span>
          </div>
          {orderType === 'delivery' && <div className="mt-2 text-xs text-neutral-500">O endereço entra no WhatsApp e a localização aproximada alimenta o mapa de pedidos.</div>}
          {orderType === 'mesa' && <div className="mt-2 text-xs text-neutral-500">No MVP, o pedido de mesa é apenas visual para o garçom anotar.</div>}
        </div>

        <Button icon={orderType === 'mesa' ? Utensils : MessageCircle} onClick={() => (orderType === 'mesa' ? setShowWaiterView(true) : null)} className="mt-4 h-12 w-full rounded-full">
          {ctaLabel}
        </Button>
      </div>
    </div>
  )
}

function OrderTypeTabs({ orderType, setOrderType }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-1 rounded-2xl bg-neutral-100 p-1">
      {[
        ['delivery', 'Delivery'],
        ['retirada', 'Retirada'],
        ['mesa', 'Mesa'],
      ].map(([id, label]) => (
        <button key={id} onClick={() => setOrderType(id)} className={`rounded-xl px-2 py-2 text-[11px] font-black ${orderType === id ? 'bg-white text-[#E63946] shadow-sm' : 'text-neutral-500'}`}>{label}</button>
      ))}
    </div>
  )
}

function OrderFields({ orderType, useDeviceLocation, setUseDeviceLocation, cart }) {
  if (orderType === 'delivery') {
    return (
      <div className="mt-3 rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
        <div className="mb-3 flex items-center gap-2 text-sm font-black"><MapPin className="h-4 w-4 text-[#E63946]" /> Endereço de entrega</div>
        <div className="grid gap-2">
          <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Rua, número, bairro</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Complemento</div>
            <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Referência</div>
          </div>
          <button onClick={() => setUseDeviceLocation(!useDeviceLocation)} className={`flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-xs font-black ring-1 ring-black/5 ${useDeviceLocation ? 'bg-[#E63946] text-white' : 'bg-white text-[#1F1F1F]'}`}>
            <Compass className="h-4 w-4" /> {useDeviceLocation ? 'Localização capturada' : 'Usar localização atual'}
          </button>
        </div>
      </div>
    )
  }

  if (orderType === 'retirada') {
    return (
      <div className="mt-3 rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
        <div className="mb-3 flex items-center gap-2 text-sm font-black"><ShoppingBag className="h-4 w-4 text-[#E63946]" /> Dados para retirada</div>
        <div className="grid gap-2">
          <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Nome do cliente</div>
          <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Observações do pedido</div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-3 rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
      <div className="mb-3 flex items-center gap-2 text-sm font-black"><Utensils className="h-4 w-4 text-[#E63946]" /> Consumo no salão</div>
      <div className="grid gap-2">
        <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Número da mesa</div>
        <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Nome do cliente (opcional)</div>
        <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Observações para o garçom</div>
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 ring-1 ring-black/5">
        <div className="mb-2 flex items-center justify-between"><span className="text-sm font-black text-[#1F1F1F]">Resumo para o garçom</span><span className="rounded-full bg-[#FFF3E0] px-2 py-1 text-[10px] font-black text-[#E63946]">Mesa 12</span></div>
        <div className="grid gap-2">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
              <span className="min-w-0 truncate font-semibold text-neutral-700">{item.qty}x {item.name}</span>
              <span className="shrink-0 font-black text-[#E63946]">{formatCurrency(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-black/10 pt-3 text-xs leading-5 text-neutral-500">Use esta tela para o atendente anotar o pedido, sem integração com cozinha nesta fase.</div>
      </div>
    </div>
  )
}

function CartItems({ cart }) {
  return (
    <div className="subtle-scrollbar mt-4 grid max-h-[24vh] gap-3 overflow-y-auto pr-1">
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3 ring-1 ring-black/5">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-2xl">{item.image}</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-black">{item.qty}x {item.name}</div>
            <div className="text-xs text-neutral-500">{formatCurrency(item.price * item.qty)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function WaiterOrderView({ cart, total, onClose, onBack }) {
  return (
    <div className="fixed inset-0 z-[70] bg-[#FFF3E0] p-4 md:hidden">
      <div className="mx-auto flex h-full max-w-md flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
        <div className="bg-[#1F1F1F] p-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Pedido de mesa</div>
              <h2 className="mt-1 text-3xl font-black">Mesa 12</h2>
              <p className="mt-1 text-sm text-white/60">Mostrar ao garçom para anotar</p>
            </div>
            <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl text-white">×</button>
          </div>
        </div>
        <div className="subtle-scrollbar flex-1 overflow-y-auto p-5">
          <WaiterItems cart={cart} />
          <WaiterNotes />
        </div>
        <div className="border-t border-black/5 p-5">
          <div className="mb-4 flex items-center justify-between text-lg font-black"><span>Total estimado</span><span className="text-[#E63946]">{formatCurrency(total)}</span></div>
          <button onClick={onBack} className="h-12 w-full rounded-full bg-[#E63946] text-sm font-black text-white shadow-sm shadow-red-200">Voltar ao cardápio</button>
        </div>
      </div>
    </div>
  )
}

function WaiterItems({ cart }) {
  return (
    <div className="grid gap-3">
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-3 rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#FFF3E0] text-3xl">{item.image}</div>
          <div className="min-w-0 flex-1">
            <div className="text-lg font-black">{item.qty}x {item.name}</div>
            <div className="mt-1 text-xs text-neutral-500">Observação: sem cebola</div>
          </div>
          <div className="text-sm font-black text-[#E63946]">{formatCurrency(item.price * item.qty)}</div>
        </div>
      ))}
    </div>
  )
}

function WaiterNotes() {
  return (
    <div className="mt-5 rounded-3xl bg-[#FFF3E0] p-4 ring-1 ring-black/5">
      <div className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">Observações</div>
      <p className="mt-2 text-sm leading-6 text-neutral-700">Cliente pediu para confirmar ponto da carne e trazer guardanapos extras.</p>
    </div>
  )
}

function CartSummary({ cart, total }) {
  const [orderType, setOrderType] = useState('delivery')
  const [useDeviceLocation, setUseDeviceLocation] = useState(false)
  const [showDesktopWaiterView, setShowDesktopWaiterView] = useState(false)
  const ctaLabel = orderType === 'mesa' ? 'Mostrar pedido ao garçom' : 'Enviar pelo WhatsApp'

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Seu pedido</h2>
          <ShoppingBag className="h-5 w-5 text-[#E63946]" />
        </div>
        <OrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
        <OrderFields orderType={orderType} useDeviceLocation={useDeviceLocation} setUseDeviceLocation={setUseDeviceLocation} cart={cart} />
        {orderType !== 'mesa' && <div className="mt-5"><CartItems cart={cart} /></div>}
        <div className="mt-5 rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5">
          <div className="flex justify-between text-sm text-neutral-600"><span>Total estimado</span><span className="font-black text-[#1F1F1F]">{formatCurrency(total)}</span></div>
        </div>
        <Button icon={orderType === 'mesa' ? Utensils : MessageCircle} onClick={() => (orderType === 'mesa' ? setShowDesktopWaiterView(true) : null)} className="mt-4 w-full">
          {ctaLabel}
        </Button>
        <p className="mt-3 text-center text-xs leading-5 text-neutral-500">
          {orderType === 'mesa' ? 'No MVP, essa visão serve para o garçom anotar o pedido.' : 'O pedido segue organizado para o WhatsApp do restaurante.'}
        </p>
      </div>
      {showDesktopWaiterView && <DesktopWaiterModal cart={cart} total={total} onClose={() => setShowDesktopWaiterView(false)} />}
    </>
  )
}

function DesktopWaiterModal({ cart, total, onClose }) {
  const modalContent = (
    <div className="fixed inset-0 z-[9999] hidden items-center justify-center bg-black/60 p-6 backdrop-blur-sm md:flex">
      <div className="isolate w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
        <div className="bg-[#1F1F1F] p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Pedido de mesa</div>
              <h2 className="mt-1 text-3xl font-black">Mesa 12</h2>
              <p className="mt-1 text-sm text-white/65">Mostrar ao garçom para anotar</p>
            </div>
            <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl text-white">×</button>
          </div>
        </div>
        <div className="subtle-scrollbar max-h-[65vh] overflow-y-auto p-6">
          <WaiterItems cart={cart} />
          <WaiterNotes />
        </div>
        <div className="border-t border-black/5 p-6">
          <div className="mb-4 flex items-center justify-between text-lg font-black"><span>Total estimado</span><span className="text-[#E63946]">{formatCurrency(total)}</span></div>
          <button onClick={onClose} className="h-12 w-full rounded-full bg-[#E63946] text-sm font-black text-white shadow-sm shadow-red-200">Fechar visualização</button>
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined') return modalContent
  return createPortal(modalContent, document.body)
}

function RestaurantAreaPage({ goTo }) {
  return (
    <>
      <SimpleTopbar goTo={goTo} title="Área do restaurante" />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Burger Demo</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">Painel simples para gerenciar cardápio, QR Codes e acompanhar métricas básicas.</p>
          </div>
          <div className="grid gap-2 sm:flex sm:justify-end">
            <Button variant="secondary" icon={Smartphone} onClick={() => goTo('menu')}>Preview do cardápio</Button>
            <Button icon={Plus}>Novo produto</Button>
          </div>
        </div>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            [Eye, '2.418', 'Acessos ao cardápio', '+18%'],
            [MessageCircle, '684', 'Cliques no WhatsApp', '+11%'],
            [MousePointerClick, '8.932', 'Produtos visualizados', '+24%'],
            [QrCode, '528', 'Scans no QR Instagram', '+31%'],
          ].map(([Icon, value, label, change]) => (
            <Card key={label}>
              <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#E63946]" /><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">{change}</span></div>
              <div className="mt-4 text-2xl font-black md:mt-5 md:text-3xl">{value}</div>
              <div className="mt-1 text-sm text-neutral-500">{label}</div>
            </Card>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black">Produtos cadastrados</h2>
              <div className="hidden items-center gap-2 rounded-2xl bg-neutral-50 px-3 py-2 ring-1 ring-black/5 md:flex"><Search className="h-4 w-4 text-neutral-400" /><span className="text-sm text-neutral-400">Buscar produto</span></div>
            </div>
            <div className="grid gap-3">
              {products.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-3xl bg-neutral-50 p-3 ring-1 ring-black/5">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl">{item.image}</div>
                  <div className="min-w-0 flex-1"><div className="truncate font-black">{item.name}</div><div className="text-xs text-neutral-500">{item.category} · {item.views} visualizações</div></div>
                  <div className="hidden font-black text-[#E63946] sm:block">{formatCurrency(item.price)}</div>
                  <Button variant="secondary" icon={Edit3} className="px-3 py-2">Editar</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-black">QR Codes gerenciáveis</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">Cada QR pode representar mesa, embalagem, panfleto, Instagram ou campanha. O destino pode ser alterado depois.</p>
            <div className="mt-5 grid gap-3">
              {[
                ['Instagram', 'numeny.com.br/q/IGBIO', '528 scans'],
                ['Mesa 01', 'numeny.com.br/q/MESA01', '312 scans'],
                ['Panfleto Bairro', 'numeny.com.br/q/PAN24', '87 scans'],
              ].map(([name, link, scans]) => (
                <div key={name} className="flex items-center gap-3 rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#E63946]"><QrCode className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1"><div className="font-black">{name}</div><div className="truncate text-xs text-neutral-500">{link}</div></div>
                  <div className="text-xs font-black text-[#E63946]">{scans}</div>
                </div>
              ))}
            </div>
            <Button variant="secondary" icon={Copy} className="mt-5 w-full">Gerar novo QR Code</Button>
          </Card>
        </section>

        <section className="mt-6"><LocationReportCard /></section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <h2 className="text-xl font-black">Dados do restaurante</h2>
            <div className="mt-5 grid gap-3">
              {[
                [Store, 'Nome', 'Burger Demo'],
                [Link2, 'Link público', 'numeny.com.br/r/burger-demo'],
                [MessageCircle, 'WhatsApp', '+55 00 00000-0000'],
                [MapPin, 'Endereço completo', 'Av. Santana, 1234 · Centro · Hortolândia/SP'],
                [Globe2, 'Cidade', 'Hortolândia · SP'],
                [Clock, 'Horário de funcionamento', 'Seg a Qui: 18h às 23h · Sex a Dom: 18h às 00h'],
              ].map(([Icon, label, value]) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3 ring-1 ring-black/5">
                  <Icon className="h-4 w-4 text-[#E63946]" />
                  <div><div className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-400">{label}</div><div className="text-sm font-black">{value}</div></div>
                </div>
              ))}
            </div>
            <Button variant="secondary" icon={Settings} className="mt-5 w-full">Editar configurações</Button>
          </Card>

          <Card>
            <h2 className="text-xl font-black">Leituras comerciais</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                [TrendingUp, 'Produto em alta', 'Burger Numeny concentra maior interesse e deve continuar em destaque.'],
                [MessageCircle, 'Canal forte', 'Instagram gera mais intenção de pedido que panfleto no período.'],
                [Package, 'Categoria relevante', 'Combos têm boa visualização e podem receber campanha própria.'],
              ].map(([Icon, title, text]) => (
                <div key={title} className="rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5"><Icon className="h-5 w-5 text-[#E63946]" /><div className="mt-4 font-black">{title}</div><p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p></div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </>
  )
}

function LocationReportCard() {
  const neighborhoods = [
    ['Jardim Amanda', '38%', 82],
    ['Centro', '24%', 56],
    ['Parque Ortolândia', '17%', 42],
    ['Fora do raio', '9%', 18],
  ]

  return (
    <Card>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-black">Mapa de pedidos</h2>
          <p className="mt-1 text-sm leading-6 text-neutral-600">Visual simples do raio de entrega, bairros com maior concentração e origem dos pedidos.</p>
        </div>
        <span className="w-fit rounded-full bg-[#FFF3E0] px-3 py-1.5 text-xs font-black text-[#E63946]">Raio: 5 km</span>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[420px] overflow-hidden rounded-[1.7rem] bg-[#f6efe2] ring-1 ring-black/5">
          <IllustratedMap />
        </div>
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Pedidos com localização', '126'],
              ['Distância média', '2,8 km'],
              ['Bairro líder', 'Jd. Amanda'],
              ['Fora do raio', '9%'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5"><div className="text-lg font-black text-[#E63946]">{value}</div><div className="mt-1 text-xs leading-4 text-neutral-500">{label}</div></div>
            ))}
          </div>
          <div className="rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5">
            <div className="mb-3 text-sm font-black">Pedidos por região</div>
            <div className="grid gap-3">
              {neighborhoods.map(([name, pct, width]) => (
                <div key={name}>
                  <div className="mb-1 flex justify-between text-xs font-bold text-neutral-600"><span>{name}</span><span>{pct}</span></div>
                  <div className="h-2 rounded-full bg-white"><div className="h-2 rounded-full bg-[#E63946]" style={{ width: `${width}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[#1F1F1F] p-4 text-white">
            <div className="flex gap-3"><TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-[#FFC107]" /><p className="text-sm leading-6 text-white/75">Jardim Amanda concentra pedidos suficientes para campanha específica de combos e entrega grátis em horários fracos.</p></div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function IllustratedMap() {
  return (
    <>
      <div className="absolute inset-0 opacity-95">
        <div className="absolute left-[-12%] top-[18%] h-10 w-[130%] rotate-[-12deg] rounded-full bg-white/75 shadow-sm" />
        <div className="absolute left-[-18%] top-[52%] h-9 w-[140%] rotate-[8deg] rounded-full bg-white/75 shadow-sm" />
        <div className="absolute left-[18%] top-[-10%] h-[130%] w-9 rotate-[18deg] rounded-full bg-white/65 shadow-sm" />
        <div className="absolute left-[58%] top-[-8%] h-[130%] w-8 rotate-[-18deg] rounded-full bg-white/65 shadow-sm" />
        <div className="absolute left-[4%] top-[10%] h-20 w-28 rounded-3xl bg-[#e8dfd0]/70" />
        <div className="absolute right-[6%] top-[14%] h-24 w-32 rounded-3xl bg-[#e8dfd0]/70" />
        <div className="absolute bottom-[10%] left-[8%] h-24 w-36 rounded-3xl bg-[#e8dfd0]/70" />
        <div className="absolute bottom-[12%] right-[12%] h-20 w-28 rounded-3xl bg-[#e8dfd0]/70" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#E63946]/35 bg-[#E63946]/10" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFC107]/80 bg-[#FFC107]/10" />
      <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-[#1F1F1F] text-white shadow-lg"><Store className="h-6 w-6" /></div>
      <MapPoint className="left-[24%] top-[30%]" label="Jardim Amanda" size="lg" />
      <MapPoint className="left-[66%] top-[36%]" label="Centro" />
      <MapPoint className="left-[35%] top-[69%]" label="Parque Ortolândia" />
      <MapPoint className="left-[75%] top-[72%]" label="Fora do raio" muted />
      <div className="absolute right-4 top-4 rounded-2xl bg-white/90 px-3 py-2 text-xs font-black text-neutral-600 shadow-sm ring-1 ring-black/5">Mapa ilustrativo sem conexão externa</div>
      <div className="absolute bottom-4 left-4 rounded-2xl bg-white/92 p-3 text-xs font-bold text-neutral-600 shadow-sm ring-1 ring-black/5">
        <div className="flex items-center gap-2"><CircleDot className="h-3.5 w-3.5 text-[#E63946]" /> Restaurante no centro</div>
        <div className="mt-1 flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#FFC107]" /> Pontos aproximados</div>
      </div>
    </>
  )
}

function MapPoint({ className = '', label, size = 'md', muted = false }) {
  return (
    <div className={`absolute ${className}`}>
      <div className={`${size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} rounded-full ${muted ? 'bg-neutral-400' : 'bg-[#E63946]'} shadow-lg ring-4 ring-white/80`} />
      <div className="mt-1 -translate-x-1/3 whitespace-nowrap rounded-full bg-white/90 px-2 py-1 text-[10px] font-black text-neutral-600 shadow-sm ring-1 ring-black/5">{label}</div>
    </div>
  )
}

function SimpleTopbar({ goTo, title }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FFF3E0]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <button onClick={() => goTo('landing')} className="flex items-center gap-3 text-left"><Logo /></button>
        <div className="hidden text-sm font-black text-neutral-500 md:block">{title}</div>
        <Button variant="secondary" icon={ArrowLeft} className="px-3 text-xs sm:text-sm" onClick={() => goTo('landing')}>Voltar</Button>
      </div>
    </header>
  )
}

export default App
