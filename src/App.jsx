import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  BarChart3,
  Check,
  CircleDot,
  Clock,
  Compass,
  ChevronRight,
  Copy,
  Edit3,
  Eye,
  Globe2,
  Image as ImageIcon,
  Link2,
  MessageCircle,
  MapPin,
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
  Truck,
  Utensils,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Burger Numeny",
    category: "Mais pedidos",
    description: "Pão brioche, blend 160g, queijo, molho especial e cebola caramelizada.",
    price: 29.9,
    views: 423,
    featured: true,
    image: "🍔",
  },
  {
    id: 2,
    name: "Combo Clássico",
    category: "Combos",
    description: "Burger clássico, batata crocante e refrigerante lata.",
    price: 42.9,
    views: 318,
    featured: true,
    image: "🍟",
  },
  {
    id: 3,
    name: "Chicken Crispy",
    category: "Hambúrgueres",
    description: "Frango crocante, queijo, alface, tomate e maionese da casa.",
    price: 27.9,
    views: 241,
    featured: false,
    image: "🥪",
  },
  {
    id: 4,
    name: "Batata Cheddar",
    category: "Acompanhamentos",
    description: "Batata frita com cheddar cremoso e bacon crocante.",
    price: 22.9,
    views: 198,
    featured: false,
    image: "🍟",
  },
  {
    id: 5,
    name: "Refrigerante Lata",
    category: "Bebidas",
    description: "Coca-Cola, Guaraná ou Sprite. Consulte disponibilidade.",
    price: 6.9,
    views: 171,
    featured: false,
    image: "🥤",
  },
  {
    id: 6,
    name: "Brownie da Casa",
    category: "Sobremesas",
    description: "Brownie artesanal com calda de chocolate.",
    price: 14.9,
    views: 129,
    featured: false,
    image: "🍫",
  },
];

const categories = ["Mais pedidos", "Hambúrgueres", "Combos", "Acompanhamentos", "Bebidas", "Sobremesas"];

