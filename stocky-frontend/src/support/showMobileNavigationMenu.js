const NAVIGATION_MENU_KEY="vert-bar-mobile"


const MOBILE_LAYOUT_TEMPLATE=`"header" "vert-bar-mobile" "hor-bar" "content" "footer"`;

const SHOW='flex'
const HIDE='none'

const showMobileNavigationMenu=()=>{

    const menuElement= document.getElementById(NAVIGATION_MENU_KEY)

    const ROOT=document.querySelector("#root")
    let style=getComputedStyle(ROOT)

    if(style.gridTemplateAreas==MOBILE_LAYOUT_TEMPLATE){
        let isHidden=!menuElement.style.display || menuElement.style.display==HIDE
        menuElement.style.display=(isHidden)? SHOW:HIDE
    }   
}

export default showMobileNavigationMenu