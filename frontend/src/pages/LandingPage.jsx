import {Link} from "react-router-dom";

import {
  NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, 
  NavigationMenuItem, NavigationMenuLink, NavigationMenuList, 
  NavigationMenuTrigger, NavigationMenuViewport
} from "@/components/ui/navigation-menu";

import ListItem from "@/components/ListItem";
import ListLinkItem from "@/components/ListLinkItem";

const ref_s = {
  main: {
    wrapper: `flex flex-col h-full w-full select-none justify-end rounded-md 
    bg-gradient-to-b from-muted/40 to-muted p-6`,
    title: `mb-2 mt-4 text-lg font-medium`
  },
  notMain: {
    wrapper: `rounded-md block select-none space-y-1 p-3 leading-none 
    transition-colors hover:bg-accent`,
    title: `text-sm font-medium leading-none mb-1.5`
  },
  content: `text-sm leading-tight text-muted-foreground`
};

const s_listItems = [
  {
    title: "¡Hola hola!",
    content: {
      nonbold: `Sabemos que lo que quieres es ir al juego, pero primero 
      necesitamos registrarte `,
      bold: `¡Así podremos ayudarte a mejorar en el juego! 🏆`
    },
    styles: {
      wrapper: ref_s.main.wrapper, title: ref_s.main.title, 
      content: ref_s.content
    }
  }
];

const s_links = [
  {
    href: "accounts/sign-in",
    title: "Regístrate",
    content: `Hazme click y empecemos con tu registro`,
    styles : {
      wrapper: ref_s.notMain.wrapper, title: ref_s.notMain.title,
      content: `line-clamp-1 ${ref_s.content}`
    }
  }
];

const t_listItems = [
  {
    title: "¿Qué ofrecemos?",
    content: {
      nonbold: `El beneficio de un tablero (exclusivo para ustedes) para 
      consultar, visualmente, `,
      bold: `diversas gráficas y estadísicas sobre sus alumnos`
    },
    styles: {
      wrapper: ref_s.main.wrapper, title: ref_s.main.title, 
      content: ref_s.content
    }
  },
  {
    title: "Acerca de sus alumnos",
    content: {
      nonbold: `Nosotros recopilaremos las partidas de sus alumnos, así como 
      datos asociados a estas: puntajes, victorias, fecha en la que jugaron, 
      etc`
    },
    styles: { 
      wrapper: ref_s.notMain.wrapper, title: ref_s.notMain.title,
      content: ref_s.content 
    }
  },
  {
    title: "Interfaz de usuario",
    content: {
      nonbold: `Contará con una IU intuitiva para navegar y consultar 
      fácilmente lo que requiera`
    },
    styles: {
      wrapper: ref_s.notMain.wrapper, title: ref_s.notMain.title,
      content: ref_s.content
    }
  }
];

const t_links = [
  {
    href: "accounts/sign-in",
    title: "Regístrate",
    content: `Para acceder al tablero hay que registrarse`,
    styles: {
      wrapper: ref_s.notMain.wrapper, title: ref_s.notMain.title,
      content: `line-clamp-1 ${ref_s.content}`
    }
  }
];

export default function LandingPage() {
  const h_gradient = "bg-gradient-to-r from-blue-500 to-green-400";
  const l_gradient = "bg-gradient-to-r from-blue-300 to-green-300"
  const menuTrigger_s = "text-white bg-black opacity-50";

  return (
    <div className={`flex flex-col items-center ${h_gradient} h-[150vh] gap-y-5`}>

      <div className="w-[100%] flex flex-col items-center gap-y-10 p-5">
        <h1 className="text-white text-7xl font-bold bg-transparent opacity-80 
        text-center">
          👨‍🏫Trackify👨‍🏫
        </h1>
        <h3 className="text-white opacity-80 text-center w-[50%]">
          Esta app está hecha a la medida para que ustedes profesores puedan 
          llevar un registro del desempeño de sus alumnos dentro del 
          videojuego 🎮
        </h3>
      </div>

      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={menuTrigger_s}>
                Alumno 👨‍🎓
              </NavigationMenuTrigger>
              <NavigationMenuContent className={l_gradient}>
                <ul className="flex flex-col gap-y-3 p-4 sm:w-[400px] lg:w-[500px]">
                  <ListItem config={s_listItems[0]} />
                  <ListLinkItem config={s_links[0]} />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={menuTrigger_s}>
                Profesor 👨‍🏫
              </NavigationMenuTrigger>
              <NavigationMenuContent className={l_gradient}>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {t_listItems.map(listItem => (<ListItem config={listItem} />))}
                  <ListLinkItem config={t_links[0]}/>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className={`${menuTrigger_s} font-semibold  
            px-3.5 py-1.5 rounded-md hover:text-black hover:bg-white`}>
              <Link className="text-sm" to="/teachers/matches">Ir al tablero</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}