const NUMENY_WORDMARK = "data:image/webp;base64,UklGRp4XAABXRUJQVlA4WAoAAAAQAAAAswAALAAAQUxQSHkKAAABsIZtm2E71vtV1VqxT+xkbNu2bR3bVjC2bdt2bNvWJBlsrqr63h9d3WvvDH5HxASg53/HznjyZIigoJjWt9XqiN1h8AN1xxkkGe8sGSlgcCc1cuFAMT9QxrISNXgOgcszGLQ5RjbyKrgfKIwkqd4fA5tjsf9XVFb0Fz9YIpOR83qJydv36wx//oOFuRU+DZd3UM0PJAZeBZsw2OvLH0oaN+4Am9pmQyFjTTVijOSIsZISI1JIRKRJxDojgLHOVCFGUiIi1Ug1IoUY+GkrK4lti4gFYIsZAxiTEAPAAsZZAFIyKbHOAsY5qcoJALEWAKwp4gA4QKwzgHW2iLXGSSFrjctTkp5DYRM7bMwTYJt9e0OKCLD99oAAEGCHvTrBGgAde3cRwBhALAC0bG8AWClkBeW9f/nAO6NHvHjd+dsAVnIMOmzfAcYCQOuWAMTmCLKSJwIAkpNV74+Gy2z7RU4JHe5eXT/vZzB5Ftu+uX7961vDwKD7MxtqJp8N7P6f1yfOm/L+jQcCzgJtT73+9RHjPnzkqi4QKeBQvurTOuaufnZfQBKCKyesnnAF0P7sW94cPeKNm44pwSYMTnrh3X+0gqQE8su33/5ZTm09lQw6p4cxxVqYW6mRPBAmJdJhLEmOaCMw7llqZP3lz9cyXf/8tkDXvy0MTC//XQmSEouDRpHqQ4gxeE/WX1OGAWBxNrNX/XGFMlkZcxSsABYXRZJPWJOy8j+SvDGjnP0HBiU9H4eFwTYbckznOcFrhUPhUhYHslHVc1dY9G0IUQNJBh9i8J5cc9xhM0j1PgRfCeSz7UUSFpfXMgRl9N4HMnrymTZWMu+zUQNJRu9D8F5Z+R2siLQZxwYfuAdMxqDHIm30GlNrzAv0JD2vhDXYbXOOdFvEyMBrihyukVTdHRYD66ikhqAao5JkYH09K5Eao5KMFT4pJmNxqWogNTAbI6mNvBcGMPiUgWQMSo1KkiHwYlhB1/kaGfVE2NSAVYxMK9e27bVClYxh/c4o46CaHNN5ZnWHMcPdYDEgQWogSa8kIxkZlCQ9SXpeBAdY7P1NjGQkF73xxFOjyEDS8xxYGHycIANJaiAZdUNvGHSZw8jI4/L6r8hoanVnnEGvZOCIcgkHfJNjO0xgaD4lN06avIlJVUZyxfg59YyJUW1ExLQZSU8ql/2sjwHaH/ouozLolHZiDD5JRVYWjV8aGEl6XocSusxNHF9gZSapXN3B4j56koHXQvYvMnELUP36H/2AQdc2RiXJyOnntIPb/1UqSa3fB8biUnoycso2kFLJArg9RjLE01DKU753TCu0PXE0Ixl0entpPrEdZjKSWvFnYccvtiRVfxkgAvydkWTUqd0ACNxrDGSFl8KJGaeRqusGI+u67n3GkHqSFd4OlxP5Sgtk249goPLLvdF8cDi0zisZuab/4E05puNUxuYKfAstDGBteTZj5jiUBShhtzqSnn9DGXvVqNLzv133Ovbn1704aaMnlWTgpy3EJpQb+qIESBlHN0Zq5HGQ5hOHIfQkA9/qtzbHdpjE0Hy/FgsAFk8zMHJhWyMAIG4eY6IlfsJAKmfNrWU6RmbC+FZIeT4uFgBE2i5i1MjjtwgxLUYzkIx8clWBCVvCT5BzW2JcayQFYwr8j57p4H2IMcYQQoyR/4cziQqvgctAMHULgsEem6OSVGYzptNMxub7Wd41iQk5cLMKDEnFEEKo+MDcL+7uZCTv6m8HHH7PCknGAh2mMFRzaHM8UoXIhOo0MvnN2llv3vWHM/fpAwiaYkpVJzSL2NI7DMxNdJrJyMDhkidHNcE5efdXg/EFfpki101576G/XrBfH4ukEVQncLPzfjQvcWyBFU0Ag603aixkO05hYODDsDn4A0NVp+ZdW0xQXkhNlHFYgyoD39p5cJcysmItLGDQBBAzLa/LbEYGXiwp2eYb1epg8dPoC5VafMjAyPntrc0402oKY1WnNRFQXsCYcNJ6tkaqLu8Fa1zJWVMS96tnh/SHNAmm5LgWHzIw8GmUBUAZP2FgE4grvc5QpCVuoyeDDgdKzjngZgZWdXre7U1mLf7NQEZO6gdbcs5Z4D6SCwaINMnUnJa4jRXGWLMvyiXn0HuxxqaAwVZfRC10mg+kKof1AIDtHmZgdWc3mZuTJ9JzpUYycMbxZWR3fZUVX88b4JrpNB/JyDkHAMDe4xjZJHC4il7zStJ2BiOpytmPDL3+lXVUNsFpeddWU16QB4tL6ZUM5KfX/+YXQ177moGs8AGUmqUk7WZpJCNrXxs27LUaRiY1saqAWLxOn/oZnMUF9ErSMxnYLNcnxheYn/grLOBwFytKxsh0IAO/2V9MsziLn9GTjExG5iqpurZjHkQGfRE1o7+Cg8Vt9JFk9N77SPUxo7tnaqmMsYhmJqYE5YWZ+PeMmNKDZEXJ4EPwQRkq3HgiDPJ0eEpgpmf0eDjY0htsUFK9916ZW6MhVjjDCfItfsaGoLGRp8JBrL2D9EGVpMZAMqoG7gSLfg1RWeGpedexoj6OapGAyLTotYG/zkCM/PVr0oeoqhpDIEfuDQvA4uNY0QZeg1IGIjOij57HwcGg60fUEJUkNcTUL0iy7iSYAuLKjzP7SlsjgABXzGLBr+6YRpKftDZiym+T5JIeIhmDAyok+SvYhMVvSXLVQBgAEMG+T33NglP+2AIOiR+TZO1+sAmL/5DkpG5GAIN2137NgiGBE18c98iBEBQVaf2nCWvnDe0AAQAx6HbRS8trGhrqNo78647Y+tWN6x/rBQODXk9v2vzxHjBIGpwzY9Oi35eMJCDu11MXPrMjDNIW2P43L8/d+M2XK0ffcXwXiEXSmN8t2TT5ZAiSIi2uX7Ppja1hAMAAOw6dvLmuoaFm5WOXrGAkKcgaFBcAnUuAIO0AtN3l0MP27QXAAV07I7/nAMCgYKlnSxSXMgBYScAYAK779v3bAUALgUgGgjY9HQyKdugKGGSl1AIwffY/9LDd2qH78gSsgbGoViwAI8gXa5C2BkYAYxJGADEoaAAYKSBWYNCxI2ATgLEGSVtycJ2QawAYFBQDiEFWBLAlpGXQKkZlDZpcUK0Ya40gKYJ8EVQpgiqN/HjNqj+0hLUmkxVjjDXASWM3P9BCEhBBlSJIClocfKCDs9ZaU5K9QlTltKb7rhR03Uzy48MBmJKz1ljrSgbA3k9EksfDJppcpNtb1Le3BaxzFnicgYF3fOdJ5zVsDGx88/S+KNrvrJfqqBU27gHTPA53shK4+qo+AND3VioZw8nfdTA4YS1DI8llLw657KQDdz345KuGv7KCZIPnV5dC0LwG4ypePbn42bvvfmY5Ixl0XPvvPAi2e530FU+SvmZzrSfJSmMg398TBs3s8BgbSQ1MBpIVXojvQQecP5pkqK9r9FGjb6hriCQ/vRRwaG6DrRfTB2X0lYqPZKjwSTHfAzAG7U56cYOyqF/68DGtYAyaXzD4TTIGVVI1BPKZVka+DwAHoOfpw579ZPqsmbMmvv/QX45qC8BhizTAZSOU+ZN+LhB8T4o1AFDu0atXr84GAIwVbKFG0PqYWyauj3HjpPvP7AIRAABWUDgg/gwAADA2AJ0BKrQALQA+SRyLRCKhoRsaP6AoBIS2AGAS9iyfJz6x+R/ss0z+n/fr8mOYfKn64+9P6X+q/uT/Y/pF/bv7B7Gv0B/vPcA/TP/Sekt6jfMB/O/7z/1v757rH+R/03+d9w3oAfzn+1er9/pPYn/uP+09gD9b/Vo/2X/i/y/wOfsx/4/858Bn85/rn/e/PX5APQA9ADsJf6P2vf5fpBfdEvYkr/f8TfxJ1AvYHfw7YDTv8X4uP17/TeEp/jei/ep/oH/D9Wf8b4+/1X/b+wH/Hv6T/zf7r+VX0r/zP/j/zf46e1/8w/w3/Z/z3wDfyj+ff8D+8fkX843su/aT2Rf1iNOeIBmhrT/gv/zK3TCLIEwcCEMj7//N6jGesWxEfGmWtnYhHGq1YupLUaO9i2diSCD/KogzpijY1Vf4Z3/d/+vghbUzeQs8uGPhrkjOa7oOtVp0JIiZ9MBnKUCpGxM8JpHPPUI+NXX6eDHQ8SK0fnaPcbBPTYmQgynAejItDQaIMQtYpFuWTc7mjXi2hDmK5kkq/N4Ts2eGEPcuowbiBfULWzWOH66hf/eJ+p8n/LBqclZGk1S0nGAA/QsqwzpqVJRBfyEavOE9q2jS6RAZ2UTkGA/huKBOzHCjBYbzKmuzSsP7nfEj3zVzE56kcGLSyzH/NKRQfsEnQk0WfP/q0D78Z8dqx8vGh94cR6tET/Wi59Ht93ATZlYO9kobjViTHV/jsXrKYiGI3LwX22Zc7o5fpKsho9xwdUujVauYa4IgXh3bKShsqgaKB4p6cCjXr4g0jJbuz40zcna8ONleDglb9wH3A//7yReeHRWIjnIWbtSBsXt815cBCdCwjNSkQDqVH1f2qJ+0vMcZ8W4QXZwhtjlnWwpdkHOvVC4OuIVMfLV7LRo9G6C7qJe+ekfMA9azJp04XKaS9qzu9rE2GdHT2DZssjmLzHlchHZYJtqpjZqpt2Edi9WYriXnk8oJ4M1LBJz/b4cVmb4gTJBEF8s0yowqWmkA3qMIJTZ0cl8arpoMb7YDWYwJoY37Rzs0kwZlCuo3+NfnfmvxEn1U8C3weSh5nNErUrpq/KRKf4PzNAWCYyj59sLIS4T2sXY6WpKRmQ2X3WOSSJr1yIkVIv8brre/bJqaNJPJNCMQhuAzbqHDLCcqOvBuJcT5I5NGl3uWAoNz4toxcPZTPDfTZZX4+W6K7RvbeL4XRuVlNjGuqs1Q3lx5H07Vz1obaSUsu4qknnc4VXNIwZ5MY25/7slu0MVSV147O6/IS+uug5oeYucp+Hn3YKgPFW0C+aCWS7v/MYNP4L7UfOLoO/luiq40pzDXg0Pl+F/THTMLHEnFGWRBMbfBYsfjCKSI2ugOz8zMi2eMFHtG0P8TtHH6j8e8vE+Bv/IreZbdqcG9sGB5YIOiw7qJJMvyR0VkUQ8Nu8xhwXb2rD/d48leUdmZz3ajizedQTr9nIw95eJ8Eeo463McZmY74F/23CeP9WpumX636t9A6IaYR8lZMFE0Fsi0lsBgYhh1LrGxxJZT/TY6TjU2WKTtoD9mTafdn40lzMcqLu9XGXQ71YGQ4O9VcmWfrp/936uA6ygYhkbhGVtbvV5Z02GuJBiFXAN/yT4cJIWkrRDocSl2Jwf4I0aRfGsD3zR0qSbLlhbKZbe8EnhW1O7x3ztEEAdXGJ0GXalU/hGVY/vpeSY+wNdoVE+Ja+2qsYmPuBUmW8bTrV5bML6C1R3DAha5ZhNTZhv2SyxADNfKbLRt8qaDPyMlb7xcNunc/afPAlBc9lvBz3bTak1mGs5N7++WXsPul0Lwyq3qdRP33a0NMdfv2NeW2QK8hf6FFBKO8n6PcdWgQQMH9lZ4y/f5pGmi6YjMePM3QfkvFWjRePiYZmOaSPm0Lq/M0LcL9gNd7B7XZqX68I691B+DsUU4IFXIG/xvfxcM49P9eTIjKXQJVMeWplYG5VsGdcvIb56cBNTQ7i0H0N2TCroy87co23ypn8Cv91j1FGzJFArgwdHboyg8Ra3vJobb55tBLHEA9y0ycwhyG8DeSc3v5BvUAQ2AdYF82LowSIsIDXNF4lLXmSrx1WCE8YODx0WCsk33advnGHzs7XJL5A/+hFFHm2NvoSZ+WXVaEXRhbX00w57dA37mlx8Zb+1tr8aQ4Yl/dXhCpzesRyo6T88XVJYYQIO/PWVkCHu0zW03MYBs675MXkgDoIpSJP1pu5DhHd+KA//siL4OJfyao5pxGu0r2acvRHaEs8R+TFsZW9NQ/9WBDhAkG7A/iRTRc0/JI8OBnO1HiIMLlB0Wrh+yMrrPYMhanR3YJIB/5o7PbDInBZa69Hi6D3g0kSz85zfuFH0I1lsLPqgD5k4+/EIERooJb4jL06yKX1P2oA9ec1vrLtI5107Nt72PYcp1E/ngd+W1hkF+EjkBGWWWTa2TrO/uT9klMtoyYYB4aH2moEx763nJV6JCxFjGhIg+Lpl8zZw4Vb6P7LTSQxwuvu5I0ePNauouc8Yq1jvGsB6kq9SDkiP+IdXj49YanQkuOlcvOr56zJlsUlx2s4i6FlCTP18ky9X6XvA/3hJfZD+s/VZCfm/y3JIn+iYYpRCctZd5BiZbdKfnXPLbAWmXPlGyC7f/qVF9+2wOFTa71aYz3XnNdcF3ieBNQkdf2vJqQOUZ3AIuB1BoDds7j7WLw+Tz9cJ9VvyDHl2T6Lrsj6TUDdW77D7GQ8ZfDMOSyiNsPzixqyKgXhHsfkvmhHO1Rqs8mpjUyBh3817RLT+vmhrekVaNb242VkFdPtVQlH7FTNc1scyp9b8GFYjOqv3WI6LM+Q+GYp4kPeyiSuExzFrcYWq+oSIRSZGaT8AluBpWrtH4PEwC2yAUlKsGhpGnKYUqT4i25R6xzS5RQDouLOgA97/XcB3P+RbM6EvX7KZFLGUBgvutM3rM13m++Fjo8pby/U55hIL+xaQTDmSXpDaHI2hIOF8P0BKFQaV8wJAJ30JIhE3XjPmKkpIONAT7+yBSY114rxR4plmuL7QUAgoszwQvds+XqojfiHR23z8UFLGi3DL3l+tEUV0I2dXq2434Asi3gkD1N7MSedwWV2iCYBGThlL4CLV8KyUmnBBjRwAAQh/+gl92f/7jUf/1gPPINI97gkD5/dsMkwmf9W3FrwVMePlM/0zLuIZBuh+nPxzXBXxDZ/EjUDpRbfOdT4iWtTbLD0WfrH8qq7Ax2H0Y76nSQYAEjYDXWLoR6OrUURtkZ3nsB+BY5c97gdiCcivjbg1SdSJJ7LqT26KGs74jafek8xR7HVKo6AU6bC1gdnGaJx7IiO8Oh4V0HegoSf6T4xaU1qVodIhyEruaJsuF8M+K9fHc6H+bHhHiZmgzCycKMhTBZzFqIdCmJq2zJFKWIOzRtpiloGEQF6PMh3gUWZdsVaW8uS3xXsgVGtFSikdpsRfSuIxCy3DqIIj2j4jhRXBDCTWnlGj3xIRzD2FbV55f316aIVcVPM9Oa0i4mIiAhmB/41RNmoGzy58OD8g08N/7ePsFEr2iMBwqQPpLP6U5j45DyrXPFH4Mdpd7FgByuYWRwlk2NnpzH6rWCsfxKjxXXu+v+JRzhfi8JGW29Hx/Cj6kq//4g43V3lAV+xRLqn+kSKws61RlY14f/iLoBEeEqPxkoEJ1RfuCKc6AnY6icTWuaZ8rOC8OMBt04Mx/62t5V4D6jcpgLhd3BOVFJLlxEGKdz+0wOyVfv8tLE5MWlbDCvwMwEvcs39GWdDI3CD+5SDYNYhYwfPsFrCwzSik3EAQUed5TrCGlA8UWsiUFuOav8XGlQFXfVZOxD89nfXbLHauVXz8oV12sDwP7kkdPjgsAptqHj0tu4SyfMn7or4NPnG7eT7XPD9XEb0Cv5QW/6loL1a2pPJJf0A/lzCGz6BCSePijE7PpTTn8MN2wC2148g/LXMHNTKcw/pAJIXS+jD+Yee3DlkRRv1WY27DtlJGL9vqVd4/iyiXHJDDjA+H53DWnskBK36V0DWo/IqgHiuP93Xj2iqic9iW0TrxSfas+KzBCBIs+azGDU0/1gopCQzbdVXQg9jF4k6VuT48BPE2f+GE1x2HKyY6G+O2knrfPryzEVRM4w2K2Iuq8M5obdWKOE5TFqHK2n2BYs+xJNQnzl0Ld0sGsoBEufx9F/O7jIYt3GDFdQLw/VDgrvdTZ0oayHmEkvRMIGkuPapZLfXNLLPEsiuggDdHfkhUIaFbedpDoYJ/qZvF8GDXm59HCIVpP9x7QUFo5EeCo/LZa2iWaK1W5Uscem5I7F/SsxNTEZrLCiVATJV7gjWGVndjJG27Jru2T7GtM3CxTf97WkicBRJoZV+kP63A58xD261RlBq3HtK8OdZO41nR7Hu5AmflmQqopGLIuc4dP2AlevqZTN34KNkfl68ruOTBs38z1i57AAAAA";

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function App() {
  const [page, setPage] = useState("landing");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FFF3E0] font-sans text-[#1F1F1F]">
      <style>{`
        .subtle-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(31,31,31,.18) transparent; }
        .subtle-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .subtle-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .subtle-scrollbar::-webkit-scrollbar-thumb { background: rgba(31,31,31,.16); border-radius: 999px; }
        @media (max-width: 767px) {
          .subtle-scrollbar { scrollbar-width: none; }
          .subtle-scrollbar::-webkit-scrollbar { display: none; }
        }
      `}</style>
      {page === "landing" && <LandingPage goTo={setPage} />}
      {page === "menu" && <DemoMenuPage goTo={setPage} />}
      {page === "admin" && <RestaurantAreaPage goTo={setPage} />}
    </div>
  );
}

function Logo({ light = false }) {
  return (
    <div className={`inline-flex items-center rounded-2xl ${light ? "bg-white/95 px-3 py-2" : ""}`}>
      <img src={NUMENY_WORDMARK} alt="Numeny" className="h-8 w-auto object-contain sm:h-9" />
    </div>
  );
}

function Button({ children, variant = "primary", className = "", icon: Icon, ...props }) {
  const styles = {
    primary: "bg-[#E63946] text-white hover:bg-[#d92f3d] shadow-sm shadow-red-200",
    secondary: "bg-white text-[#1F1F1F] ring-1 ring-black/10 hover:bg-neutral-50",
    dark: "bg-[#1F1F1F] text-white hover:bg-black",
    yellow: "bg-[#FFC107] text-[#1F1F1F] hover:bg-[#f2b600]",
    ghost: "bg-transparent text-[#1F1F1F] hover:bg-black/5",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition ${styles[variant]} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[1.7rem] border border-black/5 bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

function Header({ goTo }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FFF3E0]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <button onClick={() => goTo("landing")} className="text-left">
          <Logo />
        </button>
        <nav className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" onClick={() => goTo("landing")}>Início</Button>
          <Button variant="secondary" icon={Utensils} onClick={() => goTo("menu")}>Cardápio demo</Button>
          <Button icon={Store} onClick={() => goTo("admin")}>Área do restaurante</Button>
        </nav>
        <div className="flex gap-2 lg:hidden">
          <Button variant="secondary" icon={Utensils} className="px-3 text-xs sm:text-sm" onClick={() => goTo("menu")}>Demo</Button>
          <Button icon={Store} className="px-3 text-xs sm:text-sm" onClick={() => goTo("admin")}>Painel</Button>
        </div>
      </div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-7">
      <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#E63946]">{eyebrow}</div>
      <h2 className="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">{description}</p>}
    </div>
  );
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
              O Numeny é uma plataforma para restaurantes criarem cardápios digitais, receberem pedidos organizados pelo WhatsApp e acompanharem dados básicos de acesso, cliques e interesse dos clientes.
            </p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-row md:mt-8">
              <Button icon={Utensils} onClick={() => goTo("menu")}>Ver cardápio de restaurante demo</Button>
              <Button variant="secondary" icon={Store} onClick={() => goTo("admin")}>Acessar área do restaurante</Button>
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
                    ["2.418", "acessos"],
                    ["684", "cliques WhatsApp"],
                    ["423", "produto mais visto"],
                    ["528", "scans Instagram"],
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
            description="O MVP começa simples: cardápio público, QR Code gerenciável, pedido via WhatsApp e painel com métricas essenciais. Sem virar PDV, cozinha, estoque ou sistema fiscal no primeiro momento."
          />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              [QrCode, "Cardápio com QR Code", "O cliente acessa o cardápio por mesa, embalagem, panfleto, Instagram ou link direto."],
              [MessageCircle, "Pedido organizado", "O cliente escolhe os itens e envia uma mensagem pronta para o WhatsApp do restaurante."],
              [BarChart3, "Métricas básicas", "O restaurante acompanha acessos, cliques, produtos mais vistos e QR Codes com melhor desempenho."],
            ].map(([Icon, title, text]) => (
              <Card key={title}>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFF3E0] text-[#E63946]">
                  <Icon className="h-5 w-5" />
                </div>
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
                <div className="mb-4 inline-flex items-center rounded-full bg-[#FFF3E0] px-3 py-1 text-xs font-black text-[#E63946]">
                  Demonstração
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#1F1F1F]">
                  Cardápio de restaurante demo
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
                  Veja a experiência do cliente final com cardápio digital, categorias, carrinho e fluxos para delivery, retirada e mesa.
                </p>
                <Button variant="yellow" icon={ChevronRight} className="mt-6 rounded-full px-5 py-3" onClick={() => goTo("menu")}>
                  Abrir cardápio demo
                </Button>
              </div>
            </Card>

            <div className="rounded-[1.7rem] border border-black/5 bg-[#1F1F1F] p-7 text-white shadow-sm md:p-8">
              <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-black text-[#FFC107]">
                Painel
              </div>
              <h3 className="text-2xl font-black tracking-tight">
                Área do restaurante
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                Veja o painel com métricas, produtos, QR Codes, mapa de pedidos e leituras comerciais simples.
              </p>
              <Button icon={ChevronRight} className="mt-6 rounded-full px-5 py-3" onClick={() => goTo("admin")}>
                Abrir área do restaurante
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function DemoMenuPage({ goTo }) {
  const [selectedCategory, setSelectedCategory] = useState("Mais pedidos");
  const [cart, setCart] = useState([{ ...products[0], qty: 1 }, { ...products[5], qty: 1 }]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const visibleProducts = selectedCategory === "Mais pedidos"
    ? products.filter((p) => p.featured)
    : products.filter((p) => p.category === selectedCategory);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const totalQty = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      return [...prev, { ...product, qty: 1 }];
    });
  }

  return (
    <>
      <MobileMenuTopbar goTo={goTo} />

      <main className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 pb-32 pt-4 md:grid md:grid-cols-[minmax(0,1fr)_360px] md:gap-6 md:px-8 md:pb-8 md:pt-8">
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
                <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible">
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">Delivery</span>
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">Retirada</span>
                  <span className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">WhatsApp</span>
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
                  className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-black transition md:rounded-2xl md:px-4 md:text-sm ${cat === selectedCategory ? "bg-[#E63946] text-white shadow-sm shadow-red-200" : "bg-white text-neutral-600 ring-1 ring-black/5"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid min-w-0 gap-3 md:mt-5 md:grid-cols-1 md:gap-4 xl:grid-cols-2">
            {visibleProducts.map((item) => (
              <article key={item.id} className="min-w-0 rounded-[1.5rem] border border-black/5 bg-white p-3 shadow-sm md:rounded-[1.7rem] md:p-4">
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
                      <Plus className="h-4 w-4" />
                      Adicionar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="hidden h-fit rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 md:sticky md:top-28 md:block">
          <CartSummary cart={cart} total={total} />
        </aside>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur md:hidden">
        <button onClick={() => setIsCartOpen(true)} className="mx-auto flex w-full max-w-7xl items-center gap-3 text-left">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#FFF3E0] text-[#E63946] ring-1 ring-black/5">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-neutral-400">Seu pedido</div>
            <div className="truncate text-base font-black">{totalQty} itens · {formatCurrency(total)}</div>
          </div>
          <div className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#E63946] px-4 text-sm font-black text-white shadow-sm shadow-red-200">
            Ver pedido
          </div>
        </button>
      </div>

      {isCartOpen && <CartBottomSheet cart={cart} total={total} onClose={() => setIsCartOpen(false)} />}
    </>
  );
}

function CartBottomSheet({ cart, total, onClose }) {
  const [orderType, setOrderType] = useState("delivery");
  const [useDeviceLocation, setUseDeviceLocation] = useState(false);
  const [showWaiterView, setShowWaiterView] = useState(false);

  const ctaLabel = orderType === "mesa" ? "Mostrar ao garçom" : "Enviar pelo WhatsApp";
  const subtitle = orderType === "mesa" ? "Confira o pedido para o garçom anotar." : "Confira os itens antes de finalizar.";

  if (showWaiterView) {
    return <WaiterOrderView cart={cart} total={total} onClose={() => setShowWaiterView(false)} onBack={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden">
      <button aria-label="Fechar carrinho" className="absolute inset-0 h-full w-full" onClick={onClose} />

      <div className="absolute inset-x-0 bottom-0 flex h-[92svh] max-h-[92svh] flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl supports-[height:100dvh]:h-[92dvh] supports-[height:100dvh]:max-h-[92dvh]">
        <div className="shrink-0 p-4 pb-3">
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-neutral-200" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[1.7rem] font-black leading-tight">Seu pedido</h2>
              <p className="mt-1 text-sm leading-5 text-neutral-500">{subtitle}</p>
            </div>
            <button onClick={onClose} className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100 text-2xl text-neutral-500">
              ×
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1 rounded-2xl bg-neutral-100 p-1">
            <button onClick={() => setOrderType("delivery")} className={`rounded-xl px-2 py-2.5 text-xs font-black ${orderType === "delivery" ? "bg-white text-[#E63946] shadow-sm" : "text-neutral-500"}`}>
              Delivery
            </button>
            <button onClick={() => setOrderType("retirada")} className={`rounded-xl px-2 py-2.5 text-xs font-black ${orderType === "retirada" ? "bg-white text-[#E63946] shadow-sm" : "text-neutral-500"}`}>
              Retirada
            </button>
            <button onClick={() => setOrderType("mesa")} className={`rounded-xl px-2 py-2.5 text-xs font-black ${orderType === "mesa" ? "bg-white text-[#E63946] shadow-sm" : "text-neutral-500"}`}>
              Mesa
            </button>
          </div>
        </div>

        <div className="subtle-scrollbar flex-1 overflow-y-auto px-4 pb-4">
          {orderType === "delivery" && (
            <div className="rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
              <div className="mb-3 flex items-center gap-2 text-sm font-black">
                <MapPin className="h-4 w-4 text-[#E63946]" />
                Endereço de entrega
              </div>
              <div className="grid gap-2">
                <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Rua, número, bairro</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Complemento</div>
                  <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Referência</div>
                </div>
                <button onClick={() => setUseDeviceLocation(!useDeviceLocation)} className={`flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-xs font-black ring-1 ring-black/5 ${useDeviceLocation ? "bg-[#E63946] text-white" : "bg-white text-[#1F1F1F]"}`}>
                  <Compass className="h-4 w-4" />
                  {useDeviceLocation ? "Localização capturada" : "Usar localização atual"}
                </button>
              </div>
            </div>
          )}

          {orderType === "retirada" && (
            <div className="rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
              <div className="mb-3 flex items-center gap-2 text-sm font-black">
                <ShoppingBag className="h-4 w-4 text-[#E63946]" />
                Dados para retirada
              </div>
              <div className="grid gap-2">
                <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Nome do cliente</div>
                <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Observações do pedido</div>
              </div>
            </div>
          )}

          {orderType === "mesa" && (
            <div className="rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
              <div className="mb-3 flex items-center gap-2 text-sm font-black">
                <Utensils className="h-4 w-4 text-[#E63946]" />
                Consumo no salão
              </div>
              <div className="grid gap-2">
                <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Número da mesa</div>
                <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Nome do cliente (opcional)</div>
                <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Observações para o garçom</div>
              </div>

              <div className="mt-3 rounded-2xl bg-white p-3 ring-1 ring-black/5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-black text-[#1F1F1F]">Resumo para o garçom</span>
                <span className="shrink-0 rounded-full bg-[#FFF3E0] px-2 py-1 text-[10px] font-black text-[#E63946]">Mesa 12</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-black/5">
                <div className="grid grid-cols-[52px_1fr_44px_68px] gap-2 bg-neutral-50 px-2 py-2 text-[10px] font-black uppercase tracking-[0.06em] text-neutral-400">
                  <div>Cód.</div>
                  <div>Descrição</div>
                  <div className="text-center">Qtde</div>
                  <div className="text-right">Valor</div>
                </div>
                <div className="divide-y divide-black/5">
                  {cart.map((item) => (
                    <div key={item.id} className="grid grid-cols-[52px_1fr_44px_68px] gap-2 px-2 py-3 text-xs">
                      <div className="font-black text-[#E63946]">P{String(item.id).padStart(3, "0")}</div>
                      <div className="min-w-0 truncate font-semibold text-neutral-700">{item.name}</div>
                      <div className="text-center font-black text-neutral-700">{item.qty}</div>
                      <div className="text-right font-black text-[#E63946]">{formatCurrency(item.price * item.qty)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 border-t border-black/10 pt-3 text-xs leading-5 text-neutral-500">Use esta tela para o atendente anotar o pedido.</div>
            </div>
            </div>
          )}

          {orderType !== "mesa" && (
            <div className="mt-4 grid gap-3">
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
          )}
        </div>

        <div className="shrink-0 border-t border-black/5 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5">
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Total estimado</span>
              <span className="font-black text-[#1F1F1F]">{formatCurrency(total)}</span>
            </div>
            {orderType === "delivery" && <div className="mt-2 text-xs text-neutral-500">O endereço entra no WhatsApp e a localização aproximada alimenta o mapa de pedidos.</div>}
            {orderType === "mesa" && <div className="mt-2 text-xs text-neutral-500">No MVP, o pedido de mesa é apenas visual para o garçom anotar.</div>}
          </div>

          <Button icon={orderType === "mesa" ? Utensils : MessageCircle} onClick={() => orderType === "mesa" ? setShowWaiterView(true) : null} className="mt-3 h-12 w-full rounded-full">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
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
              <p className="mt-1 text-sm text-white/60">Lista simples para o garçom anotar</p>
            </div>
            <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl text-white">×</button>
          </div>
        </div>

        <div className="subtle-scrollbar flex-1 overflow-y-auto p-5">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
            <div className="grid grid-cols-[56px_1fr_48px_76px] gap-2 bg-neutral-50 px-3 py-3 text-[10px] font-black uppercase tracking-[0.08em] text-neutral-400">
              <div>Cód.</div>
              <div>Descrição</div>
              <div className="text-center">Qtde</div>
              <div className="text-right">Valor</div>
            </div>
            <div className="divide-y divide-black/5">
              {cart.map((item) => (
                <div key={item.id} className="grid grid-cols-[56px_1fr_48px_76px] gap-2 px-3 py-4 text-sm">
                  <div className="font-black text-[#E63946]">P{String(item.id).padStart(3, "0")}</div>
                  <div className="min-w-0 truncate font-black text-[#1F1F1F]">{item.name}</div>
                  <div className="text-center font-black text-neutral-700">{item.qty}</div>
                  <div className="text-right font-black text-[#E63946]">{formatCurrency(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-3xl bg-[#FFF3E0] p-4 ring-1 ring-black/5">
            <div className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">Observações</div>
            <p className="mt-2 text-sm leading-6 text-neutral-700">Cliente pediu para confirmar ponto da carne e trazer guardanapos extras.</p>
          </div>
        </div>

        <div className="border-t border-black/5 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <div className="mb-4 flex items-center justify-between text-lg font-black">
            <span>Total estimado</span>
            <span className="text-[#E63946]">{formatCurrency(total)}</span>
          </div>
          <button onClick={onBack} className="h-12 w-full rounded-full bg-[#E63946] text-sm font-black text-white shadow-sm shadow-red-200">Voltar ao cardápio</button>
        </div>
      </div>
    </div>
  );
}

function CartSummary({ cart, total }) {
  const [orderType, setOrderType] = useState("delivery");
  const [showDesktopWaiterView, setShowDesktopWaiterView] = useState(false);

  const ctaLabel = orderType === "mesa" ? "Mostrar pedido ao garçom" : "Enviar pelo WhatsApp";

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Seu pedido</h2>
          <ShoppingBag className="h-5 w-5 text-[#E63946]" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-1 rounded-2xl bg-neutral-100 p-1">
          <button onClick={() => setOrderType("delivery")} className={`rounded-xl px-2 py-2 text-[11px] font-black ${orderType === "delivery" ? "bg-white text-[#E63946] shadow-sm" : "text-neutral-500"}`}>Delivery</button>
          <button onClick={() => setOrderType("retirada")} className={`rounded-xl px-2 py-2 text-[11px] font-black ${orderType === "retirada" ? "bg-white text-[#E63946] shadow-sm" : "text-neutral-500"}`}>Retirada</button>
          <button onClick={() => setOrderType("mesa")} className={`rounded-xl px-2 py-2 text-[11px] font-black ${orderType === "mesa" ? "bg-white text-[#E63946] shadow-sm" : "text-neutral-500"}`}>Mesa</button>
        </div>

        {orderType === "delivery" && (
          <div className="mt-3 rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
            <div className="mb-3 flex items-center gap-2 text-sm font-black">
              <MapPin className="h-4 w-4 text-[#E63946]" />
              Endereço de entrega
            </div>
            <div className="grid gap-2">
              <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Rua, número, bairro</div>
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-white px-3 py-3 text-xs font-black text-[#1F1F1F] ring-1 ring-black/5">
                <Compass className="h-4 w-4" /> Usar localização atual
              </button>
            </div>
          </div>
        )}

        {orderType === "retirada" && (
          <div className="mt-3 rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
            <div className="mb-3 flex items-center gap-2 text-sm font-black">
              <ShoppingBag className="h-4 w-4 text-[#E63946]" />
              Dados para retirada
            </div>
            <div className="grid gap-2">
              <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Nome do cliente</div>
              <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Observações</div>
            </div>
          </div>
        )}

        {orderType === "mesa" && (
          <div className="mt-3 rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
            <div className="mb-3 flex items-center gap-2 text-sm font-black">
              <Utensils className="h-4 w-4 text-[#E63946]" />
              Pedido no salão
            </div>
            <div className="grid gap-2">
              <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Número da mesa</div>
              <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Nome do cliente (opcional)</div>
              <div className="rounded-2xl bg-white px-3 py-3 text-sm text-neutral-500 ring-1 ring-black/5">Observações</div>
            </div>

            <div className="mt-3 rounded-2xl bg-white p-3 ring-1 ring-black/5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-black text-[#1F1F1F]">Resumo para o garçom</span>
                <span className="shrink-0 rounded-full bg-[#FFF3E0] px-2 py-1 text-[10px] font-black text-[#E63946]">Mesa 12</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-black/5">
                <div className="grid grid-cols-[52px_1fr_44px_68px] gap-2 bg-neutral-50 px-2 py-2 text-[10px] font-black uppercase tracking-[0.06em] text-neutral-400">
                  <div>Cód.</div>
                  <div>Descrição</div>
                  <div className="text-center">Qtde</div>
                  <div className="text-right">Valor</div>
                </div>
                <div className="divide-y divide-black/5">
                  {cart.map((item) => (
                    <div key={item.id} className="grid grid-cols-[52px_1fr_44px_68px] gap-2 px-2 py-3 text-xs">
                      <div className="font-black text-[#E63946]">P{String(item.id).padStart(3, "0")}</div>
                      <div className="min-w-0 truncate font-semibold text-neutral-700">{item.name}</div>
                      <div className="text-center font-black text-neutral-700">{item.qty}</div>
                      <div className="text-right font-black text-[#E63946]">{formatCurrency(item.price * item.qty)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 border-t border-black/10 pt-3 text-xs leading-5 text-neutral-500">Use esta tela para o atendente anotar o pedido.</div>
            </div>
          </div>
        )}

        {orderType !== "mesa" && (
          <div className="mt-5 grid gap-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3 ring-1 ring-black/5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-2xl">{item.image}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-black">{item.qty}x {item.name}</div>
                  <div className="text-xs text-neutral-500">{formatCurrency(item.price * item.qty)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5">
          <div className="flex justify-between text-sm text-neutral-600">
            <span>Total estimado</span>
            <span className="font-black text-[#1F1F1F]">{formatCurrency(total)}</span>
          </div>
        </div>

        <Button icon={orderType === "mesa" ? Utensils : MessageCircle} onClick={() => orderType === "mesa" ? setShowDesktopWaiterView(true) : null} className="mt-4 w-full">
          {ctaLabel}
        </Button>

        <p className="mt-3 text-center text-xs leading-5 text-neutral-500">
          {orderType === "mesa" ? "No MVP, essa visão serve para o garçom anotar o pedido." : "O pedido segue organizado para o WhatsApp do restaurante."}
        </p>
      </div>

      {showDesktopWaiterView && <DesktopWaiterModal cart={cart} total={total} onClose={() => setShowDesktopWaiterView(false)} />}
    </>
  );
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
              <p className="mt-1 text-sm text-white/65">Lista simples para o garçom anotar</p>
            </div>
            <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl text-white">×</button>
          </div>
        </div>

        <div className="subtle-scrollbar max-h-[65vh] overflow-y-auto p-6">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
            <div className="grid grid-cols-[80px_1fr_70px_110px] gap-3 bg-neutral-50 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-neutral-400">
              <div>Código</div>
              <div>Descrição</div>
              <div className="text-center">Qtde</div>
              <div className="text-right">Valor</div>
            </div>
            <div className="divide-y divide-black/5">
              {cart.map((item) => (
                <div key={item.id} className="grid grid-cols-[80px_1fr_70px_110px] gap-3 px-4 py-4 text-sm">
                  <div className="font-black text-[#E63946]">P{String(item.id).padStart(3, "0")}</div>
                  <div className="min-w-0 text-base font-black text-[#1F1F1F]">{item.name}</div>
                  <div className="text-center font-black text-neutral-700">{item.qty}</div>
                  <div className="text-right font-black text-[#E63946]">{formatCurrency(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-3xl bg-[#FFF3E0] p-4 ring-1 ring-black/5">
            <div className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">Observações</div>
            <p className="mt-2 text-sm leading-6 text-neutral-700">Cliente pediu para confirmar ponto da carne e trazer guardanapos extras.</p>
          </div>
        </div>

        <div className="border-t border-black/5 p-6">
          <div className="mb-4 flex items-center justify-between text-lg font-black">
            <span>Total estimado</span>
            <span className="text-[#E63946]">{formatCurrency(total)}</span>
          </div>
          <button onClick={onClose} className="h-12 w-full rounded-full bg-[#E63946] text-sm font-black text-white shadow-sm shadow-red-200">Fechar visualização</button>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return modalContent;
  return createPortal(modalContent, document.body);
}

function LocationReportCard() {
  const neighborhoods = [
    ["Jardim Amanda", "38%", 82],
    ["Centro", "24%", 56],
    ["Parque Ortolândia", "17%", 42],
    ["Fora do raio", "9%", 18],
  ];

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
        <div className="relative min-h-[420px] overflow-hidden rounded-[1.7rem] ring-1 ring-black/5">
          <div className="absolute inset-0 bg-[#f6efe2]">
            <div className="absolute left-[-12%] top-[18%] h-10 w-[130%] rotate-[-12deg] rounded-full bg-white/75 shadow-sm" />
            <div className="absolute left-[-18%] top-[52%] h-9 w-[140%] rotate-[8deg] rounded-full bg-white/75 shadow-sm" />
            <div className="absolute left-[18%] top-[-10%] h-[130%] w-9 rotate-[18deg] rounded-full bg-white/65 shadow-sm" />
            <div className="absolute left-[58%] top-[-8%] h-[130%] w-8 rotate-[-18deg] rounded-full bg-white/65 shadow-sm" />
            <div className="absolute left-[4%] top-[10%] h-20 w-28 rounded-3xl bg-[#e8dfd0]/70" />
            <div className="absolute right-[6%] top-[14%] h-24 w-32 rounded-3xl bg-[#e8dfd0]/70" />
            <div className="absolute bottom-[10%] left-[8%] h-24 w-36 rounded-3xl bg-[#e8dfd0]/70" />
            <div className="absolute bottom-[12%] right-[12%] h-20 w-28 rounded-3xl bg-[#e8dfd0]/70" />
          </div>
          <div className="absolute right-4 top-4 rounded-2xl bg-white/90 px-3 py-2 text-xs font-black text-neutral-600 shadow-sm ring-1 ring-black/5">
            Mapa ilustrativo sem conexão externa
          </div>

          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#E63946]/35 bg-[#E63946]/10" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFC107]/80 bg-[#FFC107]/10" />

          <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-[#1F1F1F] text-white shadow-lg">
            <Store className="h-6 w-6" />
          </div>

          <div className="absolute left-[24%] top-[30%]">
            <div className="h-5 w-5 rounded-full bg-[#E63946] shadow-lg ring-4 ring-white/80" />
            <div className="mt-1 whitespace-nowrap rounded-full bg-white/90 px-2 py-1 text-[10px] font-black text-neutral-600 shadow-sm ring-1 ring-black/5">Jardim Amanda</div>
          </div>

          <div className="absolute left-[66%] top-[36%]">
            <div className="h-4 w-4 rounded-full bg-[#E63946] shadow-lg ring-4 ring-white/80" />
            <div className="mt-1 whitespace-nowrap rounded-full bg-white/90 px-2 py-1 text-[10px] font-black text-neutral-600 shadow-sm ring-1 ring-black/5">Centro</div>
          </div>

          <div className="absolute left-[35%] top-[69%]">
            <div className="h-4 w-4 rounded-full bg-[#E63946] shadow-lg ring-4 ring-white/80" />
            <div className="mt-1 whitespace-nowrap rounded-full bg-white/90 px-2 py-1 text-[10px] font-black text-neutral-600 shadow-sm ring-1 ring-black/5">Parque Ortolândia</div>
          </div>

          <div className="absolute left-[75%] top-[72%]">
            <div className="h-4 w-4 rounded-full bg-neutral-400 shadow-lg ring-4 ring-white/80" />
            <div className="mt-1 whitespace-nowrap rounded-full bg-white/90 px-2 py-1 text-[10px] font-black text-neutral-600 shadow-sm ring-1 ring-black/5">Fora do raio</div>
          </div>

          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/92 p-3 text-xs font-bold text-neutral-600 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-2"><CircleDot className="h-3.5 w-3.5 text-[#E63946]" /> Restaurante no centro</div>
            <div className="mt-1 flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#FFC107]" /> Pontos aproximados</div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Pedidos com localização", "126"],
              ["Distância média", "2,8 km"],
              ["Bairro líder", "Jd. Amanda"],
              ["Fora do raio", "9%"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5">
                <div className="text-lg font-black text-[#E63946]">{value}</div>
                <div className="mt-1 text-xs leading-4 text-neutral-500">{label}</div>
              </div>
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
            <div className="flex gap-3">
              <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-[#FFC107]" />
              <p className="text-sm leading-6 text-white/75">Jardim Amanda concentra pedidos suficientes para campanha específica de combos e entrega grátis em horários fracos.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MapPoint({ className = "", label, size = "md", muted = false }) {
  return (
    <div className={`absolute ${className}`}>
      <div className={`${size === "lg" ? "h-5 w-5" : "h-4 w-4"} rounded-full ${muted ? "bg-neutral-400" : "bg-[#E63946]"} shadow-lg ring-4 ring-white/80`} />
      <div className="mt-1 -translate-x-1/3 whitespace-nowrap rounded-full bg-white/90 px-2 py-1 text-[10px] font-black text-neutral-600 shadow-sm ring-1 ring-black/5">{label}</div>
    </div>
  );
}

function MobileMenuTopbar({ goTo }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FFF3E0]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-20 md:px-8">
        <button onClick={() => goTo("landing")} className="min-w-0 text-left">
          <Logo />
        </button>
        <Button variant="secondary" icon={ArrowLeft} className="shrink-0 px-3 text-xs sm:text-sm" onClick={() => goTo("landing")}>Voltar</Button>
      </div>
    </header>
  );
}

function RestaurantAreaPage({ goTo }) {
  return (
    <>
      <SimpleTopbar goTo={goTo} title="Área do restaurante" />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">Burger Demo</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Painel simples para gerenciar cardápio, QR Codes e acompanhar métricas básicas.
            </p>
          </div>
          <div className="grid gap-2 sm:flex sm:justify-end">
            <Button variant="secondary" icon={Smartphone} onClick={() => goTo("menu")}>Preview do cardápio</Button>
            <Button icon={Plus}>Novo produto</Button>
          </div>
        </div>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            [Eye, "2.418", "Acessos ao cardápio", "+18%"],
            [MessageCircle, "684", "Cliques no WhatsApp", "+11%"],
            [MousePointerClick, "8.932", "Produtos visualizados", "+24%"],
            [QrCode, "528", "Scans no QR Instagram", "+31%"],
          ].map(([Icon, value, label, change]) => (
            <Card key={label}>
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-[#E63946]" />
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">{change}</span>
              </div>
              <div className="mt-4 text-2xl font-black md:mt-5 md:text-3xl">{value}</div>
              <div className="mt-1 text-sm text-neutral-500">{label}</div>
            </Card>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black">Produtos cadastrados</h2>
              <div className="hidden items-center gap-2 rounded-2xl bg-neutral-50 px-3 py-2 ring-1 ring-black/5 md:flex">
                <Search className="h-4 w-4 text-neutral-400" />
                <span className="text-sm text-neutral-400">Buscar produto</span>
              </div>
            </div>
            <div className="grid gap-3">
              {products.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-3xl bg-neutral-50 p-3 ring-1 ring-black/5">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl">{item.image}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-black">{item.name}</div>
                    <div className="text-xs text-neutral-500">{item.category} · {item.views} visualizações</div>
                  </div>
                  <div className="hidden font-black text-[#E63946] sm:block">{formatCurrency(item.price)}</div>
                  <Button variant="secondary" icon={Edit3} className="px-3 py-2">Editar</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-black">QR Codes gerenciáveis</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Cada QR pode representar mesa, embalagem, panfleto, Instagram ou campanha. O destino pode ser alterado depois.
            </p>
            <div className="mt-5 grid gap-3">
              {[
                ["Instagram", "numeny.com.br/q/IGBIO", "528 scans"],
                ["Mesa 01", "numeny.com.br/q/MESA01", "312 scans"],
                ["Panfleto Bairro", "numeny.com.br/q/PAN24", "87 scans"],
              ].map(([name, link, scans]) => (
                <div key={name} className="flex items-center gap-3 rounded-3xl bg-[#FFF3E0] p-3 ring-1 ring-black/5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#E63946]">
                    <QrCode className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-black">{name}</div>
                    <div className="truncate text-xs text-neutral-500">{link}</div>
                  </div>
                  <div className="text-xs font-black text-[#E63946]">{scans}</div>
                </div>
              ))}
            </div>
            <Button variant="secondary" icon={Copy} className="mt-5 w-full">Gerar novo QR Code</Button>
          </Card>
        </section>

        <section className="mt-6">
          <LocationReportCard />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <h2 className="text-xl font-black">Dados do restaurante</h2>
            <div className="mt-5 grid gap-3">
              {[
                [Store, "Nome", "Burger Demo"],
                [Link2, "Link público", "numeny.com.br/r/burger-demo"],
                [MessageCircle, "WhatsApp", "+55 00 00000-0000"],
                [MapPin, "Endereço completo", "Av. Santana, 1234 · Centro · Hortolândia/SP"],
                [Globe2, "Cidade", "Hortolândia · SP"],
                [Clock, "Horário de funcionamento", "Seg a Qui: 18h às 23h · Sex a Dom: 18h às 00h"],
              ].map(([Icon, label, value]) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3 ring-1 ring-black/5">
                  <Icon className="h-4 w-4 text-[#E63946]" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-400">{label}</div>
                    <div className="text-sm font-black">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" icon={Settings} className="mt-5 w-full">Editar configurações</Button>
          </Card>

          <Card>
            <h2 className="text-xl font-black">Leituras comerciais</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                [TrendingUp, "Produto em alta", "Burger Numeny concentra maior interesse e deve continuar em destaque."],
                [MessageCircle, "Canal forte", "Instagram gera mais intenção de pedido que panfleto no período."],
                [Package, "Categoria relevante", "Combos têm boa visualização e podem receber campanha própria."],
              ].map(([Icon, title, text]) => (
                <div key={title} className="rounded-3xl bg-neutral-50 p-4 ring-1 ring-black/5">
                  <Icon className="h-5 w-5 text-[#E63946]" />
                  <div className="mt-4 font-black">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}

function SimpleTopbar({ goTo, title }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FFF3E0]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <button onClick={() => goTo("landing")} className="flex items-center gap-3 text-left">
          <Logo />
        </button>
        <div className="hidden text-sm font-black text-neutral-500 md:block">{title}</div>
        <Button variant="secondary" icon={ArrowLeft} className="px-3 text-xs sm:text-sm" onClick={() => goTo("landing")}>Voltar</Button>
      </div>
    </header>
  );
}

export default App;
